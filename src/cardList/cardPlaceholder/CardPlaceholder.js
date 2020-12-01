import React from 'react';
import classNames from 'classnames';

import {Colors} from '../../constants';

type Props = {
  color: String,
  image: String,
  flip: Boolean,
  type: String,
};

const CardPlaceholder = ({type = 'default', color = Colors.HEL_VAAKUNA, image}: Props) => (
  <div
    className={classNames('myhki-card-placeholder', `myhki-card-placeholder--type-${type}`)}
  >
    <div className="myhki-card-placeholder__wrapper">
      <div className="myhki-card-placeholder__primary" style={{background: color}} />
    </div>
    {image && <img className="myhki-card-placeholder__image" src={image} alt="" />}
  </div>
);

export default CardPlaceholder;
