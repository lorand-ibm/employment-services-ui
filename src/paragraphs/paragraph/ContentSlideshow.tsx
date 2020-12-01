import React from 'react';

import ContentSlideshow from '../../contentSlideshow/ContentSlideshow';

const ContentSlideshowParagraph = ({slides = []}) => {
  if (slides.length < 1) {
    return null;
  }

  return (
    <div className="myhki-content-slideshow">
      <ContentSlideshow slides={slides} />
    </div>
  );
};

export default ContentSlideshowParagraph;
