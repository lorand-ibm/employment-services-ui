import React from 'react';
import {withRouter, Link} from 'react-router';
import classNames from 'classnames';
import {translate} from 'react-i18next';
import flowRight from 'lodash/flowRight';
import {LazyBackground} from '../lazyImage/LazyImage';

type Props = {
  className: String,
  subtitle: String,
  slide: Object,
  t: Function,
};

const LiftUpCarouselSlide = ({
  t,
  className,
  subtitle,
  slide: {title, description, image, link, placeholder},
}: Props) => (
  <div className={classNames('myhki-lift-up-carousel-slide', className)}>
    <div className="myhki-lift-up-carousel-slide__wrapper">
      {!!subtitle && (
        <div className="myhki-lift-up-carousel-slide__subtitle myhki-lift-up-carousel-slide__subtitle-mobile">
          {subtitle}
        </div>
      )}
      <div className="myhki-lift-up-carousel-slide__info">
        {!!subtitle && <div className="myhki-lift-up-carousel-slide__subtitle">{subtitle}</div>}
        <h3 className="myhki-lift-up-carousel-slide__title">{title}</h3>
        <p className="myhki-lift-up-carousel-slide__description">{description}</p>
        <Link className="myhki-lift-up-carousel-slide__read-more" to={link}>
          {t('readMore')}
        </Link>
      </div>
      <LazyBackground className="myhki-lift-up-carousel-slide__image" background={image}>
        {!!placeholder && (
          <div className="myhki-lift-up-carousel-slide__placeholder-wrapper">{placeholder}</div>
        )}
      </LazyBackground>
    </div>
  </div>
);

export default flowRight(
  withRouter,
  translate(['common']),
)(LiftUpCarouselSlide);
