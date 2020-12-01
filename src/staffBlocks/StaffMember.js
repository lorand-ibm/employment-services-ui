import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

type Props = {
  className: String,
  title: String,
  name: String,
  phone: String,
  email: String,
};

const StaffMember = ({className, title, name, phone, email}: Props) => (
  <div className={classNames('myhki-staff-member', className)}>
    <div className="myhki-staff-member__wrapper">
      <div className="myhki-staff-member__title">{title}</div>
      <div className="myhki-staff-member__name">{name}</div>
      <div className="myhki-staff-member__phone">{phone}</div>
      <div className="myhki-staff-member__email">{email}</div>
    </div>
  </div>
);

export default withRouter(StaffMember);
