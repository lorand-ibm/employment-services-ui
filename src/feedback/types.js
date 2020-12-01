// @flow

import type {Action} from '../types';

export type Feedback = {
  mail: string,
  message: string,
  field_referring_page: string,
};

export type SendFeedbackAction = Action<'myhki/feedback/SEND_FEEDBACK', Feedback>;
export type SendFeedbackSuccessfulAction = Action<
  'myhki/feedback/SEND_FEEDBACK_SUCCESSFUL',
  Feedback,
>;
export type SendFeedbackFailedAction = Action<'myhki/feedback/SEND_FEEDBACK_FAILED', void>;
