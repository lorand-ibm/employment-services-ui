import React from 'react';
import classNames from 'classnames';

type Props = {
  className: String,
  items: Array,
  title: String,
};

const LinkList = ({className, title, items = []}: Props) => (
  <div className={classNames('myhki-link-list', className)}>
    {!!title && <h3 className="myhki-link-list__title">{title}</h3>}
    <div className="myhki-link-list__links">
      {items.map((category, categoryIndex) => (
        <div className="myhki-link-list__category" key={categoryIndex}>
          {!!category.title && (
            <h4 className="myhki-link-list__category-title">{category.title}</h4>
          )}
          <ul>
            {category.links.map((link, linkIndex) => (
              <li key={linkIndex} className="myhki-link-list__link">
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default LinkList;
