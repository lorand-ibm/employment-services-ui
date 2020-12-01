import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

import LinkDuo from '../linkduo/LinkDuo';
import {LazyBackground} from '../lazyImage/LazyImage';

type Props = {
  className: String,
  subtitle: String,
  headline: String,
  background: String,
  placeholder: Object,
  image: String,
  width: String,
  link: String,
};

const getBackground = (background, image) => {
  if (background) {
    return background;
  } else if (image) {
    return `url("${image}")`;
  }

  return null;
};

const BigCard = ({
  className,
  subtitle,
  headline,
  background,
  placeholder,
  image,
  width = '33%',
  link,
}: Props) => (
  <LinkDuo to={link}
    className={classNames('myhki-big-card', className, {
      'myhki-big-card--no-image': !background,
    })}
    style={{width: width}}
  >
        {!image && !background && !!placeholder && placeholder}
        <div className="myhki-big-card__background">
          <LazyBackground
            className={
              background
                ? background.includes('svg')
                  ? 'myhki-big-card__background-image2'
                  : 'myhki-big-card__background-image'
                : 'myhki-big-card__background-image'
            }
            backgroundImage={getBackground(background, image)}
          />
          <div className="myhki-big-card__details">
            <span className="myhki-big-card__subtitle" title={subtitle}>
              {subtitle}
            </span>
            <span className="myhki-big-card__headline">{headline}</span>
          </div>
        </div>
    </LinkDuo>
);

export default withRouter(BigCard);
