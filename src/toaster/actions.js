// @flow

import {createAction} from 'redux-actions';

import type {MessageId, AddMessageAction, RemoveMessageAction} from './types';

let messageId = 1;

export const addMessage = (text: string): AddMessageAction =>
  createAction('myhki/toaster/ADD_MESSAGE')({
    id: messageId++,
    text,
  });

export const removeMessage = (id: MessageId): RemoveMessageAction =>
  createAction('myhki/toaster/REMOVE_MESSAGE')(id);
