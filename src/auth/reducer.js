// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {FetchUserSuccessfulAction, UpdateUserSuccessful} from './types';

export const userReducer: Reducer<mixed> = handleActions(
  {
    ['myhki/auth/FETCH_USER_SUCCESSFUL']: (state, {payload: user}: FetchUserSuccessfulAction) =>
      user,
    ['myhki/auth/UPDATE_USER_SUCCESSFUL']: (state, {payload: user}: UpdateUserSuccessful) => user,
    ['myhki/auth/FETCH_USER_FAILED']: () => null,
    ['myhki/auth/LOGOUT']: () => null,
  },
  null,
);

export const isUpdatingReducer: Reducer<boolean> = handleActions(
  {
    ['myhki/auth/UPDATE_USER']: () => true,
    ['myhki/auth/UPDATE_USER_SUCCESSFUL']: () => false,
    ['myhki/auth/UPDATE_USER_FAILED']: () => false,
  },
  false,
);

export default combineReducers({
  user: userReducer,
  isUpdating: isUpdatingReducer,
});
