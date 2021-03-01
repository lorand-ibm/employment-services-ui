import React from "react";

function Image(props) {
  const { image, site } = props;

  //const height = props.height ? props.height : 400;
  const path = image && (image.startsWith('https') || image.startsWith('http')) ? image : site + image;

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
