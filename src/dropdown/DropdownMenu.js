import React from 'react';
import classNames from 'classnames';

type Props = {
  items: Array,
  onItemClick: Function,
  active: String,
  open: Boolean,
};

const defaultOnItemClick = item => {
  console.log('DropdownMenu - onItemClick', item);
};

const DropdownMenu = ({items, open = false, active, onItemClick = defaultOnItemClick}: Props) => (
  <div
    className={classNames('myhki-dropdown-menu', {
      'myhki-dropdown-menu--open': open,
    })}
  >
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <button
            id={item.id}
            className={classNames('myhki-dropdown-menu__button', {
              'myhki-dropdown-menu__button--active': active === item.id,
            })}
            onClick={() => {
              onItemClick(item);
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default DropdownMenu;
