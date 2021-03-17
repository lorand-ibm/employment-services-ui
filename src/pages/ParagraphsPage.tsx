import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import FooterBottom from "../FooterBottom";
import Paragraphs from "../Paragraphs";
import Hero from "../components/Hero";
import { getAppName } from "../config";
import { Lang, ParagraphData } from "../types";

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
  paragraphs: {
    marginTop: 72,
  },
}));

interface PageUsingParagraphsProps {
  lang: Lang;
  paragraphData: ParagraphData 
  width: any;
}

export default function ParagraphsPage(props: PageUsingParagraphsProps) {
  const classes = useStyles();
  const { lang, paragraphData, width } = props;

  const useData = lang === 'fi' ? paragraphData.fi : lang === 'sv' ? paragraphData.sv : paragraphData.en;

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
      <FooterBottom title={getAppName(lang)} lang={lang} lastParagraphColor={lastParagraphColor} />
    </>
  );
}
