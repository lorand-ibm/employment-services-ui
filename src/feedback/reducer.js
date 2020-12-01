// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';

const isSendingFeedbackReducer: Reducer<boolean> = handleActions(
  {
    'myhki/feedback/SEND_FEEDBACK': () => true,
    'myhki/feedback/SEND_FEEDBACK_SUCCESSFUL': () => false,
    'myhki/feedback/SEND_FEEDBACK_FAILED': () => false,
  },
  false,
);

export default combineReducers({
  isSendingFeedback: isSendingFeedbackReducer,
});
