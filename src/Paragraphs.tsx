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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    margin: "0 auto 16px auto",
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

const WideParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto" }} xs={12}>
      {children}
    </Grid>
  </Grid>
);

const NarrowParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto" }} xs={12} md={8}>
      {children}
    </Grid>
  </Grid>
);

const NarrowLargerParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto" }} xs={12} md={9}>
      {children}
    </Grid>
  </Grid>
);

export const DefaultParagraphGrid = ({ className, children }: { className: string; children: any }) => (
  <Grid container spacing={1} className={className}>
    <Grid item style={{ margin: "0 auto" }} xs={12} md={8} key={2}>
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
  if (paragraphWidth !== "Narrow") {
    return <WideParagraphGrid className={className}>{children}</WideParagraphGrid>;
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
          <ParagraphGrid className={classes.accord} paragraphWidth={props.width}>
            <Accord key={index} {...paragraph}></Accord>
          </ParagraphGrid>
        );
        break;
      case "Card":
        items.push(
          <ParagraphGrid className={classes.card} paragraphWidth={props.width}>
            <SingleCard key={index} {...paragraph} site={site}></SingleCard>
          </ParagraphGrid>
        );
        break;
      case "CardList":
        items.push(
          <ParagraphGrid className={classes.card} paragraphWidth={props.width}>
            <CardList key={index} {...paragraph} site={site}></CardList>
          </ParagraphGrid>
        );
        break;
      case "Subheading":
        items.push(
          <ParagraphGrid className={classes.subheading} paragraphWidth={props.width}>
            <Subheading key={index} {...paragraph}></Subheading>
          </ParagraphGrid>
        );
        break;
      case "Info":
        items.push(
          props.width === "Narrow" ? (
            <NarrowLargerParagraphGrid className={classes.info}>
              <Info key={index} {...paragraph}></Info>
            </NarrowLargerParagraphGrid>
          ) : (
            <ParagraphGrid className={classes.info} paragraphWidth={props.width}>
              <Info key={index} {...paragraph}></Info>
            </ParagraphGrid>
          )
        );
        break;
      case "Pdf":
      case "PDF":
        items.push(
          <ParagraphGrid className={classes.pdf} paragraphWidth={props.width}>
            <Pdf key={index} {...paragraph} site={site}></Pdf>
          </ParagraphGrid>
        );
        break;
      case "Image":
        items.push(
          <ParagraphGrid className={classes.info} paragraphWidth={props.width}>
            <Image key={index} {...paragraph} site={site}></Image>
          </ParagraphGrid>
        );
        break;
      case "ImageAndCard":
        items.push(
          <ParagraphGrid className={classes.info} paragraphWidth={props.width}>
            <ImageAndCard key={index} {...paragraph} site={site}></ImageAndCard>
          </ParagraphGrid>
        );
        break;
      case "PhoneNumberBox":
        items.push(
          <ParagraphGrid className={classes.card} paragraphWidth={props.width}>
            <PhoneNumberBox key={index} {...paragraph}></PhoneNumberBox>
          </ParagraphGrid>
        );
        break;
      case "Text":
        items.push(
          <ParagraphGrid className={classes.accord} paragraphWidth={props.width}>
            <Text key={index} {...paragraph}></Text>
          </ParagraphGrid>
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
        return <Container className={classes.container}>{item}</Container>;
      })}
    </React.Fragment>
  );
}

export default Paragraphs;
