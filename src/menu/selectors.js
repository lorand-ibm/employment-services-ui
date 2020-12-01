// @flow

import type {Selector} from '../types';
import type {MenuName, Menu} from './types';
import {getIsAuthenticated, getUser} from '../auth/selectors';

import {
  MainMenuByLanguage,
  FooterTopMenuByLanguage,
  FooterBottomMenuByLanguage,
  WHATS_POPULAR,
  SearchMenuByLanguage,
} from '../constants';

export const getMenuByName: Selector<Menu, {name: MenuName}> = (state, {name}): Menu =>
  state.menu.byName[name];

export const getIsFetching: Selector<boolean, void> = state => state.menu.isFetching;

export const mainMenuPageSelector: Selector<{menu: Menu, isFetching: boolean}, Object> = (
  state,
  {i18n: {language}},
) => {
  const menuName = MainMenuByLanguage[language];
  return {
    menu: getMenuByName(state, {name: menuName}),
    isFetching: getIsFetching(state),
    isAuthenticated: getIsAuthenticated(state),
    user: getUser(state),
  };
};

export const footerMenuPageSelector: Selector<{isFetching: boolean}, Object> = (
  state,
  {i18n: {language}},
) => {
  const topMenuName = FooterTopMenuByLanguage[language];
  const bottomMenuName = FooterBottomMenuByLanguage[language];

  return {
    topMenu: getMenuByName(state, {name: topMenuName}),
    bottomMenu: getMenuByName(state, {name: bottomMenuName}),
    isFetching: getIsFetching(state),
  };
};

export const searchMenuSelector: Selector<{menu: Menu, isFetching: boolean}, Object> = (
  state,
  {language},
) => {
  const viewName = WHATS_POPULAR,
    menuName = SearchMenuByLanguage[language];
  return {
    menu: getMenuByName(state, {name: menuName}),
    view: state.view.byName[viewName],
  };
};
