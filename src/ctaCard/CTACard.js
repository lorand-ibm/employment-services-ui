import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

type Props = {
  className: String,
  image: String,
  color: String,
  text: String,
  link: Object,
  width: String,
};

const CTACard = ({className, image, color, text, link, width = '25%'}: Props) => (
  <div className={classNames('myhki-cta-card', className)} style={{width: width}}>
    <div className="myhki-cta-card__wrapper" style={{backgroundColor: color}}>
      <div className="myhki-cta-card__image-container">
        {!!image && (
          <div className="myhki-cta-card__image" style={{backgroundImage: 'url(' + image + ')'}}>
          </div>
        )}
      </div>
      {!!text && <div className="myhki-cta-card__text">{text}</div>}
      {link && (
        <Link className="myhki-cta-card__link button hollow" to={link.link}>
          {link.text}
        </Link>
      )}
    </div>
  </div>
);

export default CTACard;
