import React from 'react';
import LocationCarousel from '../../locationCarousel/LocationCarousel';

type Props = {
  paragraph: Object,
};

const LocationCarouselParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--location-carousel">
    <LocationCarousel
      items={paragraph.items}
      content={paragraph.content}
      collapseMargins={true}
    />
  </div>
);

export default LocationCarouselParagraph;
