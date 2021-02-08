import * as React from "react";

function Image(props) {
  const { image, site } = props;

  //const height = props.height ? props.height : 400;
  const path = site + image;

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
      <img style={imgStyle}
        src={path}></img>
    </div>
  );
}

export default Image;
