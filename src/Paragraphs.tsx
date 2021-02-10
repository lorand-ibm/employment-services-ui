import * as React from "react";
import Accord from "./Accord";
import SingleCard from "./SingleCard";
import Subheading from "./Subheading";
import Info from "./Info";
import Pdf from "./Pdf";
import PhoneNumberBox from "./PhoneNumberBox";
import Text from "./Text";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Image from "./Image";
import ImageAndCard from "./ImageAndCard";
import CardList from "./CardList";
import { Container } from "hds-react";
import { Koros } from "hds-react/components/Koros";

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
}));

type ParagraphWidth = "Narrow" | "Medium" | "Wide" | "Full" | null;

interface ParagraphsProps {
  paragraphs: any;
  site: string;
  type: string;
  title: string;
  text: string;
  width: ParagraphWidth;
}

const FullParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0", zIndex: 10 }} xs={12}>
      {children}
    </Grid>
  </Grid>
);

const WideParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12}>
      {children}
    </Grid>
  </Grid>
);

const NarrowParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12} md={8}>
      {children}
    </Grid>
  </Grid>
);

const NarrowLargerParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12} md={9}>
      {children}
    </Grid>
  </Grid>
);

export const DefaultParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto", zIndex: 10 }} xs={12} md={8} key={2}>
      {children}
    </Grid>
  </Grid>
);

const ParagraphGrid = ({
  className,
  paragraphWidth,
  children,
}: {
  className: string;
  paragraphWidth: ParagraphWidth;
  children: any;
}) => {
  if (paragraphWidth === "Wide") {
    return <WideParagraphGrid className={className}>{children}</WideParagraphGrid>;
  }
  if (paragraphWidth === "Full") {
    return <FullParagraphGrid className={className}>{children}</FullParagraphGrid>;
  }
  return <NarrowParagraphGrid className={className}>{children}</NarrowParagraphGrid>;
};

function Paragraphs(props: ParagraphsProps) {
  const classes = useStyles();
  const { paragraphs, site, width } = props;
  console.log(width);
  const items: any[] = [];
  paragraphs.map((paragraph: any, index: number) => {
    switch (paragraph.type) {
      case "Accordion":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.accord} paragraphWidth={props.width}>
              <Accord key={index} {...paragraph}></Accord>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Card":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.card} paragraphWidth={props.width}>
              <SingleCard key={index} {...paragraph} site={site}></SingleCard>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "CardList":
        const isKoro = paragraph.isKoro;
        const bgColor = paragraph.bgColor;
        items.push(
          <div style={{ paddingTop: isKoro ? "20px" : "40px", paddingBottom: "20px", backgroundColor: bgColor, position: "relative" }}>
            <div style={{ backgroundColor: bgColor }}>
              {isKoro ? <Koros type="basic" style={{ fill: bgColor, position: "absolute", top: "-20px" }} /> : <></>}
              <Container className={classes.container} style={{ zIndex: 10 }}>
                <ParagraphGrid className={classes.cardList} paragraphWidth={"Full"}>
                  <CardList key={index} {...paragraph} site={site}></CardList>
                </ParagraphGrid>
              </Container>
            </div>
          </div>
        );
        break;
      case "Subheading":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.subheading} paragraphWidth={props.width}>
              <Subheading key={index} {...paragraph}></Subheading>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Info":
        items.push(
          props.width === "Narrow" ? (
            <Container className={classes.container}>
              <NarrowLargerParagraphGrid className={classes.info}>
                <Info key={index} {...paragraph}></Info>
              </NarrowLargerParagraphGrid>
            </Container>
          ) : (
            <Container className={classes.container}>
              <ParagraphGrid className={classes.info} paragraphWidth={props.width}>
                <Info key={index} {...paragraph}></Info>
              </ParagraphGrid>
            </Container>
          )
        );
        break;
      case "Pdf":
      case "PDF":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.pdf} paragraphWidth={props.width}>
              <Pdf key={index} {...paragraph} site={site}></Pdf>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Image":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.info} paragraphWidth={props.width}>
              <Image key={index} {...paragraph} site={site}></Image>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "ImageAndCard":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.info} paragraphWidth={props.width}>
              <ImageAndCard key={index} {...paragraph} site={site}></ImageAndCard>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "PhoneNumberBox":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.card} paragraphWidth={props.width}>
              <PhoneNumberBox key={index} {...paragraph}></PhoneNumberBox>
            </ParagraphGrid>
          </Container>
        );
        break;
      case "Text":
        items.push(
          <Container className={classes.container}>
            <ParagraphGrid className={classes.accord} paragraphWidth={props.width}>
              <Text key={index} {...paragraph}></Text>
            </ParagraphGrid>
          </Container>
        );
        break;
      default:
        break;
    }
    return;
  });

  return (
    <React.Fragment>
      {items.map((item) => {
        return item;
      })}
    </React.Fragment>
  );
}

export default Paragraphs;
