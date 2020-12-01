// @flow

import type {Action} from '../types';

export type MenuState = {
  byName: ViewMap,
  isFetching: boolean,
};

export type ViewName = string;
export type View = Array<Object>;
export type ViewMap = {[key: ViewName]: View};

export type FetchByNameAction = Action<'myhki/view/FETCH_BY_NAME', ViewName>;
export type ReceiveAction = Action<'myhki/view/RECEIVE', ViewMap>;
