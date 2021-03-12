import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import {
  fetchFiles,
  fetchImages,
  fetchDocuments,
  fetchColorsTaxonomy,
  fetchWidthTaxonomy,
  getDrupalNidFromPathAlias,
  getPagePagePath,
} from "../helpers/fetchHelper";
import { findTaxonomy, setTaxonomies } from "../helpers/taxonomiesHelper";

import { findPageData, getUrlAlias } from "../helpers/dataHelper";

import PageUsingParagraphs from "./ParagraphsPage";

import { Lang, Params, ParagraphData } from "../types";

type Data = null | {
  paragraphData: ParagraphData;
  urlAliases: { [k in Lang]: any };
  width: any;
};

interface LandingPage {
  lang: Lang;
}

function Page(props: LandingPage) {
  const { langParam, urlAlias } = useParams<Params>();
  const history = useHistory();
  const [data, setData] = useState<Data>(null);
  const [redirect, setRedirect] = useState(false);
  const { lang } = props;

  const fetchData = async () => {
    const [files, media, documents, colorsTax, widthTax] = await Promise.all([
      fetchFiles(),
      fetchImages(),
      fetchDocuments(),
      fetchColorsTaxonomy(),
      fetchWidthTaxonomy(),
    ]);
    const taxonomies = setTaxonomies([
      ["Colors", colorsTax],
      ["Width", widthTax],
    ]);
    const nid = await getDrupalNidFromPathAlias(urlAlias);
    if (!nid) {
      setRedirect(true);
      return;
    };
    let filter = "&filter[drupal_internal__nid]=" + nid;

    const [fiPage, svPage, enPage] = getPagePagePath(filter);
    const [fi, sv, en] = await Promise.all([axios.get(fiPage), axios.get(svPage), axios.get(enPage)]);

    setData({
      paragraphData: {
        fi: findPageData("fi", fi.data, files, media, documents, taxonomies),
        en: findPageData("en", en.data, files, media, documents, taxonomies),
        sv: findPageData("sv", sv.data, files, media, documents, taxonomies),
      },
      urlAliases: {
        fi: getUrlAlias(fi),
        en: getUrlAlias(sv),
        sv: getUrlAlias(sv),
      },
      width: findTaxonomy(en.data, "field_page_width"),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const urlAlias = data.urlAliases[lang];
    if (langParam !== lang || urlAlias !== urlAlias) {
      history.replace(`/${lang}/${urlAlias}`);
    }
  }, [lang]);

  if (redirect) {
    return <Redirect to={`/${lang}`}/>
  }

  if (!data) {
    return <></>;
  }
  return <PageUsingParagraphs lang={lang} paragraphData={data.paragraphData} width={data.width} />;
}

export default Page;
