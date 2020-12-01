// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {MenuMap, ReceiveAction} from './types';

const isFetchingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/menu/FETCH_BY_NAME': () => true,
    'myhki/menu/RECEIVE': () => false,
  },
  false,
);

const byNameReducer: Reducer<MenuMap> = handleActions(
  {
    'myhki/menu/RECEIVE': (state, {payload: map}: ReceiveAction) => ({
      ...state,
      ...map,
    }),
  },
  {},
);

export default combineReducers({
  byName: byNameReducer,
  isFetching: isFetchingReducer,
});
