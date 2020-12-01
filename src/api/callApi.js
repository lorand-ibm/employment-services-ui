// @flow

import {call, put} from 'redux-saga/effects';

import {getAuthUrl} from '../auth/helpers';
import {receiveError} from './actions';

function* callApi(request: Request): Generator<> {
  yield put({type: 'CALL_API_START'});
  request = new Request(request, {
    credentials: 'include',
  });

  const response = yield call(fetch, request);
  const bodyAsJson = yield call([response, response.json]);

  if (response.status === 401) {
    if (global.IS_CLIENT) {
      window.location.replace(getAuthUrl('logout'));
    }
  }

  if (response.status === 500) {
    yield put(receiveError(bodyAsJson));
  }

  yield put({type: 'CALL_API_END'});
  return {response, bodyAsJson};
}

export default callApi;
