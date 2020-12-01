import React from 'react';
import VideoCarousel from '../../videoCarousel/VideoCarousel';

type Props = {
  paragraph: Object,
};

const VideoCarouselParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--video-carousel">
    <VideoCarousel
      slides={paragraph.slides}
      colorScheme={paragraph.colorScheme}
    />
  </div>
);

export default VideoCarouselParagraph;
