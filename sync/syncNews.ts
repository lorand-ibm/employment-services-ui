import axios from "axios";
import { getClient } from "./elasticsearchClient";
import { fetchFiles, fetchImages, findParagraphFieldData, getPagePath } from './helpers'

async function fetchNews() {
  const drupalUrl = process.env.DRUPAL_URL;
  if (!drupalUrl) {
    throw "Set DRUPAL_URL";
  }

  const [fiNewsUrl, svNewsUrl, enNewsUrl] = getPagePath(
    drupalUrl,
    "/node/news",
    "?include=field_page_content",
  );

  const [fi, sv, en, files, media] = await Promise.all([axios.get(fiNewsUrl), axios.get(svNewsUrl), axios.get(enNewsUrl), fetchFiles(drupalUrl), fetchImages(drupalUrl)]);

  const data = fi.data;
  if (!data) {
    throw "Error fetcing drupal news, no data in res";
  }

  const newsData: Array<any> = data.data;
  if (!newsData) {
    throw "Error fetching drupal news, no News data in res";
  }

  const parsedNews = newsData.reduce((acc: any, curr: any) => {
    const title = findParagraphFieldData(curr, data.included, 'field_page_content', 'paragraph--mainheading', 'field_title');
    const imageUrl = findParagraphFieldData(curr, data.included, 'field_page_content', 'paragraph--image', 'field_image_image', files, media);
    const attr = curr.attributes;
    const news = {
      path: attr.path.alias,
      date: attr.created,
      title: title,
      imageUrl: imageUrl || "https://edit.tyollisyyspalvelut.hel.fi/sites/default/files/2021-04/tyollisyyspalvelut-helsinki.png",
      summary: attr.field_summary,
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
    console.warn("WARNING when deleting 'news' index: " + err.body.error);
  }

  try {
    await client.indices.create(
      {
        index: "news",
        body: {
          mappings: {
            properties: {
              path: { type: "text" },
              date: { type: "date" },
              title: { type: "text" },
              imageUrl: { type: "text" },
              summary: { type: "text" },
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
