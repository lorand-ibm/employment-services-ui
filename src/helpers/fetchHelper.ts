import axios from "axios";

import { getTaxonomyPath } from "./taxonomiesHelper";
import { drupalUrl } from "../config";

const fetchWithPagination = async (drupalUrl: string) => {
  const getRestOfData = async (data: any, filesUrl: any): Promise<any> => {
    const res = await axios.get(filesUrl.href);

    const combineData = [...res.data.data, ...data];

    const nextLink = res.data.links.next;
    if (nextLink) {
      return await getRestOfData(combineData, nextLink);
    }
    const newRes = { ...res, data: combineData };
    return newRes;
  };

  const res = await axios.get(drupalUrl);

  const nextLink = res.data.links.next;
  if (nextLink) {
    const currDrupalData = res.data.data;

    const drupalData = await getRestOfData(currDrupalData, nextLink);
    return { ...res, data: drupalData };
  }
  return res;
};

const getPagePath = (page: string, includes: string, filter = "") => {
  const api = "apijson";
  let rest = "/" + api + page + "?include=" + includes;
  if (filter) {
    rest += filter;
  }
  return [drupalUrl + "/fi" + rest, drupalUrl + "/sv" + rest, drupalUrl + rest];
};

export const getLandingPagePath = () =>
  getPagePath(
    "/node/landing",
    "field_page_content,field_page_width,field_page_content.field_cards,field_page_content.field_ic_card"
  );

export const getPagePagePath = (filter: string) =>
  getPagePath(
    "/node/page",
    "field_page_content,field_page_width,field_page_content.field_cards,field_page_content.field_ic_card",
    filter
  );

export const getEventPagePath = (filter: string) =>
  getPagePath(
    "/node/event",
    "field_page_content,field_page_width,field_page_content.field_cards,field_page_content.field_ic_card",
    filter
  );

export const getDrupalNidFromPathAlias = async (pathAlias: string) => {
  const paths = drupalUrl + "/apijson/path_alias/path_alias";
  const exactPath = paths + "?filter[alias]=/" + pathAlias;
  const res = await axios.get(exactPath);
  if (!res || !res.data || !res.data.data[0] || !res.data.data[0].attributes || !res.data.data[0].attributes.path) return null;
  return res.data.data[0].attributes.path.substr(6);
};

export const fetchFiles = () => fetchWithPagination(drupalUrl + "/apijson/file/file");
export const fetchImages = () => fetchWithPagination(drupalUrl + "/apijson/media/image");
export const fetchDocuments = () => fetchWithPagination(drupalUrl + "/apijson/media/document");
export const fetchColorsTaxonomy = () => axios.get(getTaxonomyPath(drupalUrl, "colors", false));
export const fetchWidthTaxonomy = () => axios.get(getTaxonomyPath(drupalUrl, "paragraph_width", false));
