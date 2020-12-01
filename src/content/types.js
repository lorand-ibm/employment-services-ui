// @flow

import type {Action} from '../types';

export type ContentState = {
  byPath: ContentMap,
  isFetching: boolean,
  pageVisited: number,
};

export type ContentId = number;
export type ContentPath = string;
export type Content = Object;
export type ContentMap = {[key: ContentPath]: Content};

export type FetchByPathAction = Action<'myhki/content/FETCH_BY_PATH', ContentPath>;
export type ReceiveAction = Action<'myhki/content/RECEIVE', ContentMap>;
export type NotFoundAction = Action<'myhki/content/NOT_FOUND', ContentMap>;

export type IncreasePageVisitedAction = Action<'myhki/content/INCREASE_PAGE_VISITED', void>;
export type ClearPageVisitedAction = Action<'myhki/content/CLEAR_PAGE_VISITED', void>;
