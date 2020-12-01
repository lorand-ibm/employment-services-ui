import React from 'react';
import classNames from 'classnames';

type Props = {
  className: String,
  title: String,
  image: String,
};

const ImageCarouselSlide = ({className, title, image}: Props) => (
  <div className={classNames('myhki-image-slide', className)}>
    <div className="myhki-image-slide__image" style={{backgroundImage: `url("${image}")`}} />
    <div className="myhki-image-slide__title">{title}</div>
  </div>
);

export default ImageCarouselSlide;
