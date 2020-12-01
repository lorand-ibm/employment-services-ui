import React from 'react';
import {withRouter, Link} from 'react-router';
import classNames from 'classnames';

type Props = {
  className: String,
  tags: Array,
  allLink: Object,
  collapseMargins?: Boolean,
};

const Tags = ({className, tags, allLink, collapseMargins}: Props) => (
  <div className={classNames('myhki-tags', className, {
    'myhki-tags--collapse-margins': collapseMargins,
  })}>
    <ul>
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <Link className="myhki-tag" to={tag.link} onlyActiveOnIndex={true}>
              #{tag.name}
            </Link>
          </li>
        );
      })}
    </ul>
    {!!allLink && (
      <Link className="myhki-tags__all-link" to={allLink.link} onlyActiveOnIndex={true}>
        {allLink.text}
      </Link>
    )}
  </div>
);

export default withRouter(Tags);
