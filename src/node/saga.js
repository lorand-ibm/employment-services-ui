// @flow

import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {receiveError} from '../api/actions';
import {receiveNode} from './actions';
import {fetchByIdRequest} from './requests';

import type {FetchByIdAction} from './types';

function* fetchByNodeIdSaga({payload: nid}: FetchByIdAction): Generator<> {
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(fetchByIdRequest, nid);

    if (statusCode === 200) {
      yield put(receiveNode(bodyAsJson));
    } else {
      yield put(receiveError(bodyAsJson));
    }
  } catch (error) {
    console.error('Failed to fetch node (#%s) with error "%s"', nid, error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*() {
      yield takeLatest('myhki/node/FETCH_BY_ID', fetchByNodeIdSaga);
    }),
  ];
}
