// @flow

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';

import type {SustainabilityFeedback} from './types';

export const sendSustainabilityFeedback = (feedback: SustainabilityFeedback) => {
  const headers = new Headers({'Content-Type': 'application/json'});

  const request = new Request(createUrl('send-feedback'), {
    method: 'POST',
    body: JSON.stringify(feedback),
    headers,
  });

  return callApi(request);
};
