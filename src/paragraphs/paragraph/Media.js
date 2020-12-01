import React from 'react';
import {LazyImage} from '../../lazyImage/LazyImage';

type Props = {
  paragraph: Object,
};

const Media = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--media">
    <div className="myhki-paragraph--media--image">
      <LazyImage
        alt={paragraph.alt && paragraph.alt}
        title={paragraph.title && paragraph.title}
        src={paragraph.src}
      />
      {paragraph.source || paragraph.copyright ? (
        <div className="myhki-paragraph--media--image--source">
          {paragraph.title && paragraph.title}
          {paragraph.title && (paragraph.copyright || paragraph.source) && ` / `}
          {paragraph.copyright && paragraph.copyright && `© ${paragraph.copyright}`}
          {paragraph.copyright && paragraph.source && `, `}
          {paragraph.source && paragraph.source}
        </div>
      ) : null}
    </div>
  </div>
);

export default Media;
