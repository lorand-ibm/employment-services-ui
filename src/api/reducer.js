// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {ApiError, ReceiveErrorAction} from './types';

export const errorReducer: Reducer<ApiError> = handleActions(
  {
    ['myhki/api/RECEIVE_ERROR']: (state, {payload: error}: ReceiveErrorAction) => error,
    ['myhki/api/CLEAR_ERROR']: () => null,
  },
  null,
);

export default combineReducers({
  error: errorReducer,
});
