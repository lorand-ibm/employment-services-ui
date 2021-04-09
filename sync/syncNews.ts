import axios from "axios";
import { find } from 'lodash';
import { getClient } from "./elasticsearchClient";

export const findParagraphFieldData = (data: any, dataIncluded: any, paragraphField: string, paragraphType: string, field: string) => {
  try {
    const paragraph = find(data.relationships[paragraphField].data, { type: paragraphType });

    if (paragraph) {
      const paragraphData = find(dataIncluded, { id: paragraph.id });
      return paragraphData.attributes[field];
    }
  } catch (error) {
    console.log(paragraphField);
    console.log(error);
  }
  return "";
}

async function fetchNews() {
  const drupalUrl = process.env.DRUPAL_URL;
  if (!drupalUrl) {
    throw "Set DRUPAL_URL";
  }
  const newsDrupalUrl = drupalUrl + "/fi/apijson/node/news?include=field_page_content";
  const res = await axios.get(newsDrupalUrl);

  const data = res.data;
  if (!data) {
    throw "Error fetcing drupal news, no data in res";
  }

  const newsData: Array<any> = data.data;
  if (!newsData) {
    throw "Error fetching drupal news, no News data in res";
  }

  const parsedNews = newsData.reduce((acc: any, curr: any) => {
    const newsTitle = findParagraphFieldData(curr, data.included, 'field_page_content', 'paragraph--mainheading', 'field_title');
    const attr = curr.attributes;
    const news = {
      path: attr.path.alias,
      title: newsTitle,
      summary: attr.field_summary,
      date: attr.created,
    };
    return [...acc, news];
  }, []);

  return parsedNews;
}

export const syncElasticSearchNews = async () => {
  const client = getClient();

  try {
    await client.indices.delete({ index: "news" });
  } catch (err) {
    console.warn("WARNING when deleting 'news' index:");
  }

  try {
    await client.indices.create(
      {
        index: "news",
        body: {
          mappings: {
            properties: {
              path: { type: "text" },
              title: { type: "text" },
              summary: { type: "text" },
              date: { type: "date" },
            },
          },
        },
      },
      { ignore: [400] }
    );
  } catch (err) {
    console.log("ERROR", err);
    return;
  }

  const dataset = await fetchNews();
  const body = dataset.flatMap((doc: any) => [{ index: { _index: "news" } }, doc]);
  const { body: bulkResponse } = await client.bulk({ refresh: true, body });
  const { body: count } = await client.count({ index: "news" });
  console.log("news added:", count.count);
};
