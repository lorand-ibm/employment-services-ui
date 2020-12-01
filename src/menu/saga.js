// @flow

import {takeEvery} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {receiveMenu} from './actions';
import {fetchByNameRequest} from './requests';

import type {FetchByNameAction} from './types';

function* fetchMenuByNameSaga({payload}: FetchByNameAction): Generator<> {
  const {name, lang, bypassCache} = payload;
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(fetchByNameRequest, name, lang, bypassCache);

    if (statusCode === 200) {
      yield put(receiveMenu({[name]: bodyAsJson}));
    }
  } catch (error) {
    console.error('Failed to fetch menu (%s) with error "%s"', name, error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*(): Generator<> {
      yield takeEvery('myhki/menu/FETCH_BY_NAME', fetchMenuByNameSaga);
    }),
  ];
}
