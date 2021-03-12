import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import FooterBottom from "../FooterBottom";
import Paragraphs from "../Paragraphs";
import Hero from "../components/Hero";

import { getAppName } from "../config";

import { Lang } from "../types";

const useStyles = makeStyles((theme) => ({
  navi: {
    zIndex: 10000,
    fontFamily: "HelsinkiGrotesk",
    fontSize: 16,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  hero: {
    height: 550,
  },
  main: {},
  footerWrapper: {
    paddingTop: 100,
  },
  paragraphs: {
    marginTop: 72,
  },
}));

interface PageUsingParagraphsProps {
  lang: Lang;
  enData: any;
  fiData: any;
  svData: any;
  width: any;
}

export default function ParagraphsPage(props: PageUsingParagraphsProps) {
  const classes = useStyles();
  const { lang, enData, fiData, svData, width } = props;

  let useData: any = fiData;
  switch (lang) {
    case "en":
      useData = enData;
      break;
    case "sv":
      useData = svData;
      break;
    case "fi":
    default:
      useData = fiData;
  }

  let heroTitle = "";
  let heroText = "";
  let heroUrl = "";
  let isHero = true;

  if (useData.length > 0 && useData[0].type === "Hero") {
    heroTitle = useData[0].title;
    heroText = useData[0].text;
    heroUrl = useData[0].url;
  } else {
    isHero = false;
  }

  const lastParagraph = !useData ? undefined : useData[useData.length - 1];
  const lastParagraphColor = lastParagraph ? lastParagraph.bgColor : "";

  return (
    <>
      <main className={classes.main}>
        {isHero ? (
          <div className={classes.hero}>
            <Hero title={heroTitle} text={heroText} url={heroUrl} />
          </div>
        ) : (
          <></>
        )}
        <div className={classes.paragraphs}>
          <Paragraphs paragraphs={useData} width={width} lang={lang} />
        </div>
      </main>
      <div className={classes.footerWrapper} style={{ backgroundColor: lastParagraphColor }}>
        <FooterBottom title={getAppName(lang)} lang={lang} />
      </div>
    </>
  );
}
