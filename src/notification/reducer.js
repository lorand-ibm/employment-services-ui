// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import drop from 'lodash/drop';

import type {Reducer} from '../types';

const messageReducer: Reducer<Array<string>> = handleActions(
  {
    'myhki/notification/PUSH_NOTIFICATION': (state, {payload}) => [...state, payload],
    'myhki/notification/POP_NOTIFICATION': state => drop(state, 1),
  },
  [],
);

export default combineReducers({
  messages: messageReducer,
});
