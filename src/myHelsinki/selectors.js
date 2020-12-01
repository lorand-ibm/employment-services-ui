// @flow

import type {Selector} from '../types';
import type {MyHelsinkiListMap} from './types';

export const getUsersLists: Selector<MyHelsinkiListMap, void> = state =>
  state.myHelsinki.listsByNid;

export const getIsFetching: Selector<boolean, void> = state => state.myHelsinki.isFetching;

export const getIsUpdating: Selector<boolean, void> = state => state.myHelsinki.isUpdating;

export const getIsDeleting: Selector<boolean, void> = state => state.myHelsinki.isDeleting;

export const getIsCreating: Selector<boolean, void> = state => state.myHelsinki.isCreating;
