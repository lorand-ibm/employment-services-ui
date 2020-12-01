import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

import {getFoundationBreakpoint} from '../helpers.js';
import {LazyImage} from '../lazyImage/LazyImage.js';

type Props = {
  className: String,
  title: String,
  photos: Array,
};

const getMaxItems = () => {
  return getFoundationBreakpoint() === 'small' ? 5 : 6;
};

const PhotoGrid = ({className, title, photos = []}: Props) => (
  <div className={classNames('myhki-photo-grid', className)}>
    {title && <h2 className="myhki-photo-grid__title">{title}</h2>}
    <div className="myhki-photo-grid__wrapper">
      {photos.slice(0, getMaxItems()).map((photo, i) => (
        <a key={i} href={photo.url} target="_blank" rel="noopener noreferrer" className="myhki-photo-grid__photo">
          <LazyImage
            src={photo.thumbnail}
            alt={photo.caption}/>
        </a>
      ))}
    </div>
  </div>
);

export default withRouter(PhotoGrid);

