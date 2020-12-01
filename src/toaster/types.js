// @flow

import type {Action} from '../types';

export type Message = {
  id: MessageId,
  text: string,
};

export type MessageId = number;

export type MessageQueue = Array<Message>;

export type ToasterState = {
  messages: MessageQueue,
};

export type AddMessageAction = Action<'myhki/toaster/ADD_MESSAGE', Message>;
export type RemoveMessageAction = Action<'myhki/toaster/REMOVE_MESSAGE', MessageId>;
