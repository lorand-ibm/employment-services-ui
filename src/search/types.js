// @flow

import type {Action} from '../types';

export type SearchState = {
  byFilters: Search,
  isFetching: boolean,
};

export type Keywords = string;
export type Filters = {
  keywords: Keywords,
  type: string,
  category: string,
  tags: Array<string>,
  type: string,
  dateTo: string,
  dateFrom: string,
  page: number,
  language: string,
};
export type Search = Object;
export type SearchMap = {[key: string]: Search};

export type FetchByFiltersAction = Action<'myhki/search/FETCH_BY_FILTERS', Filters>;
export type FetchAllByFiltersAction = Action<'myhki/search/FETCH_ALL_BY_FILTERS', Filters>;
export type ReceiveAction = Action<'myhki/search/RECEIVE', SearchMap>;
export type ReceiveAllAction = Action<'myhki/search/RECEIVE_ALL', SearchMap>;
