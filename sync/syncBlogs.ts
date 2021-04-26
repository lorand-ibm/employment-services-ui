import axios from "axios";
import { getClient } from "./elasticsearchClient";
import { fetchFiles, fetchImages, findParagraphFieldData, getPagePath } from './helpers'

async function fetchBlogs() {
  const drupalUrl = process.env.DRUPAL_URL;
  if (!drupalUrl) {
    throw "Set DRUPAL_URL";
  }

  const [fiBlogsUrl, svBlogsUrl, enBlogsUrl] = getPagePath(
    drupalUrl,
    "/node/blog",
    "?include=field_page_content",
  );

  const [fi, sv, en, files, media] = await Promise.all([axios.get(fiBlogsUrl), axios.get(svBlogsUrl), axios.get(enBlogsUrl), fetchFiles(drupalUrl), fetchImages(drupalUrl)]);

  const data = fi.data;
  if (!data) {
    throw "Error fetcing drupal blogs, no data in res";
  }

  const blogsData: Array<any> = data.data;
  if (!blogsData) {
    throw "Error fetching drupal blogs, no Blogs data in res";
  }

  const parsedBlogs = blogsData.reduce((acc: any, curr: any) => {
    const title = findParagraphFieldData(curr, data.included, 'field_page_content', 'paragraph--mainheading', 'field_title');
    const imageUrl = findParagraphFieldData(curr, data.included, 'field_page_content', 'paragraph--image', 'field_image_image', files, media);
    const attr = curr.attributes;
    const blogs = {
      path: attr.path.alias,
      date: attr.created,
      title: title,
      imageUrl: imageUrl || "https://edit.tyollisyyspalvelut.hel.fi/sites/default/files/2021-04/tyollisyyspalvelut-helsinki.png",
      summary: attr.field_summary,
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
    console.warn("WARNING when deleting 'blogs' index: " + err.body.error);
  }

  try {
    await client.indices.create(
      {
        index: "blogs",
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

  const dataset = await fetchBlogs();
  const body = dataset.flatMap((doc: any) => [{ index: { _index: "blogs" } }, doc]);
  const { body: bulkResponse } = await client.bulk({ refresh: true, body });
  const { body: count } = await client.count({ index: "blogs" });
  console.log("blogs added:", count.count);
};
