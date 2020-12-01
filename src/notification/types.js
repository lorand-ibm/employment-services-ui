// @flow

import type {Action} from '../types';

export type NotificationState = {
  messages: Array<string>,
};

export type PushNotificationAction = Action<'myhki/notification/PUSH_NOTIFICATION', string>;
export type PopNotificationAction = Action<'myhki/notification/POP_NOTIFICATION', void>;
