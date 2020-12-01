// @flow

import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';

import {
  sendSustainabilityFeedbackSuccessful,
  sendSustainabilityFeedbackFailed,
} from './actions';
import {sendSustainabilityFeedback} from './requests';
import {pushNotification} from '../notification/actions';
import i18n from '../root/i18n';

function* sendSustainabilityFeedbackSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
    } = yield call(sendSustainabilityFeedback, payload);

    switch (statusCode) {
      case 200:
        yield put(sendSustainabilityFeedbackSuccessful(payload));
        yield put(pushNotification(i18n.t('common:submissionSuccessText')));
        break;
      default:
        yield put(pushNotification(i18n.t('common:submissionFailedText')));
        yield put(sendSustainabilityFeedbackFailed());
    }
  } catch (error) {
    console.error('Failed to send feedback with error "%s"', error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*() {
      yield takeLatest('myhki/sustainabilityFeedback/SEND_FEEDBACK', sendSustainabilityFeedbackSaga);
    }),
  ];
}
