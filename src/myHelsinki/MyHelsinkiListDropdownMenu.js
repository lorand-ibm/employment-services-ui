import React from 'react';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import {translate} from 'react-i18next';
import {Button} from 'react-foundation';
import {withRouter} from 'react-router';

import {MyHelsinkiHeartColors} from '../constants';
import * as helpers from '../helpers';
import * as contentHelpers from '../content/helpers';
import * as myHelsinkiHelpers from './helpers';

type Props = {
  t: Function,
  items: Array,
  onCloseClick: Function,
  onItemClick: Function,
  open: Boolean,
  location: Object,
};

const defaultOnItemClick = item => {
  console.log('MyHelsinkiListDropdownMenu - onItemClick', item);
};

const defaultOnCloseClick = () => {
  console.log('MyHelsinkiListDropdownMenu - close');
};

const MyHelsinkiListDropdownMenu = ({
  t,
  location,
  items,
  open = false,
  onCloseClick = defaultOnCloseClick,
  onItemClick = defaultOnItemClick,
}: Props) => (
  <div
    className={classNames('myhki-dropdown-menu my-helsinki-list-dropdown-menu', {
      'my-helsinki-list-dropdown-menu--open': open,
      'myhki-dropdown-menu--open': open,
    })}
  >
    <a className="my-helsinki-list-dropdown__close" onClick={() => onCloseClick()} />
    <h3 className="my-helsinki-list-dropdown-menu__title">{t('title')}</h3>
    <ul>
      {items &&
        items.map((item, i) => (
          <li key={i}>
            <a
              className="my-helsinki-list-dropdown-menu__item"
              href={contentHelpers.getContentPath(item)}
              onClick={() => {
                event.preventDefault();
                onItemClick(item);
              }}
            >
              <span className="my-helsinki-list-dropdown-menu__item-heart">
                <img
                  src={myHelsinkiHelpers.getHeartIcon(
                    myHelsinkiHelpers.getListHeartNumber(item),
                    MyHelsinkiHeartColors.BLACK,
                  )}
                  alt=""
                />
              </span>
              <span className="my-helsinki-list-dropdown-menu__item-title">
                {contentHelpers.getContentTitle(item)}
              </span>
              <span className="my-helsinki-list-dropdown-menu__item-count">
                <span className="count">{myHelsinkiHelpers.getListItemCount(item)}</span>
              </span>
            </a>
          </li>
        ))}
    </ul>
    <div className="my-helsinki-list-dropdown-menu__create-list-button-wrapper">
      <Button
        className="my-helsinki-list-dropdown-menu__create-list-button"
        isHollow
        onClick={() => {
          helpers.showCreateListModal(get(location, 'query.addToList') || null);
        }}
      >
        {t('createListButtonLabel')}
      </Button>
    </div>
  </div>
);

export default flowRight(
  withRouter,
  translate(['myHelsinkiListDropdown']),
)(MyHelsinkiListDropdownMenu);
