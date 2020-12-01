import React from 'react';
import flowRight from 'lodash/flowRight';
import {withRouter, Link} from 'react-router';
import classNames from 'classnames';

import {Colors} from '../constants';

type Props = {
  className: String,
  title: String,
  link: String,
  background: String,
};

const SectionPageItem = ({className, title, link, background = Colors.HEL_SILVER}: Props) => (
  <div className={classNames('section-page-item', className)}>
    <Link to={link} className="section-page-item__wrapper" style={{background: background}}>
      <div className="section-page-item__title">{title}</div>
    </Link>
  </div>
);

export default flowRight(withRouter)(SectionPageItem);
