import type {Selector} from '../types';

export const getIsSending: Selector<boolean, void> = state => state.feedback.isSendingFeedback;
