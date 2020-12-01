// @flow

import type {Action} from '../types';

export type User = {
  uid: number,
  displayName: string,
  roles: Array<string>,
  photos: Array<Object>,
  emails: Array<Object>,
};
export type UserId = number;

export type AuthState = {
  isAuthenticated: boolean,
  user: ?User,
};

export type FetchUserAction = Action<'myhki/auth/FETCH_USER', void>;
export type FetchUserSuccessfulAction = Action<'myhki/auth/FETCH_USER_SUCCESSFUL', User>;
export type FetchUserFailedAction = Action<'myhki/auth/FETCH_USER_FAILED', void>;
export type LogoutAction = Action<'myhki/auth/LOGOUT', void>;
export type UpdateUser = Action<'myhki/auth/UPDATE_USER', User>;
export type UpdateUserSuccessful = Action<'myhki/auth/UPDATE_USER_SUCCESSFUL', User>;
export type UpdateUserFailed = Action<'myhki/auth/UPDATE_USER_FAILED', void>;
