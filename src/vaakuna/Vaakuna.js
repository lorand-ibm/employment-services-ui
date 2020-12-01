import React from 'react';
import classNames from 'classnames';

type Props = {
  className: String,
};

const Vaakuna = ({className}: Props) => (
  <div className={classNames('myhki-vaakuna', className)}>
    <div className="myhki-vaakuna__bottom">
      <div className="myhki-vaakuna__left-corner" />
      <div className="myhki-vaakuna__left" />
      <div className="myhki-vaakuna__center" />
      <div className="myhki-vaakuna__right" />
      <div className="myhki-vaakuna__right-corner" />
    </div>
  </div>
);

export default Vaakuna;
