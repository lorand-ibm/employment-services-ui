import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import classnames from 'classnames';

import {KoroTypes, Colors, CarouselSwipeTolerance} from '../constants';
import Koro from '../koro/Koro';

interface Slide {
  text: string;
  title: string;
  image: string;
  actionLink: {
    uri: string;
    title: string;
  };
  flipImageSide: boolean;
}

interface ContentSlideshowProps {
  slides: Slide[];
}

const ContentSlideshow: React.FunctionComponent<ContentSlideshowProps> = ({slides}) => {
  return (
    <Carousel
      infiniteLoop
      showArrows
      showIndicators
      showThumbs={false}
      showStatus={false}
      axis="horizontal"
      swipeScrollTolerance={CarouselSwipeTolerance}
    >
      {slides.map((slide, slideIndex) => {
        const {actionLink, title, text, image, flipImageSide} = slide;
        const slideContainerClass = flipImageSide
                                  ? classnames(
                                    'myhki-content-slideshow__slide',
                                    'myhki-content-slideshow__slide--flip',
                                  )
                                  : 'myhki-content-slideshow__slide';
        return (
          <div
            className={slideContainerClass}
            key={`content-slide-${slideIndex}`}
          >
            <div
              className="myhki-content-slideshow__image"
              style={{backgroundImage: `url(${image})`}}
            />
            <div className="myhki-content-slideshow__text myhki-paragraph--text">
              <Koro type={KoroTypes.BASIC_WAVE} color={Colors.HEL_SUOMENLINNA} flip />
              <Koro type={KoroTypes.VERTICAL_BASIC_WAVE} color={Colors.HEL_SUOMENLINNA} flip={flipImageSide} />
              <h3 className="myhki-content-slideshow__title">
                <strong>{title}</strong>
              </h3>
              {text && <div dangerouslySetInnerHTML={{__html: text}} />}
              {actionLink && (
                <a
                  className="myhki-content-slideshow__action-link"
                  href={actionLink.uri}
                >
                  <strong>{actionLink.title}</strong>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ContentSlideshow;
