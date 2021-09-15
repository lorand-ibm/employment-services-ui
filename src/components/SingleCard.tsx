import React from "react";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "hds-react/components/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconLink from "./Link";
import { DateWithIcon } from "./Date";
import Location from "./Location";
import { drupalUrl } from "../config";
import { SingleCardProps } from "../types";

const defaultImageHeight = 221;

const useStyles = makeStyles((theme: any) => ({
  root: (props: SingleCardProps) => ({
    backgroundColor: props.bgColor,
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
    backgroundColor: props.bgColor,
    fontFamily: "HelsinkiGrotesk",
    fontSize: props.image ? 20 : 24,
    fontWeight: "bold",
    '& a': {
      color: 'inherit',
      wordBreak: 'break-word',
      '&:hover': {
        textDecoration: 'none',
      }
    }
  }),
  text: (props: SingleCardProps) => ({
    fontSize: props.image ? 16 : 18,
    fontFamily: "HelsinkiGrotesk",
    backgroundColor: props.bgColor,
    color: props.text_color,
    "& li": {
      wordBreak: "break-word",
    },
  }),
  button: (props: SingleCardProps) => ({
    fontFamily: "HelsinkiGrotesk",
    color: "black",
    backgroundColor: props.buttonBgColor,
    fontSize: 16,
    "&:hover": {
      backgroundColor: props.buttonBgColor,
      color: "black",
    },
  }),
  media: (props: SingleCardProps) => ({
    height: props.type === "event" ? 150 : defaultImageHeight,
  }),
  content: (props) => ({
    backgroundColor: props.bgColor,
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

function SingleCard(props: SingleCardProps): JSX.Element {
  const classes = useStyles(props as SingleCardProps);
  const {
    image,
    title,
    text,
    url,
    buttonText,
    type,
    dateContent,
    alt,
    location,
  } = props;
  const { t } = useTranslation();

  // eslint-disable-next-line
  const imageAddress = image ? image.startsWith("http") ? image: drupalUrl + image: "";

  const CardButton = () => {
    if (type === "event") {
      const readMoreText = t("list.read_more");
      return <IconLink text={readMoreText} href={url || ""} />;
    }
    return (
      <Box position="bottom" className={classes.buttonArea}>
        <Button
          className={classes.button}
          onClick={() => {
            window.location.href = url || "";
          }}
        >
          {buttonText}
        </Button>
      </Box>
    );
  };

  return (
    <Card className={classes.root}>
      <div>
        {image ? (
          <Link href={url}>
            <CardMedia
              component="img"
              className={classes.media}
              image={imageAddress}
              title={alt}
            />
          </Link>
        ) : (
          <></>
        )}
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            className={classes.title}
          >
            <Link href={url}>{title}</Link>
          </Typography>

          {dateContent ? (
            <Typography
              component="div"
              variant="body2"
              color="textSecondary"
              className={classes.text}
            >
              <DateWithIcon
                startTime={dateContent.startTime}
                endTime={dateContent.endTime}
              />
              <div style={{ paddingTop: 8 }}>
                <Location location={location || ''} />
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
      {(buttonText || type === "event") && (
        <CardActions className={classes.actions}>
          <CardButton />
        </CardActions>
      )}
    </Card>
  );
}

export default SingleCard;
