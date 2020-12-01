import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

type Props = {
  className: String,
  color: String,
  title: String,
  name: String,
  image: String,
  phone: String,
  email: String,
};

const ContactCard = ({className, color, image, title, name, phone, email}: Props) => (
  <div className={classNames('myhki-contact-card', className)}>
    <div
      className="myhki-contact-card__image"
      style={{
        backgroundImage: image ? `url("${image}")` : false,
        backgroundColor: color ? color : false,
      }}
    />
    <div className="myhki-contact-card__wrapper">
      <div className="myhki-contact-card__title">{title}</div>
      <div className="myhki-contact-card__name">{name}</div>
      <div className="myhki-contact-card__phone">{phone}</div>
      <div className="myhki-contact-card__email">{email}</div>
    </div>
  </div>
);

export default withRouter(ContactCard);
