import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { drupalUrl } from "../config";

const useStyles = makeStyles((theme: any) => ({
  container: () => ({
    overflow: "hidden",
  }),
  img: () => ({
    maxWidth: "100%",
    height: "auto",
  }),
  caption: () => ({
    color: "#666",
    fontSize: 16,
    lineHeight: 1.5,
    paddingTop: 8,
  }),
}));

export interface ImageProps {
  imageUrl: string;
  caption: string;
  alt?: string;
}

function Image(props: ImageProps) {
  const classes = useStyles(props);
  const { imageUrl, caption, alt = "" } = props;

  const imagePath =
    imageUrl && (imageUrl.startsWith("https") || imageUrl.startsWith("http"))
      ? imageUrl
      : drupalUrl + imageUrl;

  return (
    <div className={classes.container}>
      <img alt={alt} className={classes.img} src={imagePath} />
      {caption && <div className={classes.caption}>{caption}</div>}
    </div>
  );
}

export default Image;
