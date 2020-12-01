// @flow

import type {Action} from '../types';
import type {Content, ContentId} from '../content/types';

export type MyHelsinkiListItem = {
  nid: ContentId,
  title: string,
  subtitle: string,
};

export type MyHelsinkiList = {
  nid: ContentId,
  title: string,
  privacy: boolean,
  description?: string,
  heart_icon?: number,
  field_heart_icon?: number,
  items: [MyHelsinkiListItem],
};

export type MyHelsinkiState = {
  listsByNid: MyHelsinkiListMap,
  isFetching: boolean,
  isUpdating: boolean,
  isCreating: boolean,
};

export type MyHelsinkiListMap = {[key: number]: Content};

export type FetchUsersListsAction = Action<'myhki/myHelsinki/FETCH_USERS_LISTS', number>;
export type FetchUsersListsFailedAction = Action<
  'myhki/myHelsinki/FETCH_USERS_LISTS_FAILED',
  number,
>;
export type ReceiveUsersListsAction = Action<
  'myhki/myHelsinki/RECEIVE_USERS_LISTS',
  MyHelsinkiListMap,
>;
export type CreateNewListAction = Action<'myhki/myHelsinki/CREATE_NEW_LIST', MyHelsinkiList>;
export type CreateNewListSuccessfulAction = Action<
  'myhki/myHelsinki/CREATE_NEW_LIST_SUCCESSFUL',
  Content,
>;
export type CreateNewListFailedAction = Action<'myhki/myHelsinki/CREATE_NEW_LIST_FAILED', void>;
export type UpdateListAction = Action<'myhki/myHelsinki/UPDATE_LIST', MyHelsinkiList>;
export type UpdateListSuccessfulAction = Action<'myhki/myHelsinki/UPDATE_LIST_SUCCESSFUL', Content>;
export type UpdateListFailedAction = Action<'myhki/myHelsinki/UPDATE_LIST_FAILED', void>;
export type DeleteListAction = Action<'myhki/myHelsinki/DELETE_LIST', ContentId>;
export type DeleteListSuccessfulAction = Action<
  'myhki/myHelsinki/DELETE_LIST_SUCCESSFUL',
  ContentId,
>;
export type DeleteListFailedAction = Action<'myhki/myHelsinki/DELETE_LIST_FAILED', void>;
export type AddItemToListAction = Action<'myhki/myHelsinki/ADD_ITEM_TO_LIST', Object>;
export type AddItemToListSuccessfulAction = Action<
  'myhki/myHelsinki/ADD_ITEM_TO_LIST_SUCCESSFUL',
  Content,
>;
export type AddItemToListFailedAction = Action<'myhki/myHelsinki/ADD_ITEM_TO_LIST_FAILED', void>;
