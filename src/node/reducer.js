// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {NodeMap, ReceiveAction} from './types';

const byIdReducer = handleActions(
  {
    ['myhki/node/RECEIVE']: (state: NodeMap, {payload: node}: ReceiveAction) => ({
      ...state,
      [node.nid[0].value]: node,
    }),
  },
  {},
);

export default combineReducers({
  byId: byIdReducer,
});
