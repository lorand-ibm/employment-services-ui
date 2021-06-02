import React from "react";
import { Container } from "hds-react";
import { Koros } from "hds-react/components/Koros";
import { makeStyles } from "@material-ui/core/styles";
import Accord from "./Accord";
import SingleCard from "./SingleCard";
import { Mainheading, Subheading } from "./Headings";
import Info from "./Info";
import Pdf from "./Pdf";
import PhoneNumberBox from "./PhoneNumberBox";
import Text from "./Text";
import HighlightedText from "./HighlightedText";
import Image from "./Image";
import ImageAndCard from "./ImageAndCard";
import CardList from "./CardList";
import EventsList from "./EventsList";
import NewsList from "./NewsList";
import BlogList from "./BlogList";
import Video from "./Video";
import Link from "./Link";
import { DateWithIcon } from "./Date";
import Location from "./Location";
import SujoEmbedded from "./SujoEmbedded";
import ShareButtons from "./ShareButtons";
import { ParagraphGrid, NarrowLargerParagraphGrid } from "./ParagraphGrid";
import { useReactAndShare } from '../hooks';
import { Lang, ParagraphWidth } from "../types";


const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    margin: "0 auto 32px auto",
    [theme.breakpoints.down(768)]: {
      paddingLeft: 16,
      paddingRight: 16,
      maxWidth: "100%",
    },
  },
  container2: {
    padding: 0,
    margin: "0 auto 0 auto",
    [theme.breakpoints.down(768)]: {
      paddingLeft: 16,
      paddingRight: 16,
      maxWidth: "100%",
    },
  },
  accord: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  card: {
    padding: 0,
    marginTop: 32,
    marginBottom: 15,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  subheading: {
    padding: 0,
    marginTop: 32,
    marginBottom: 15,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  info: {
    marginTop: 36,
    marginBottom: 72,
    [theme.breakpoints.only("xs")]: {
      marginTop: 24,
      marginBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  image: {
    marginTop: 32,
    marginBottom: 24,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  pdf: {
    marginBottom: 10,
    padding: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  sides: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  cardList: {
    width: "100%",
  },
  sujo: {
    marginTop: 32,
    marginBottom: 32,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  location: {
    paddingBottom: 20,
  },
  video: {
    marginTop: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  shareButtons: {
    padding: '32px 0',
    marginTop: 0,
    marginBottom: 0,
  },
  reactAndShare: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
  }
}));

export interface ParagraphsProps {
  paragraphs: any;
  lang: Lang;
  cookieConsent: string;
  nodeData?: any;
  width: ParagraphWidth;
  lastParagraphColor: string;
}

function Paragraphs(props: ParagraphsProps): JSX.Element {
  const classes = useStyles();
  const { paragraphs, lang, cookieConsent, nodeData, width, lastParagraphColor } = props;
  const items: any[] = [];
  useReactAndShare(cookieConsent, lang, nodeData.title);

  paragraphs.forEach((paragraph: any, index: number) => {
    switch (paragraph.type) {
      case "Accordion":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.accord} paragraphWidth={width}>
              <Accord {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Card":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.card} paragraphWidth={width}>
              <SingleCard {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "CardList": {
        const { isKoro, bgColor } = paragraph;
        items.push(
          <div
            style={{
              paddingTop: isKoro ? "20px" : "40px",
              paddingBottom: "40px",
              backgroundColor: bgColor,
              position: "relative",
            }}
          >
            <div style={{ backgroundColor: bgColor }}>
              {isKoro ? <Koros type="basic" style={{ fill: bgColor, position: "absolute", top: "-15px" }} /> : <></>}
              <Container className={classes.container} style={{ zIndex: 10 }}>
                <ParagraphGrid className={classes.cardList} paragraphWidth="Full">
                  <CardList {...paragraph} />
                </ParagraphGrid>
              </Container>
            </div>
          </div>
        );
        break;
      }
      case "Mainheading":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.subheading} paragraphWidth={width}>
              <Mainheading {...paragraph} nodeData={nodeData} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Subheading":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.subheading} paragraphWidth={width}>
              <Subheading {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Info":
        items.push(
          width === "Narrow" ? (
            <Container className={classes.container}>
              <NarrowLargerParagraphGrid className={classes.info}>
                <Info {...paragraph} />
              </NarrowLargerParagraphGrid>
            </Container>
          ) : (
            <Container className={classes.container}>
              <ParagraphGrid className={classes.info} paragraphWidth={width}>
                <Info {...paragraph} />
              </ParagraphGrid>
            </Container>
          )
        );
        break;
      case "Link":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.card} paragraphWidth={width}>
              <Link href={paragraph.url} text={paragraph.url_text} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Pdf":
      case "PDF":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.pdf} paragraphWidth={width}>
              <Pdf {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Image":
        items.push(
          <Container className={classes.container2}>
            <ParagraphGrid className={classes.image} paragraphWidth={width}>
              <Image {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "ImageAndCard":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.info} paragraphWidth={width}>
              <ImageAndCard {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "PhoneNumberBox":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.card} paragraphWidth={width}>
              <PhoneNumberBox {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Lead":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.accord} paragraphWidth={width}>
              <Text {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "HighlightedText":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.accord} paragraphWidth={width}>
              <HighlightedText {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Text":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.accord} paragraphWidth={width}>
              <Text {...paragraph} />
            </ParagraphGrid>
          </Container>
        );
        break;
      case "EventsList":
        items.push(<EventsList lang={lang} title={paragraph.title} bgColor={paragraph.bgColor} />);
        break;
      case "NewsList":
        items.push(<NewsList lang={lang} title={paragraph.title} bgColor={paragraph.bgColor} isKoro={paragraph.isKoro} titleColor={paragraph.titleColor} limit={paragraph.limit} />);
        break;
      case "BlogList":
        items.push(<BlogList lang={lang} title={paragraph.title} bgColor={paragraph.bgColor} isKoro={paragraph.isKoro} titleColor={paragraph.titleColor} limit={paragraph.limit} />);
        break;
      case "Date":
        items.push(
          <Container className={classes.container2}>
            <ParagraphGrid className={classes.accord} paragraphWidth={width}>
              <DateWithIcon startTime={paragraph.startTime} endTime={paragraph.endTime} />
            </ParagraphGrid>
          </Container>
        );
        break;
      // Not used in Drupal ATM
      case "Location":
        items.push(
          <Container className={classes.container2}>
            <ParagraphGrid className={classes.location} paragraphWidth={width}>
              <Location location={paragraph.location} />
            </ParagraphGrid>
          </Container>
        )
        break;
      case "SujoEmbedded":
        items.push(
          <Container className={classes.container2}>
            <ParagraphGrid className={classes.sujo} paragraphWidth={width}>
              <SujoEmbedded training={paragraph.training} />
            </ParagraphGrid>
          </Container>
        )
        break;
      case "Video":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.video} paragraphWidth={width}>
              <Video videoUrl={paragraph.videoUrl} cookieConsent={cookieConsent} />
            </ParagraphGrid>
          </Container>
        )
        break;
      case "ShareButtons":
        items.push(
          <div style={{ backgroundColor: lastParagraphColor }}>
            <Container className={classes.container2}>
              <ParagraphGrid className={classes.shareButtons} paragraphWidth={width}>
                <ShareButtons lang={lang} pageTitle={nodeData.title} pageSummary={nodeData.summary} />
              </ParagraphGrid>
            </Container>
          </div>
        )
        break;
      case "ReactAndShare":
        items.push(
          <div style={{ backgroundColor: lastParagraphColor }}>
            <Container className={classes.container2}>
              <ParagraphGrid className={classes.reactAndShare} paragraphWidth={width}>
                <div className="rns" />
              </ParagraphGrid>
            </Container>
          </div>
        )
        break;
      default:
        break;
    }
  });

  return (
    <>
      {items.map((item, i) =>
        <>
         {item}
        </>
      )}
    </>
  );
}

export default Paragraphs;
