// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {ContentMap, ReceiveAction} from './types';
import type {UpdateListSuccessfulAction, AddItemToListSuccessfulAction} from '../myHelsinki/types';
import * as contentHelpers from './helpers';

const isFetchingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/content/FETCH_BY_PATH': () => true,
    'myhki/content/RECEIVE': () => false,
    'myhki/content/NOT_FOUND': () => false,
  },
  false,
);

const byPathReducer: Reducer<ContentMap> = handleActions(
  {
    'myhki/content/RECEIVE': (state, {payload: map}: ReceiveAction) => ({
      ...state,
      ...map,
    }),
    ['myhki/myHelsinki/UPDATE_LIST_SUCCESSFUL']: (
      state,
      {payload: list}: UpdateListSuccessfulAction,
    ) => ({
      ...state,
      [contentHelpers.getContentPath(list)]: list,
    }),
    ['myhki/myHelsinki/ADD_ITEM_TO_LIST_SUCCESSFUL']: (
      state,
      {payload: list}: AddItemToListSuccessfulAction,
    ) => ({
      ...state,
      [contentHelpers.getContentPath(list)]: list,
    }),
  },
  {},
);

const pageVisitedReducer: Reducer<number> = handleActions(
  {
    'myhki/content/INCREASE_PAGE_VISITED': state => state + 1,
    'myhki/content/CLEAR_PAGE_VISITED': () => 0,
  },
  0,
);

export default combineReducers({
  byPath: byPathReducer,
  isFetching: isFetchingReducer,
  pageVisited: pageVisitedReducer,
});
