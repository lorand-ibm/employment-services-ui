// @flow

import {createAction} from 'redux-actions';

import type {
  SendFeedbackAction,
  SendFeedbackSuccessfulAction,
  SendFeedbackFailedAction,
} from './types';
import type {Feedback} from './types';

export const sendFeedback = (feedback: Feedback): SendFeedbackAction =>
  createAction('myhki/feedback/SEND_FEEDBACK')(feedback);

export const sendFeedbackSuccessful = (feedback: Feedback): SendFeedbackSuccessfulAction =>
  createAction('myhki/feedback/SEND_FEEDBACK_SUCCESSFUL')(feedback);

export const sendFeedbackFailed = (): SendFeedbackFailedAction =>
  createAction('myhki/feedback/SEND_FEEDBACK_FAILED')();
