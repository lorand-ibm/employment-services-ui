// @flow

import type {Selector} from '../types';
import type {MessageQueue} from './types';

export const getMessages: Selector<MessageQueue, void> = state => state.toaster.messages;
