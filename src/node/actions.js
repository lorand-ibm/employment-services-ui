// @flow

import {createAction} from 'redux-actions';

import type {NodeId, Node, FetchByIdAction, ReceiveAction} from './types';

export const fetchByNodeId = (nid: NodeId): FetchByIdAction =>
  createAction('myhki/node/FETCH_BY_ID')(nid);

export const receiveNode = (node: Node): ReceiveAction => createAction('myhki/node/RECEIVE')(node);
