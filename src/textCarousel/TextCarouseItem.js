import React from 'react';
import classNames from 'classnames';

type Props = {
  className: String,
  bigText: String,
  title: String,
  source: String,
};

const TextCarouselItem = ({className, bigText, title, source}: Props) => (
  <div className={classNames('myhki-text-carousel-item', className)}>
    <div className="myhki-text-carousel-item__big-text">{bigText}</div>
    <div className="myhki-text-carousel-item__title">{title}</div>
    <div className="myhki-text-carousel-item__source">{source}</div>
  </div>
);

export default TextCarouselItem;
