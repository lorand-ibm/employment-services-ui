// @flow

import {createAction} from 'redux-actions';

import type {
  SendSustainabilityFeedbackAction,
  SendSustainabilityFeedbackSuccessfulAction,
  SendSustainabilityFeedbackFailedAction,
  SendSustainabilityFeedbackClearAction,
} from './types';
import type {SustainabilityFeedback} from './types';

export const sendSustainabilityFeedback = (feedback: SustainabilityFeedback): SendSustainabilityFeedbackAction =>
  createAction('myhki/sustainabilityFeedback/SEND_FEEDBACK')(feedback);

export const sendSustainabilityFeedbackSuccessful = (feedback: SustainabilityFeedback): SendSustainabilityFeedbackSuccessfulAction =>
  createAction('myhki/sustainabilityFeedback/SEND_FEEDBACK_SUCCESSFUL')(feedback);

export const sendSustainabilityFeedbackFailed = (): SendSustainabilityFeedbackFailedAction =>
  createAction('myhki/sustainabilityFeedback/SEND_FEEDBACK_FAILED')();

export const sendSustainabilityFeedbackClear = (): SendSustainabilityFeedbackClearAction =>
  createAction('myhki/sustainabilityFeedback/SEND_FEEDBACK_CLEAR')();
