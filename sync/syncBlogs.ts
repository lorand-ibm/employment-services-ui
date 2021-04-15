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

const getPagePath = (page: string, includes: string, filter = "") => {
  const drupalUrl = process.env.DRUPAL_URL;
  if (!drupalUrl) {
    throw "Set DRUPAL_URL";
  }

  const api = "apijson";
  let rest = "/" + api + page + includes;
  if (filter) {
    rest += filter;
  }
  return [drupalUrl + "/fi" + rest, drupalUrl + "/sv" + rest, drupalUrl + rest];
};

async function fetchBlogs() {
  const [fiBlogsUrl, svBlogsUrl, enBlogsUrl] = getPagePath(
    "/node/blog",
    "?include=field_page_content",
  );

  const [fi, sv, en] = await Promise.all([axios.get(fiBlogsUrl), axios.get(svBlogsUrl), axios.get(enBlogsUrl)]);

  const data = fi.data;
  if (!data) {
    throw "Error fetcing drupal blogs, no data in res";
  }

  const blogsData: Array<any> = data.data;
  if (!blogsData) {
    throw "Error fetching drupal blogs, no Blogs data in res";
  }

  const parsedBlogs = blogsData.reduce((acc: any, curr: any) => {
    const blogTitle = findParagraphFieldData(curr, data.included, 'field_page_content', 'paragraph--mainheading', 'field_title');
    const attr = curr.attributes;
    const blogs = {
      path: attr.path.alias,
      title: blogTitle,
      summary: attr.field_summary,
      date: attr.created,
    };
    return [...acc, blogs];
  }, []);

  return parsedBlogs;
}

export const syncElasticSearchBlogs = async () => {
  const client = getClient();

  try {
    await client.indices.delete({ index: "blogs" });
  } catch (err) {
    console.warn("WARNING when deleting 'blogs' index:");
  }

  try {
    await client.indices.create(
      {
        index: "blogs",
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

  const dataset = await fetchBlogs();
  const body = dataset.flatMap((doc: any) => [{ index: { _index: "blogs" } }, doc]);
  const { body: bulkResponse } = await client.bulk({ refresh: true, body });
  const { body: count } = await client.count({ index: "blogs" });
  console.log("blogs added:", count.count);
};
