import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

import StaffMember from './StaffMember';

type Props = {
  className: String,
  title: String,
  details: String,
  items: Array,
};

const StaffBlock = ({className, title, details, items}: Props) => (
  <div className={classNames('myhki-staff-block', className)}>
    <div className="myhki-staff-block__wrapper">
      <div className="myhki-staff-block__title">{title}</div>
      <div className="myhki-staff-block__details" dangerouslySetInnerHTML={{__html: details}} />
      <div className="myhki-staff-block__members">
        {items.map((staffMember, i) => (
          <StaffMember
            key={i}
            title={staffMember.title}
            name={staffMember.name}
            phone={staffMember.phone}
            email={staffMember.email}
          />
        ))}
      </div>
    </div>
  </div>
);

export default withRouter(StaffBlock);
