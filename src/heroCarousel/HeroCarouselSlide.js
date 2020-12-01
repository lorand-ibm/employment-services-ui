import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import ReactPlayer from 'react-player/lazy';
import {translate} from 'react-i18next';
import flowRight from 'lodash/flowRight';

import {Colors, KoroTypes} from '../constants';
import {useBlackTextForHeroBackground} from '../content/helpers';
import Koro from '../koro/Koro';
import {LazyBackground} from '../lazyImage/LazyImage';
import LinkDuo from '../linkduo/LinkDuo';

type Props = {
  t: Function,
  className: String,
  slide: Object,
  hidden: Boolean,
};

const HeroCarouselSlide = ({t, className, slide, hidden}: Props) => {
  const useBlackTextForBackground = useBlackTextForHeroBackground(slide.background)

  return(
  <div
    className={classNames('myhki-hero-carousel-slide', className, {
      'myhki-hero-carousel-slide--hidden': hidden,
    })}
  >
    <LazyBackground
      background={slide.background}
      className={
        (slide.background || '').includes('svg')
          ? 'myhki-hero-carousel-slide__bg2'
          : 'myhki-hero-carousel-slide__bg'
      }
      style={slide.background ? null : {background: Colors.HEL_SILVER}}
    />
    {!!slide.video && (
      <div className="myhki-hero-carousel-slide__video">
        <ReactPlayer
          fileConfig={{attributes: {autoPlay: true, muted: true}}}
          playsinline={true}
          url={slide.video}
          width="100%"
          height="100%"
          loop={slide.loop}
          volume={0}
          playing={!hidden}
        />
      </div>
    )}
    <div className="myhki-hero-carousel-slide__subpage myhki-hero-carousel-slide__subpage--mobile">
      {slide.subpage}
    </div>
    <div className="myhki-hero-carousel-slide__wrapper">
      <Koro type={KoroTypes.BASIC_WAVE} color={Colors.WHITE} flip />
      <div className={classNames("myhki-hero-carousel-slide__subpage myhki-hero-carousel-slide__subpage--desktop", {
        'myhki-hero-carousel-slide__subpage--black-text': useBlackTextForBackground,
        })}>
        {slide.subpage}
      </div>
      {!!slide.link ? (
        <LinkDuo to={slide.link} className={classNames("myhki-hero-carousel-slide__title", {
          'myhki-hero-carousel-slide__title--black-text': useBlackTextForBackground,
        })}>
        {slide.title}
        <span className={classNames("myhki-hero-carousel-slide__read-more", {
          'myhki-hero-carousel-slide__read-more--black-text': useBlackTextForBackground,
        })}>
          {t('readMore')}
        </span>
        </LinkDuo>
        ) : (
        <div className={classNames("myhki-hero-carousel-slide__title", {
          'myhki-hero-carousel-slide__title--black-text': useBlackTextForBackground,
        })}>{slide.title}</div>
      )}
    </div>
  </div>
  )
};

export default flowRight(
  withRouter,
  translate(['common']),
)(HeroCarouselSlide);
