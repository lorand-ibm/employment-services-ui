// @flow

import type {Action} from '../types';

export type NodeState = {
  byId: NodeMap,
};

export type NodeId = string;
export type Node = Object;
export type NodeMap = {[key: NodeId]: Node};

export type FetchByIdAction = Action<'myhki/node/FETCH_BY_ID', NodeId>;
export type ReceiveAction = Action<'myhki/node/RECEIVE', Node>;
