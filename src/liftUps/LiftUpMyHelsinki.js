import React from 'react';
import {withRouter, Link} from 'react-router';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import classNames from 'classnames';

type Props = {
  t: any,
  className: String,
  title: String,
  link: String,
  color: String,
  image: String,
  color: String,
};

const LiftUpMyHelsinki = ({t, className, title, link, image, color}: Props) => (
  <div className={classNames('myhki-lift-up-my-helsinki', className)}>
    <div
      className="myhki-lift-up-my-helsinki__image"
      style={{backgroundImage: 'url(' + image + ')', backgroundColor: color}}
    />
    <div className="myhki-lift-up-my-helsinki__info" style={{backgroundColor: color}}>
      <Link className="" to={link}>
        <h3 className="myhki-lift-up-my-helsinki__title">{title}</h3>
      </Link>
      <div className="myhki-lift-up-my-helsinki__see-more-wrapper">
        <Link className="myhki-lift-up-my-helsinki__see-more" to={link}>
          {t('seeMoreLabel')}
        </Link>
      </div>
    </div>
  </div>
);

export default flowRight(
  translate(['common']),
  withRouter,
)(LiftUpMyHelsinki);
