import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "hds-react/components/Card";
import { Button } from "hds-react/components/Button";
import Typography from "@material-ui/core/Typography";
import { drupalUrl } from "../config";
import { SingleCardProps } from "../types";

const useStyles = makeStyles((theme: any) => ({
  root: (props: ImageAndCardProps) => ({
    backgroundColor: props.card.bgColor,
  }),
  title: (props: ImageAndCardProps) => ({
    color: props.card.title_color,
    backgroundColor: props.card.bgColor,
    fontFamily: "HelsinkiGrotesk",
    fontSize: 36,
    fontWeight: "bold",
  }),
  text: {
    fontSize: 18,
    fontFamily: "HelsinkiGrotesk",
    backgroundColor: "transparent",
    mlineHeight: 27,
  },
  button: (props: ImageAndCardProps) => ({
    color: "black",
    backgroundColor: props.card.bgColor,
    borderColor: "black",
  }),
  box: (props: ImageAndCardProps) => ({
    backgroundColor: props.card.bgColor,
    position: "absolute",
    top: "9%",
    right: "0",
    width: 450,
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("1248")]: {
      top: "32%",
      right: "auto",
    },
    [theme.breakpoints.down("960")]: {
      position: "initial",
      width: "100%",
      height: "auto",
    },
  }),
  wrapper: {
    position: "relative",
    [theme.breakpoints.down("1248")]: {
      minHeight: 590,
    },
  },
  imageWrapper: {
    width: "70%",
    [theme.breakpoints.down("1248")]: {
      width: "100%",
    },
  },
}));
interface ImageAndCardProps {
  card: SingleCardProps;
  imageUrl: string;
  alt: string;
}

function ImageAndCard(props: ImageAndCardProps): JSX.Element {
  const classes = useStyles(props);
  const { card, imageUrl, alt } = props;

  const imagePath =
    imageUrl && (imageUrl.startsWith("https") || imageUrl.startsWith("http"))
      ? imageUrl
      : drupalUrl + imageUrl;

  let button = (
    <Button
      className={classes.button}
      onClick={() => {
        window.location.href = card.url || "";
      }}
      style={{
        borderColor: "black",
      }}
    >
      {card.buttonText}
    </Button>
  );

  if (!card.buttonText) {
    button = <></>;
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.imageWrapper}>
          <div
            style={{
              paddingBottom: "62%",
              height: 0,
              overflow: "hidden",
            }}
          >
            <img alt={alt} style={{ width: "100%" }} src={imagePath} />
          </div>
        </div>

        <Card
          className={classes.box}
          theme={{
            "--background-color": card.bgColor,
            "--padding-horizontal": "var(--spacing-l)",
            "--padding-vertical": "var(--spacing-m)",
          }}
        >
          <div>
            <Typography component="h2" className={classes.title}>
              {card.title}
            </Typography>
            <Typography
              className={classes.text}
              dangerouslySetInnerHTML={{ __html: card.text }}
            />
          </div>
          {button}
        </Card>
      </div>
    </>
  );
}

export default ImageAndCard;
