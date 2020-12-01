// @flow

import type {Selector} from '../types';
import type {NodeId} from './types';

export const getNodeById: Selector<Node, {nid: NodeId}> = (state, {nid}): Node =>
  state.node.byId[nid];
