// @flow

import {createAction} from 'redux-actions';

import type {
  Filters,
  SearchMap,
  FetchByFiltersAction,
  FetchAllByFiltersAction,
  ReceiveAction,
  ReceiveAllAction,
} from './types';

export const fetchSearchByFilters = (filters: Filters): FetchByFiltersAction =>
  createAction('myhki/search/FETCH_BY_FILTERS')(filters);

export const fetchSearchAllByFilters = (filters: Filters): FetchAllByFiltersAction =>
  createAction('myhki/search/FETCH_ALL_BY_FILTERS')(filters);

export const receiveSearch = (map: SearchMap): ReceiveAction =>
  createAction('myhki/search/RECEIVE')(map);

export const receiveAllSearch = (map: SearchMap): ReceiveAllAction =>
  createAction('myhki/search/RECEIVE_ALL')(map);
