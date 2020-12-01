// @flow

import {createAction} from 'redux-actions';

import type {
  MyHelsinkiList,
  MyHelsinkiListMap,
  FetchUsersListsAction,
  ReceiveUsersListsAction,
  FetchUsersListsFailedAction,
  CreateNewListAction,
  CreateNewListSuccessfulAction,
  CreateNewListFailedAction,
  UpdateListAction,
  UpdateListSuccessfulAction,
  UpdateListFailedAction,
  DeleteListAction,
  DeleteListSuccessfulAction,
  DeleteListFailedAction,
  AddItemToListAction,
  AddItemToListSuccessfulAction,
  AddItemToListFailedAction,
} from './types';
import type {UserId} from '../auth/types';
import type {Content, ContentId} from '../content/types';

export const fetchUsersLists = (userId: UserId): FetchUsersListsAction =>
  createAction('myhki/myHelsinki/FETCH_USERS_LISTS')(userId);

export const receiveUsersLists = (data: MyHelsinkiListMap): ReceiveUsersListsAction =>
  createAction('myhki/myHelsinki/RECEIVE_USERS_LISTS')(data);

export const fetchUsersListsFailed = (userId: UserId): FetchUsersListsFailedAction =>
  createAction('myhki/myHelsinki/FETCH_USERS_LISTS_FAILED')(userId);

export const createNewList = (data: MyHelsinkiList): CreateNewListAction =>
  createAction('myhki/myHelsinki/CREATE_NEW_LIST')(data);

export const createNewListSuccessful = (data: Content): CreateNewListSuccessfulAction =>
  createAction('myhki/myHelsinki/CREATE_NEW_LIST_SUCCESSFUL')(data);

export const createNewListFailed = (): CreateNewListFailedAction =>
  createAction('myhki/myHelsinki/CREATE_NEW_LIST_FAILED')();

export const updateList = (data: MyHelsinkiList): UpdateListAction =>
  createAction('myhki/myHelsinki/UPDATE_LIST')(data);

export const updateListSuccessful = (data: Content): UpdateListSuccessfulAction =>
  createAction('myhki/myHelsinki/UPDATE_LIST_SUCCESSFUL')(data);

export const updateListFailed = (): UpdateListFailedAction =>
  createAction('myhki/myHelsinki/UPDATE_LIST_FAILED')();

export const deleteList = (data: ContentId): DeleteListAction =>
  createAction('myhki/myHelsinki/DELETE_LIST')(data);

export const deleteListSuccessful = (contentId: ContentId): DeleteListSuccessfulAction =>
  createAction('myhki/myHelsinki/DELETE_LIST_SUCCESSFUL')(contentId);

export const deleteListFailed = (): DeleteListFailedAction =>
  createAction('myhki/myHelsinki/DELETE_LIST_FAILED')();

export const addItemToList = (data: {
  list: MyHelsinkiList,
  itemId: ContentId,
}): AddItemToListAction => createAction('myhki/myHelsinki/ADD_ITEM_TO_LIST')(data);

export const addItemToListSuccessful = (data: Content): AddItemToListSuccessfulAction =>
  createAction('myhki/myHelsinki/ADD_ITEM_TO_LIST_SUCCESSFUL')(data);

export const addItemToListFailed = (): AddItemToListFailedAction =>
  createAction('myhki/myHelsinki/ADD_ITEM_TO_LIST_FAILED')();
