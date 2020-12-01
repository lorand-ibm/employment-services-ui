import type {Selector} from '../types';

export const getIsSending: Selector<boolean, void> = state => state.sustainabilityFeedback.isSending;

export const getIsSent: Selector<boolean, void> = state => state.sustainabilityFeedback.isSent;
