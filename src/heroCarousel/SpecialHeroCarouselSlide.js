import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

import HeroCarouselSlide from './HeroCarouselSlide';
import {HeroCarouselTypes} from '../constants';

type Props = {
  className: String,
  items: Array,
  hidden: Boolean,
  type: String,
};

const SpecialHeroCarouselSlide = ({className, items = [], hidden}: Props) => (
  <div
    className={classNames(
      className,
      'myhki-special-hero-carousel-slide',
      `myhki-special-hero-carousel-slide--items-${items.length}`,
      {
        'myhki-special-hero-carousel-slide--hidden': hidden,
      },
    )}
  >
    <div className="myhki-special-hero-carousel-slide__items">
      {items.map((item, i) => (
        <div key={i} className="myhki-special-hero-carousel-slide__item">
          <HeroCarouselSlide slide={item} hidden={hidden} type={HeroCarouselTypes.DEFAULT} />
        </div>
      ))}
    </div>
  </div>
);

export default withRouter(SpecialHeroCarouselSlide);
