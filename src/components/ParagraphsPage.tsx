import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Paragraphs from "./Paragraphs";
import { Hero, HeroShallow } from "./Hero";
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
    overflow: 'hidden',
  },
  paragraphs: {
    marginTop: 56,
  },
}));

export interface PageUsingParagraphsProps {
  lang: Lang;
  cookieConsent: string;
  nodeData?: any;
  paragraphData: ParagraphData;
  width: any;
}

export default function ParagraphsPage(props: PageUsingParagraphsProps): JSX.Element {
  const { lang, cookieConsent, nodeData, paragraphData, width } = props;

  let useData = paragraphData.fi;
  let nodeAttributes = nodeData.fi;
  if (lang === "en") {
    useData = paragraphData.en;
    nodeAttributes = nodeData.en;
  } else if (lang === "sv") {
    useData = paragraphData.sv;
    nodeAttributes = nodeData.sv;
  }

  let heroTitle = "";
  let heroText = "";
  let heroUrl = "";
  let isHero = true;
  let heroShallow = false;
  let heroAlt = " ";

  if (useData.length > 0 && useData[0].type === "Hero") {
    heroTitle = useData[0].title;
    heroText = useData[0].text;
    heroUrl = useData[0].imageUrl;
    heroShallow = useData[0].shallow;
    heroAlt = useData[0].alt;
  } else {
    isHero = false;
  }

  const classes = useStyles(heroShallow);

  const filteredParagraphs = useData.filter((el: any) => el.type !== 'ReactAndShare' && el.type !== 'ShareButtons');
  const lastParagraph = !filteredParagraphs ? undefined : filteredParagraphs[filteredParagraphs.length - 1];
  const lastParagraphColor = lastParagraph ? lastParagraph.bgColor : "";
  const imageParagraph = useData.filter((el: any) => el.type === 'Image');

  return (
    <>
      <Helmet>
        <title>{`${nodeAttributes.title} | ${getAppName(lang)}`}</title>
        { nodeAttributes.summary && <meta name="description" content={nodeAttributes.summary} /> }
        <meta name="og:title" content={`${nodeAttributes.title} | ${getAppName(lang)}`} />
        { nodeAttributes.summary && <meta name="og:description" content={nodeAttributes.summary} />}
        { imageParagraph?.length && <meta name="og:image" content={imageParagraph[0].imageUrl} />}
      </Helmet>
      <main>
        {isHero ? (
          <div className={classes.hero}>
            {heroShallow ? (
              <HeroShallow alt={heroAlt} imageUrl={heroUrl} />
            ) : (
              <Hero title={heroTitle} text={heroText} imageUrl={heroUrl} />
            )}
          </div>
        ) : (
          <></>
        )}
        <div className={classes.paragraphs}>
          <Paragraphs
            paragraphs={useData}
            lang={lang}
            cookieConsent={cookieConsent}
            nodeData={nodeAttributes}
            width={width}
            lastParagraphColor={lastParagraphColor}
          />
        </div>
      </main>
      <Footer
        title={getAppName(lang)}
        lang={lang}
        lastParagraphColor={lastParagraphColor}
      />
    </>
  );
}
