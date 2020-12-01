// @flow

import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {receiveContent, notFound} from './actions';
import {fetchByPathRequest} from './requests';
import has from 'lodash/has';

import type {FetchByPathAction} from './types';

function* fetchContentByPathSaga({payload}: FetchByPathAction): Generator<> {
  const {path, bypassCache} = payload;
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(fetchByPathRequest, path, bypassCache);

    switch (statusCode) {
      case 200:
        if (has(bodyAsJson, 'redirect_location')) {
          const location = {
            pathname: '/externalRedirect',
            query: {
              redirectUrl: bodyAsJson.redirect_location,
            },
          };
          yield put(push(location));
          break;
        }
        yield put(receiveContent({[path]: bodyAsJson}));
        break;
      case 403:
      case 404:
      case 500:
        yield put(notFound({}));
        break;
    }
  } catch (error) {
    console.error('Failed to fetch content (%s) with error "%s"', path, error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*(): Generator<> {
      yield takeLatest('myhki/content/FETCH_BY_PATH', fetchContentByPathSaga);
    }),
  ];
}
