// @flow

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';

import type {Feedback} from './types';

export const sendFeedback = (feedback: Feedback) => {
  const headers = new Headers({'Content-Type': 'application/json'});

  const request = new Request(createUrl('send-feedback'), {
    method: 'POST',
    body: JSON.stringify(feedback),
    headers,
  });

  return callApi(request);
};
