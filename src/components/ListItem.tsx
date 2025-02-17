import React from "react";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconLink from "./Link";
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
    '& a': {
      color: 'inherit',
      '&:hover': {
        textDecoration: 'none',
      }
    }
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
  const { title, text, url, dateContent, imageUrl, alt } = props;
  const readMoreText = t("list.read_more");

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {imageUrl && <Link href={url}><CardMedia component="img" src={imageUrl} title={alt} alt={alt} /></Link>}
        <DateComponent startTime={dateContent.startTime} />
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className={classes.title}
        >
          <Link href={url}>{title}</Link>
        </Typography>
        <Typography gutterBottom component="p" className={classes.text}>
          {text}
        </Typography>
      </CardContent>
      {url && (
        <CardActions className={classes.actions}>
          <IconLink text={readMoreText} href={url} />
        </CardActions>
      )}
    </Card>
  );
}

export default ListItem;
