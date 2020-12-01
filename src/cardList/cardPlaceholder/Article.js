import React from 'react';
import classNames from 'classnames';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_news.svg';

type Props = {
  className: String,
  type: String,
};

const Article = ({type = 'default', className}: Props) => (
  <div
    className={classNames(
      'myhki-card-placeholder',
      `myhki-card-placeholder--type-${type}`,
      'myhki-card-placeholder--article',
      className,
    )}
  >
    <div className="myhki-card-placeholder__image-wrapper">
      <img className="myhki-card-placeholder__image" src={placeholderImage} alt="" />
    </div>
  </div>
);

export default Article;
