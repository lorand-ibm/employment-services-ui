import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import {LiftUpCollectionTypes} from '../constants';
import {LazyLink} from '../lazyImage/LazyImage';

type Props = {
  className: String,
  title: String,
  background: String,
  color: String,
  link: String,
  type: String,
};

const LiftUpCollectionItem = ({className, title, background, color, link, type}: Props) => (
  <div
    className={classNames(
      'myhki-lift-up-collection-item',
      className,
      'myhki-lift-up-collection-item--type-' + (type || LiftUpCollectionTypes.DEFAULT),
    )}
  >
    <LazyLink
      className="myhki-lift-up-collection-item__wrapper"
      to={link}
      background={background || 'transparent'}
    >
      <h3 className="myhki-lift-up-collection-item__title" style={{color: color}}>
        {title}
      </h3>
    </LazyLink>
  </div>
);

export default withRouter(LiftUpCollectionItem);
