// @flow

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';
import i18n from '../root/i18n';

import type {MyHelsinkiList} from './types';
import type {UserId} from '../auth/types';
import type {ContentId} from '../content/types';

export const fetchUsersLists = (userId: UserId): Generator<> =>
  callApi(
    new Request(
      createUrl(`my-helsinki-users-lists`, {
        language: i18n.language,
        userId: userId,
      }),
    ),
  );

export const createNewList = (list: MyHelsinkiList) => {
  const headers = new Headers({'Content-Type': 'application/json'});

  const request = new Request(createUrl('my-helsinki-list'), {
    method: 'POST',
    body: JSON.stringify(list),
    headers,
  });

  return callApi(request);
};

export const updateList = (list: MyHelsinkiList) => {
  const headers = new Headers({'Content-Type': 'application/json'});

  const request = new Request(createUrl(`my-helsinki-list/${String(list.nid)}`), {
    method: 'PUT',
    body: JSON.stringify(list),
    headers,
  });

  return callApi(request);
};

export const deleteList = (listId: ContentId) => {
  const headers = new Headers({'Content-Type': 'application/json'});

  const request = new Request(createUrl(`my-helsinki-list/${listId}`), {
    method: 'DELETE',
    headers,
  });

  return callApi(request);
};
