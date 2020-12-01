// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {ViewMap, ReceiveAction} from './types';

const isFetchingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/view/FETCH_BY_NAME': () => true,
  },
  false,
);

const byNameReducer: Reducer<ViewMap> = handleActions(
  {
    'myhki/view/RECEIVE': (state, {payload: map}: ReceiveAction) => ({
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
