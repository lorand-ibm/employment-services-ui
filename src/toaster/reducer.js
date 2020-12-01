// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {MessageQueue, AddMessageAction, RemoveMessageAction} from './types';

export const messagesReducer: Reducer<MessageQueue> = handleActions(
  {
    ['myhki/toaster/ADD_MESSAGE']: (state, {payload: message}: AddMessageAction) => [
      ...state,
      message,
    ],
    ['myhki/toaster/REMOVE_MESSAGE']: (state, {payload: removedMessageId}: RemoveMessageAction) =>
      state.filter(({id}) => id !== removedMessageId),
  },
  [],
);

export default combineReducers({
  messages: messagesReducer,
});
