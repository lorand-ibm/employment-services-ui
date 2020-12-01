// @flow

import type {Action} from '../types';

export type SustainabilityFeedback = {
  field_service_name: string,
  field_service_exemplary_check: boolean,
  field_service_exemplary_text: string,
  field_service_problem_check: boolean,
  field_service_problem_text: string,
  field_service_incomplete_check: boolean,
  field_service_incomplete_text: string,
  field_criteria_useful_check: boolean,
  field_criteria_useful_text: string,
  field_criteria_clear_check: boolean,
  field_criteria_clear_text: string,
  field_criteria_coverage_check: boolean,
  field_criteria_coverage_text: string,
  field_criteria_reliable_check: boolean,
  field_criteria_reliable_text: string,
  field_criteria_feedback: string,
  field_addition_name: string,
  field_addition_message: string,
  mail: string,
  field_referring_page: string,
};

export type SendSustainabilityFeedbackAction = Action<
  'myhki/sustainabilityFeedback/SEND_FEEDBACK',
  SustainabilityFeedback
>;
export type SendSustainabilityFeedbackSuccessfulAction = Action<
  'myhki/sustainabilityFeedback/SEND_FEEDBACK_SUCCESSFUL',
  SustainabilityFeedback,
>;
export type SendSustainabilityFeedbackFailedAction = Action<
  'myhki/sustainabilityFeedback/SEND_FEEDBACK_FAILED',
  void,
>;
export type SendSustainabilityFeedbackClearAction = Action<
  'myhki/sustainabilityFeedback/SEND_FEEDBACK_CLEAR',
  void,
>;

