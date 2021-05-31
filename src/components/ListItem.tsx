import React from "react";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";
import { DateComponent } from "./Date";
import { ListItemProps } from "../types";

const useStyles = makeStyles((theme: any) => ({
  root: {
    background: "transparent",
    boxShadow: "none",
    color: "#1A1A1A",
    fontFamily: "HelsinkiGrotesk",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down(960)]: {
      height: "auto",
    },
  },
  content: {
    padding: "8px 16px 8px 8px",
  },
  title: (props: ListItemProps) => ({
    color: props.title_color,
    fontWeight: "bold",
    marginBottom: "16px",
  }),
  text: (props: ListItemProps) => ({
    color: props.text_color,
  }),
  actions: {
    marginTop: "auto",
    padding: "0 8px",
  },
}));

function ListItem(props: ListItemProps): JSX.Element {
  const classes = useStyles(props as ListItemProps);
  const { t } = useTranslation();
  const { title, text, buttonUrl, dateContent, imageUrl } = props;
  const readMoreText = t("list.read_more");

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {imageUrl && <CardMedia component="img" src={imageUrl} />}
        <DateComponent startTime={dateContent.startTime} />
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className={classes.title}
        >
          {title}
        </Typography>
        <Typography gutterBottom component="p" className={classes.text}>
          {text}
        </Typography>
      </CardContent>
      {buttonUrl && (
        <CardActions className={classes.actions}>
          <Link text={readMoreText} href={buttonUrl} />
        </CardActions>
      )}
    </Card>
  );
}

export default ListItem;
