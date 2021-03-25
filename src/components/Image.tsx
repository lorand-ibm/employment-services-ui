import React from "react";
import { drupalUrl } from "../config";

interface ImageProps {
  image: string;
}

function Image(props: ImageProps) {
  const { image } = props;

  //const height = props.height ? props.height : 400;
  const path = image && (image.startsWith('https') || image.startsWith('http')) ? image : drupalUrl + image;

  const containerStyle = {
    paddingBottom: '50%',
    height: 0,
    overflow: 'hidden'
  };

  const imgStyle = {
    maxWidth: '100%',
    height: 'auto'
  }

  return (
    <div style={containerStyle}>
      <img alt="" style={imgStyle}
        src={path}></img>
    </div>
  );
}

export default Image;
