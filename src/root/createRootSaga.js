// @flow

import {fork} from 'redux-saga/effects';
import authSaga from '../auth/saga';
import nodeSaga from '../node/saga';
import contentSaga from '../content/saga';
import menuSaga from '../menu/saga';
import viewSaga from '../view/saga';
import searchSaga from '../search/saga';
import myHelsinkiSaga from '../myHelsinki/saga';
import feedbackSaga from '../feedback/saga';
import sustainabilityFeedbackSaga from '../sustainabilityFeedback/saga';

type RootSagaOptions = {
  cookieHeader?: string,
};

export default () =>
  // $FlowFixMe
  function* rootSaga(options: RootSagaOptions) {
    yield [
      fork(authSaga, options),
      fork(nodeSaga, options),
      fork(contentSaga, options),
      fork(menuSaga, options),
      fork(viewSaga, options),
      fork(searchSaga, options),
      fork(myHelsinkiSaga, options),
      fork(feedbackSaga, options),
      fork(sustainabilityFeedbackSaga, options),
    ];
  };
