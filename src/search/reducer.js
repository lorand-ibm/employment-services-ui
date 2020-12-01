// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {SearchMap, ReceiveAction} from './types';

const isFetchingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/search/FETCH_BY_FILTERS': () => true,
    'myhki/search/FETCH_ALL_BY_FILTERS': () => true,
    'myhki/search/RECEIVE': () => false,
    'myhki/search/RECEIVE_ALL': () => false,
  },
  false,
);

const byFiltersReducer: Reducer<SearchMap> = handleActions(
  {
    'myhki/search/RECEIVE': (state, {payload: map}: ReceiveAction) => ({
      ...state,
      ...map,
    }),
    'myhki/search/RECEIVE_ALL': (state, {payload: map}: ReceiveAction) => {
      return map;
    },
  },
  {},
);

export default combineReducers({
  byFilters: byFiltersReducer,
  isFetching: isFetchingReducer,
});
