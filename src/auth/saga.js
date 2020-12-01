// @flow

import {takeLatest} from 'redux-saga';
import {fork, put, call} from 'redux-saga/effects';
import Cookies from 'universal-cookie';

import {
  fetchUserSuccessful,
  fetchUserFailed,
  updateUserSuccessful,
  updateUserFailed,
} from './actions';
import {updateUser} from './requests';
import i18n from '../root/i18n';
import {pushNotification} from '../notification/actions';
import * as helpers from '../helpers';

function* fetchUserSaga(cookieHeader?: string): Generator<> {
  try {
    const cookies = new Cookies(global.IS_CLIENT ? undefined : cookieHeader),
      user = cookies.get('MYHKI_USER');

    if (user) {
      yield put(fetchUserSuccessful(user));
    } else {
      yield put(fetchUserFailed());
    }
  } catch (error) {
    console.error('Failed to fetch user from cookie with error "%s"', error);
    console.error(error);
  }
}

function* updateUserSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(updateUser, payload);

    switch (statusCode) {
      case 200:
        yield put(updateUserSuccessful(bodyAsJson));
        yield helpers.hideEditModal();
        yield put(pushNotification(i18n.t('common:saveSuccessText')));
        break;
      default:
        yield put(pushNotification(i18n.t('common:submissionFailedText')));
        yield put(updateUserFailed());
    }
  } catch (error) {
    console.error('Failed to update the user with error "%s"', error);
  }
}

export default function*({cookieHeader}: {cookieHeader?: string}): Generator<*, *, *> {
  yield [
    fork(function*() {
      yield* takeLatest('myhki/auth/FETCH_USER', function*(): Generator<> {
        yield call(fetchUserSaga, cookieHeader);
      });
    }),
    fork(function*() {
      yield* takeLatest('myhki/auth/UPDATE_USER', updateUserSaga);
    }),
  ];
}
