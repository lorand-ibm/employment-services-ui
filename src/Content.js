import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

import FooterBottom from './FooterBottom';
import Paragraphs from './Paragraphs';
import Hero from './components/Hero';
import { getWithPagination, findData, getFullRelease } from "./helpers/dataHelper";
import { getTaxonomyPath, findTaxonomy, setTaxonomies } from "./helpers/taxonomiesHelper";

import { drupalUrl, getAppName } from './config';

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
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { lang } = props;

  const site = drupalUrl;

  const getPagePath = (page, includes, filter = '') => {
    const api = "apijson";
    let rest = "/" + api + page + "?include=" + includes;
    if (filter) {
      rest += filter;
    }
    return [
      site + '/fi' + rest,
      site + '/sv' + rest,
      site + rest,
    ];
  }

  async function makeRequests() {
    setLoading(true);

    const preInc = "field_prerelease_";
    const inc = "field_page_content,field_page_width,field_page_content.field_cards,field_page_content.field_ic_card";
    const land = "/node/landing";
    const page = "/node/page";
    const news = "/node/news";
    //const event = "/node/event";
    const pre = "/node/prerelease_landing";

    const files = site + '/apijson/file/file';
    const media = site + '/apijson/media/image';
    const doc = site + '/apijson/media/document';
    const conf = site + '/apijson/config_pages/release_settings?fields[config_pages--release_settings]=field_prerelease_content,field_full_release_content';
    const paths = site + '/apijson/path_alias/path_alias';
    const taxColors = getTaxonomyPath(site, 'colors', false);
    const taxWidth = getTaxonomyPath(site, 'paragraph_width', false);

    let [f, m, d, configuration, colorsTax, widthTax] = await Promise.all([
      getWithPagination(files),
      axios.get(media),
      axios.get(doc),
      axios.get(conf),
      axios.get(taxColors),
      axios.get(taxWidth),
    ]);

    const taxonomies = setTaxonomies([['Colors', colorsTax], ['Width', widthTax]]);
    const fullRelease = getFullRelease(configuration);
    let [fi, sv, en,] = [null, null, null,];
    let [fiPage, svPage, enPage] = getPagePath(land, inc);

    if (fullRelease) {
      if (path === 'tapahtuma' || path === 'event') {
        const pathnameSplitted = pathname.split('/');
        const lastPath = pathnameSplitted[pathnameSplitted.length - 1];
        let exactPath = paths + "?filter[alias]=/" + lastPath;
        let [res] = await Promise.all([
          axios.get(exactPath),
        ]);

        const filter = "&filter[drupal_internal__nid]=" + res.data.data[0].attributes.path.substr(6);
        [fiPage, svPage, enPage] = getPagePath('/node/event', inc, filter);

      } else if (path) {
        let exactPath = paths + "?filter[alias]=/" + path;
        let [res] = await Promise.all([
          axios.get(exactPath),
        ]);
        if (res.data.meta.count > 0 && res.data) {
          let filter = "&filter[drupal_internal__nid]=" + res.data.data[0].attributes.path.substr(6);
          [fiPage, svPage, enPage] = getPagePath(page, inc, filter);
        }
      }
      [fi, sv, en,] = await Promise.all([
        axios.get(fiPage),
        axios.get(svPage),
        axios.get(enPage),
      ]);
      if (en.data.data.meta === '0') {
        console.log('data not found from path');
        [fiPage, svPage, enPage] = getPagePath(news, inc);
        [fi, sv, en,] = await Promise.all([
          axios.get(fiPage),
          axios.get(svPage),
          axios.get(enPage),
        ]);
      }
    } else {
      [fiPage, svPage, enPage] = getPagePath(pre, preInc);
      [fi, sv, en,] = await Promise.all([
        axios.get(fiPage),
        axios.get(svPage),
        axios.get(enPage),
      ]);
    }

    let fiData = findData('fi', fi.data, f, m, d, taxonomies);
    let svData = findData('sv', sv.data, f, m, d, taxonomies);
    let enData = findData('en', en.data, f, m, d, taxonomies);
    const width = findTaxonomy(en.data, 'field_page_width');
    setData({
      en: enData, fi: fiData, sv: svData,
      width: width,
      files: f,
      media: m,
      configuration: configuration,
      fullVersion: fullRelease,
      site: site,
      taxonomies: taxonomies,
    });
    setLoading(false);
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

  if (!loading) {
    if (useData.length > 0 && useData[0].type === 'Hero') {
      heroTitle = useData[0].title;
      heroText = useData[0].text;
      heroUrl = useData[0].url;
    } else {
      isHero = false;
    }
  }

  if (loading) {
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
          site={site}
          className={classes.hero}
        /> : <></>}
        <Paragraphs paragraphs={useData} width={data.width} site={site} className={classes.paragraphs} />
      </main>
      <div className={classes.footerWrapper} style={{ backgroundColor: lastParagraphColor }}>
        <FooterBottom
          title={getAppName(lang)}
          description=""
          lang={lang}
          site={site}
        />
      </div>
    </>
  );
}
