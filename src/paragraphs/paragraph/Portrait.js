import React from 'react';
import Portrait from '../../portrait/Portrait';

type Props = {
  paragraph: Object,
};

const PortraitParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--portrait">
    <Portrait
      image={image}
      text={text}
      alt={alt}
      flip={flip}
      copyright={copyright}
      colorScheme={colorScheme}
    />
  </div>
);

export default PortraitParagraph;
