// @flow

import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';

import {sendFeedbackSuccessful, sendFeedbackFailed} from './actions';
import {sendFeedback} from './requests';

import * as helpers from '../helpers';
import {pushNotification} from '../notification/actions';
import i18n from '../root/i18n';

function* sendFeedbackSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
    } = yield call(sendFeedback, payload);

    switch (statusCode) {
      case 200:
        yield put(sendFeedbackSuccessful(payload));
        break;
      default:
        yield put(sendFeedbackFailed());
    }
  } catch (error) {
    console.error('Failed to send feedback with error "%s"', error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*() {
      yield takeLatest('myhki/feedback/SEND_FEEDBACK', sendFeedbackSaga);
    }),
  ];
}
