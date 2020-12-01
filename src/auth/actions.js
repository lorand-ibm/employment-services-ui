// @flow

import {createAction} from 'redux-actions';
import type {
  User,
  FetchUserAction,
  FetchUserSuccessfulAction,
  FetchUserFailedAction,
  UpdateUser,
  UpdateUserSuccessful,
  UpdateUserFailed,
  LogoutAction,
} from './types';

export const fetchUser = (): FetchUserAction => createAction('myhki/auth/FETCH_USER')();

export const fetchUserSuccessful = (user: User): FetchUserSuccessfulAction =>
  createAction('myhki/auth/FETCH_USER_SUCCESSFUL')(user);

export const fetchUserFailed = (): FetchUserFailedAction =>
  createAction('myhki/auth/FETCH_USER_FAILED')();

export const updateUser = (user: User): UpdateUser => createAction('myhki/auth/UPDATE_USER')(user);

export const updateUserSuccessful = (user: User): UpdateUserSuccessful =>
  createAction('myhki/auth/UPDATE_USER_SUCCESSFUL')(user);

export const updateUserFailed = (): UpdateUserFailed =>
  createAction('myhki/auth/UPDATE_USER_FAILED')();

export const logout = (): LogoutAction => createAction('myhki/auth/LOGOUT')();
