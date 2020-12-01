// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import apiReducer from '../api/reducer';
import authReducer from '../auth/reducer';
import contentReducer from '../content/reducer';
import menuReducer from '../menu/reducer';
import viewReducer from '../view/reducer';
import nodeReducer from '../node/reducer';
import toasterReducer from '../toaster/reducer';
import searchReducer from '../search/reducer';
import myHelsinkiReducer from '../myHelsinki/reducer';
import feedbackReducer from '../feedback/reducer';
import notificationReducer from '../notification/reducer';
import sustainabilityFeedbackReducer from '../sustainabilityFeedback/reducer';

import type {Reducer} from '../types';
import type {RootState} from './types';

export default (): Reducer<RootState> =>
  combineReducers({
    api: apiReducer,
    auth: authReducer,
    content: contentReducer,
    menu: menuReducer,
    view: viewReducer,
    form: formReducer,
    node: nodeReducer,
    routing: routerReducer,
    toaster: toasterReducer,
    search: searchReducer,
    myHelsinki: myHelsinkiReducer,
    feedback: feedbackReducer,
    notification: notificationReducer,
    sustainabilityFeedback: sustainabilityFeedbackReducer,
    numberOfApiCallsOngoing: handleActions(
      {
        CALL_API_START: (initial: number) => initial + 1,
        CALL_API_END: (initial: number) => initial - 1,
      },
      0,
    ),
  });
