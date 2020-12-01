// @flow

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import type {Reducer} from '../types';
import type {
  MyHelsinkiListMap,
  ReceiveUsersListsAction,
  CreateNewListSuccessfulAction,
  UpdateListSuccessfulAction,
  DeleteListSuccessfulAction,
  AddItemToListSuccessfulAction,
} from './types';

const isFetchingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/myHelsinki/FETCH_USERS_LISTS': () => true,
    'myhki/myHelsinki/RECEIVE_USERS_LISTS': () => false,
    'myhki/myHelsinki/FETCH_USERS_LISTS_FAILED': () => false,
  },
  false,
);

const isUpdatingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/myHelsinki/UPDATE_LIST': () => true,
    'myhki/myHelsinki/UPDATE_LIST_SUCCESSFUL': () => false,
    'myhki/myHelsinki/UPDATE_LIST_FAILED': () => false,
  },
  false,
);

const isAddingItemReducer: Reducer<boolean> = handleActions(
  {
    'myhki/myHelsinki/ADD_ITEM_TO_LIST': () => true,
    'myhki/myHelsinki/ADD_ITEM_TO_LIST_SUCCESSFUL': () => false,
    'myhki/myHelsinki/ADD_ITEM_TO_LIST_FAILED': () => false,
  },
  false,
);

const isCreatingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/myHelsinki/CREATE_NEW_LIST': () => true,
    'myhki/myHelsinki/CREATE_NEW_LIST_SUCCESSFUL': () => false,
    'myhki/myHelsinki/CREATE_NEW_LIST_FAILED': () => false,
    'myhki/myHelsinki/DELETE_LIST_SUCCESSFUL': () => false,
    'myhki/myHelsinki/DELETE_LIST_FAILED': () => false,
  },
  false,
);

const isDeletingReducer: Reducer<boolean> = handleActions(
  {
    'myhki/myHelsinki/DELETE_LIST': () => true,
    'myhki/myHelsinki/DELETE_LIST_SUCCESSFUL': () => false,
    'myhki/myHelsinki/DELETE_LIST_FAILED': () => false,
  },
  false,
);

export const listReducer: Reducer<MyHelsinkiListMap> = handleActions(
  {
    ['myhki/myHelsinki/RECEIVE_USERS_LISTS']: (
      state,
      {payload: listMap}: ReceiveUsersListsAction,
    ) => listMap,
    ['myhki/myHelsinki/CREATE_NEW_LIST_SUCCESSFUL']: (
      state,
      {payload: list}: CreateNewListSuccessfulAction,
    ) => ({
      ...state,
      [list.nid]: list,
    }),
    ['myhki/myHelsinki/UPDATE_LIST_SUCCESSFUL']: (
      state,
      {payload: list}: UpdateListSuccessfulAction,
    ) => ({
      ...state,
      [list.nid]: list,
    }),
    ['myhki/myHelsinki/ADD_ITEM_TO_LIST_SUCCESSFUL']: (
      state,
      {payload: list}: AddItemToListSuccessfulAction,
    ) => ({
      ...state,
      [list.nid]: list,
    }),
    ['myhki/myHelsinki/DELETE_LIST_SUCCESSFUL']: (
      state,
      {payload: listId}: DeleteListSuccessfulAction,
    ) => {
      delete state[listId];
      return Object.assign({}, state);
    },
    ['myhki/auth/LOGOUT']: () => ({}),
  },
  {},
);

export default combineReducers({
  listsByNid: listReducer,
  isFetching: isFetchingReducer,
  isUpdating: isUpdatingReducer,
  isCreating: isCreatingReducer,
  isDeleting: isDeletingReducer,
  isAddingItem: isAddingItemReducer,
});
