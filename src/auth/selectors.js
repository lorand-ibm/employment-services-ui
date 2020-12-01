// @flow

import type {Selector} from '../types';

export const getIsAuthenticated: Selector<boolean, void> = state => Boolean(getUser(state));

export const getUser: Selector<mixed, void> = state => state.auth.user;

export const getIsUpdating: Selector<boolean, void> = state => state.auth.isUpdating;
