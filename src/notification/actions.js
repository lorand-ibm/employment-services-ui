// @flow

import {createAction} from 'redux-actions';

import type {PushNotificationAction, PopNotificationAction} from './types';

export const pushNotification = (message: string): PushNotificationAction =>
  createAction('myhki/notification/PUSH_NOTIFICATION')(message);

export const popNotification = (): PopNotificationAction =>
  createAction('myhki/notification/POP_NOTIFICATION')();
