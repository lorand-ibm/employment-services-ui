import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

import FooterBottom from './FooterBottom';
import Paragraphs from './Paragraphs';
import Hero from './components/Hero';
import { findData } from "./helpers/dataHelper";
import { findTaxonomy, setTaxonomies } from "./helpers/taxonomiesHelper";

import { fetchFiles, fetchImages, fetchDocuments, fetchColorsTaxonomy, fetchWidthTaxonomy, getLandingPagePath, getEventPagePath, getDrupalNidFromPathAlias, getPagePagePath } from './helpers/fetchHelper';
import { getAppName } from './config';

const useStyles = makeStyles((theme) => ({
  navi: {
    zIndex: 10000,
    fontFamily: 'HelsinkiGrotesk',
    fontSize: 16,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  hero: {
    height: 550,
  },
  main: {
  },
  footerWrapper: {
    paddingTop: 100,
  },
  paragraphs: {
    marginTop: 72
  }
}));

export default function Content(props) {
  const { restofit } = useParams();
  const { pathname } = useLocation();

  const [path] = useState(restofit);
  const [data, setData] = useState({});
  const classes = useStyles();
  const { lang } = props;

  async function makeRequests() {
    const [files, media, documents, colorsTax, widthTax] = await Promise.all([
      fetchFiles(),
      fetchImages(),
      fetchDocuments(),
      fetchColorsTaxonomy(),
      fetchWidthTaxonomy(),
    ]);

    const taxonomies = setTaxonomies([['Colors', colorsTax], ['Width', widthTax]]);
    let [fi, sv, en,] = [null, null, null, null];
    let [fiPage, svPage, enPage,] = getLandingPagePath();

    if (path === 'tapahtuma' || path === 'event') {
      const pathnameSplitted = pathname.split('/');
      const lastPath = pathnameSplitted[pathnameSplitted.length - 1];

      const nid = await getDrupalNidFromPathAlias(lastPath);
      const filter = "&filter[drupal_internal__nid]=" + nid;
      [fiPage, svPage, enPage] = getEventPagePath(filter);
    } else if (path) {
      const nid = await getDrupalNidFromPathAlias(path)
      let filter = "&filter[drupal_internal__nid]=" + nid;
      [fiPage, svPage, enPage] = getPagePagePath(filter);
    }
    [fi, sv, en,] = await Promise.all([
      axios.get(fiPage),
      axios.get(svPage),
      axios.get(enPage),
    ]);

    let fiData = findData('fi', fi.data, files, media, documents, taxonomies);
    let svData = findData('sv', sv.data, files, media, documents, taxonomies);
    let enData = findData('en', en.data, files, media, documents, taxonomies);
    const width = findTaxonomy(en.data, 'field_page_width');
    setData({
      en: enData, fi: fiData, sv: svData,
      width: width,
      files: files,
      media: media,
      taxonomies: taxonomies,
    });
  }

  useEffect(() => {
    makeRequests();
  }, []);

  let useData = data.fi;
  switch (lang) {
    case 'en':
      useData = data.en;
      break;
    case 'sv':
      useData = data.sv;
      break;
    case 'fi':
    default:
      useData = data.fi;
  }

  let heroTitle = "";
  let heroText = "";
  let heroUrl = "";
  let isHero = true;

  if (useData) {
    if (useData.length > 0 && useData[0].type === 'Hero') {
      heroTitle = useData[0].title;
      heroText = useData[0].text;
      heroUrl = useData[0].url;
    } else {
      isHero = false;
    }
  }

  if (!useData) {
    return <main className={classes.main} />;
  }

  const lastParagraph = !useData ? undefined : useData[useData.length - 1];
  const lastParagraphColor = lastParagraph ? lastParagraph.bgColor : '';

  return (
    <>
      <main className={classes.main}>
        {isHero ? <Hero
          title={heroTitle}
          text={heroText}
          url={heroUrl}
          className={classes.hero}
        /> : <></>}
        <Paragraphs paragraphs={useData} width={data.width} className={classes.paragraphs} />
      </main>
      <div className={classes.footerWrapper} style={{ backgroundColor: lastParagraphColor }}>
        <FooterBottom
          title={getAppName(lang)}
          description=""
          lang={lang}
        />
      </div>
    </>
  );
}
