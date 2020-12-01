// @flow

import {createAction} from 'redux-actions';

import type {ViewName, ViewMap, FetchByNameAction, ReceiveAction} from './types';
import type {BypassCache} from '../types';

export const fetchViewByName = (name: ViewName, lang: String, bypassCache: BypassCache): FetchByNameAction =>
  createAction('myhki/view/FETCH_BY_NAME')({name, lang, bypassCache});

export const receiveView = (map: ViewMap): ReceiveAction => createAction('myhki/view/RECEIVE')(map);
