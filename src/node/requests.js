// @flow

import createUrl from '../api/createUrl';
import callApi from '../api/callApi';

import type {NodeId} from './types';

export const fetchByIdRequest = (nid: NodeId): Generator<> =>
  callApi(new Request(createUrl(`node/${nid}`, {_format: 'json'})));
