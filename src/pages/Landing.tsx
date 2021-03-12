import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchFiles,
  fetchImages,
  fetchDocuments,
  fetchColorsTaxonomy,
  fetchWidthTaxonomy,
  getLandingPagePath,
} from "../helpers/fetchHelper";
import { findTaxonomy, setTaxonomies } from "../helpers/taxonomiesHelper";

import { findPageData } from "../helpers/dataHelper";

import PageUsingParagraphs from "./ParagraphsPage";

import { Lang } from "../types";

interface LandingProps {
  lang: Lang;
}

function Landing(props: LandingProps) {
  const [data, setData] = useState<any>(null);
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
    const [fiPage, svPage, enPage] = getLandingPagePath();

    const [fi, sv, en] = await Promise.all([axios.get(fiPage), axios.get(svPage), axios.get(enPage)]);

    const fiData = findPageData("fi", fi.data, files, media, documents, taxonomies);
    const svData = findPageData("sv", sv.data, files, media, documents, taxonomies);
    const enData = findPageData("en", en.data, files, media, documents, taxonomies);
    const width = findTaxonomy(en.data, "field_page_width");

    setData({
      en: enData,
      fi: fiData,
      sv: svData,
      width: width,
      files: files,
      media: media,
      taxonomies: taxonomies,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <PageUsingParagraphs
      lang={lang}
      enData={data.en}
      fiData={data.fi}
      svData={data.sv}
      width={data.width}
    />
  );
}

export default Landing;
