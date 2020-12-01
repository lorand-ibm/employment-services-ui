// @flow

import {createAction} from 'redux-actions';

import type {ApiError, ReceiveErrorAction, ClearErrorAction} from './types';

export const receiveError = (error: ApiError): ReceiveErrorAction =>
  createAction('myhki/api/RECEIVE_ERROR')(error);

export const clearError = (): ClearErrorAction => createAction('myhki/api/CLEAR_ERROR')();
