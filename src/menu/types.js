// @flow

import type {Action} from '../types';

export type MenuState = {
  byName: MenuMap,
  isFetching: boolean,
};

export type MenuName = string;
export type Menu = Array<Object>;
export type MenuMap = {[key: MenuName]: Menu};

export type FetchByNameAction = Action<'myhki/menu/FETCH_BY_NAME', MenuName>;
export type ReceiveAction = Action<'myhki/menu/RECEIVE', MenuMap>;
