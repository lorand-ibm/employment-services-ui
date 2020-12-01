// @flow

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';
import type {User} from './types';

export const updateUser = (user: User) => {
  const headers = new Headers({'Content-Type': 'application/json'});

  const request = new Request(createUrl(`user/${String(user.uid)}`), {
    method: 'PUT',
    body: JSON.stringify(user),
    headers,
  });

  return callApi(request);
};
