// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';

const isSendingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/sustainabilityFeedback/SEND_FEEDBACK': () => true,
    'myhki/sustainabilityFeedback/SEND_FEEDBACK_SUCCESSFUL': () => false,
    'myhki/sustainabilityFeedback/SEND_FEEDBACK_FAILED': () => false,
    'myhki/sustainabilityFeedback/SEND_FEEDBACK_CLEAR': () => false,
  },
  false,
);

const isSentReducer: Reducer<boolean> = handleActions(
  {
    'myhki/sustainabilityFeedback/SEND_FEEDBACK_SUCCESSFUL': () => true,
    'myhki/sustainabilityFeedback/SEND_FEEDBACK_CLEAR': () => false,
  },
  false,
);

export default combineReducers({
  isSending: isSendingReducer,
  isSent: isSentReducer,
});
