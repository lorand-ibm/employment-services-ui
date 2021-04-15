import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "hds-react/components/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Link from "./Link";
import { DateWithIcon } from "./Date";
import Location from "./Location";

import { drupalUrl } from "../config";
import { SingleCardProps } from "../types";

const defaultImageHeight = 221;

const useStyles = makeStyles((theme: any) => ({
  root: (props: SingleCardProps) => ({
    backgroundColor: props.bg_color,
    color: theme.color,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: props.type === "event" ? 0 : "15px",
    [theme.breakpoints.down(960)]: {
      height: "auto",
    },
  }),
  title: (props: SingleCardProps) => ({
    color: props.title_color,
    backgroundColor: props.bg_color,
    fontFamily: "HelsinkiGrotesk",
    fontSize: props.image ? 20 : 24,
    fontWeight: "bold",
  }),
  text: (props: SingleCardProps) => ({
    fontSize: props.image ? 16 : 18,
    fontFamily: "HelsinkiGrotesk",
    backgroundColor: props.bg_color,
    color: props.text_color,
  }),
  button: (props: SingleCardProps) => ({
    fontFamily: "HelsinkiGrotesk",
    color: "black",
    backgroundColor: props.button_bg_color,
    fontSize: 16,
    "&:hover": {
      backgroundColor: props.button_bg_color,
      color: "black",
    },
  }),
  media: (props: SingleCardProps) => ({
    height: props.type === "event" ? 150 : defaultImageHeight,
  }),
  content: (props) => ({
    backgroundColor: props.bg_color,
    padding: props.type === "event" ? "15px 15px 0 15px" : "25px 25px 0 25px",
    minHeight: "100px",
  }),
  actions: (props) => ({
    marginTop: "auto",
    padding: props.type === "event" ? "0 15px 15px 15px" : 0,
  }),
  buttonArea: (props) => ({
    backgroundColor: props.bgColor,
    paddingLeft: 20,
  }),
}));

function SingleCard(props: SingleCardProps) {
  const classes = useStyles(props as SingleCardProps);
  const { image, title, lang, text, button_url, button_text, type, dateContent } = props;

  const imageAddress = image ? (image.startsWith("http") ? image : drupalUrl + image) : "";

  const CardButton = () => {
    if (type === "event") {
      const readMoreText = lang === "fi" ? "Lue lisää" : lang === "sv" ? "Läs mer" : "Read more";
      return <Link text={readMoreText} url={button_url ? button_url : ""} />;
    }
    return (
      <Box position={"bottom"} className={classes.buttonArea}>
        <Button
          className={classes.button}
          onClick={() => {
            window.location.href = button_url ? button_url : "";
          }}
        >
          {button_text}
        </Button>
      </Box>
    );
  };

  return (
    <Card className={classes.root}>
      <div>
        {image ? <CardMedia component="img" className={classes.media} image={imageAddress} title="-" /> : <></>}
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>

          {dateContent ? (
            <Typography variant="body2" color="textSecondary" className={classes.text}>
              <div>
                <DateWithIcon startTime={dateContent.startTime} endTime={dateContent.endTime} />
              </div>
              <div style={{ paddingTop: 8 }}>
                <Location location="Internet" />
              </div>
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.text}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </CardContent>
      </div>
      {(button_text || type === "event") && (
        <CardActions className={classes.actions}>
          <CardButton />
        </CardActions>
      )}
    </Card>
  );
}

export default SingleCard;
