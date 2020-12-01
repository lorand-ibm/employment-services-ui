// @flow

import {takeEvery} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {receiveView} from './actions';
import {fetchByNameRequest} from './requests';

import type {FetchByNameAction} from './types';

function* fetchViewByNameSaga({payload}: FetchByNameAction): Generator<> {
  const {name, lang, bypassCache} = payload;
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(fetchByNameRequest, name, lang, bypassCache);

    if (statusCode === 200) {
      yield put(receiveView({[name]: bodyAsJson}));
    }
  } catch (error) {
    console.error('Failed to fetch view (%s) with error "%s"', name, error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*(): Generator<> {
      yield takeEvery('myhki/view/FETCH_BY_NAME', fetchViewByNameSaga);
    }),
  ];
}
