// @flow

import {createAction} from 'redux-actions';

import type {MenuName, MenuMap, FetchByNameAction, ReceiveAction} from './types';

import type {BypassCache} from '../types';

export const fetchMenuByName = (name: MenuName, lang: String, bypassCache: BypassCache): FetchByNameAction =>
  createAction('myhki/menu/FETCH_BY_NAME')({name, lang, bypassCache});

export const receiveMenu = (map: MenuMap): ReceiveAction => createAction('myhki/menu/RECEIVE')(map);
