import React from 'react';
import {withRouter, Link} from 'react-router';
import {Breadcrumbs, BreadcrumbItem} from 'react-foundation';
import {getCurrentUrl} from '../helpers'

type Props = {
  items: Array,
};

const MyhkiBreadcrumbs = ({items}: Props) => (
  <div className="myhki-breadcrumbs">
    <Breadcrumbs>
      {items.map((item, i) => {
        return (
          <>
          {item.link
            ? <BreadcrumbItem key={i} isDisabled={item.disabled}>
                <Link to={item.link}>{item.text}</Link>
              </BreadcrumbItem>
            : <BreadcrumbItem key={i} isDisabled={item.disabled} aria-current="true">
                <Link to={getCurrentUrl()} aria-current="page">{item.text}</Link>
              </BreadcrumbItem>
          }
          </>
        );
      })}
    </Breadcrumbs>
  </div>
);

export default withRouter(MyhkiBreadcrumbs);
