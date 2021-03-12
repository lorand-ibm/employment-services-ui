import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getDrupalNidFromPathAlias, getEventPagePath } from "../helpers/fetchHelper";
import { findTaxonomy } from "../helpers/taxonomiesHelper";

import { findEventData } from "../helpers/dataHelper";

import PageUsingParagraphs from "./ParagraphsPage";

import { Lang, EventParams } from "../types";

interface EventProps {
  lang: Lang;
}

function Event(props: EventProps) {
  const [data, setData] = useState<any>(null);
  const { urlAlias } = useParams<EventParams>();
  const { lang } = props;

  const fetchData = async () => {
    const nid = await getDrupalNidFromPathAlias(urlAlias);
    const filter = "&filter[drupal_internal__nid]=" + nid;
    const [fiPage, svPage, enPage] = getEventPagePath(filter);

    const [fi, sv, en] = await Promise.all([axios.get(fiPage), axios.get(svPage), axios.get(enPage)]);

    const fiData = findEventData("fi", fi.data);
    const svData = findEventData("sv", sv.data);
    const enData = findEventData("en", en.data);
    const width = findTaxonomy(en.data, "field_page_width");

    setData({
      en: enData,
      fi: fiData,
      sv: svData,
      width: width,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <></>;
  }

  return <PageUsingParagraphs lang={lang} enData={data.en} fiData={data.fi} svData={data.sv} width={data.width} />;
}

export default Event;
