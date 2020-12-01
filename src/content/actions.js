// @flow

import {createAction} from 'redux-actions';

import type {
  ContentPath,
  ContentMap,
  FetchByPathAction,
  ReceiveAction,
  NotFoundAction,
  IncreasePageVisitedAction,
  ClearPageVisitedAction,
} from './types';

import type {BypassCache} from '../types';

export const fetchContentByPath = (path: ContentPath, bypassCache: BypassCache): FetchByPathAction =>
  createAction('myhki/content/FETCH_BY_PATH')({path, bypassCache});

export const receiveContent = (map: ContentMap): ReceiveAction =>
  createAction('myhki/content/RECEIVE')(map);

export const notFound = (map: ContentMap): NotFoundAction =>
  createAction('myhki/content/NOT_FOUND')(map);

export const increasePageVisited = (): IncreasePageVisitedAction =>
  createAction('myhki/content/INCREASE_PAGE_VISITED')();

export const clearPageVisited = (): ClearPageVisitedAction =>
  createAction('myhki/content/CLEAR_PAGE_VISITED')();
