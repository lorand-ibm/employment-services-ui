// @flow

import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import {browserHistory} from 'react-router';
import {fetchByPathRequest} from '../content/requests';

import i18n from '../root/i18n';
import {
  receiveUsersLists,
  fetchUsersListsFailed,
  createNewListSuccessful,
  createNewListFailed,
  updateListSuccessful,
  updateListFailed,
  deleteListSuccessful,
  deleteListFailed,
  addItemToListSuccessful,
  addItemToListFailed,
} from './actions';
import {fetchUsersLists, createNewList, updateList, deleteList} from './requests';
import {pushNotification} from '../notification/actions';
import * as contentHelpers from '../content/helpers';
import {receiveContent} from '../content/actions';

function* fetchUsersListsSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(fetchUsersLists, payload);

    switch (statusCode) {
      case 200:
        const lists = {};

        forEach(bodyAsJson, list => {
          lists[list.nid] = list;
        });

        yield put(receiveUsersLists(lists));
        break;
      default:
        yield put(fetchUsersListsFailed(payload));
    }
  } catch (error) {
    console.error('Failed to fetch users lists with error "%s"', error);
  }
}

function* createNewListSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(createNewList, payload);

    switch (statusCode) {
      case 200:
        yield put(createNewListSuccessful(bodyAsJson));
        yield put(pushNotification(i18n.t('common:saveSuccessText')));
        yield browserHistory.push(contentHelpers.getContentPath(bodyAsJson, i18n.language));
        break;
      default:
        yield put(createNewListFailed());
        yield put(pushNotification(i18n.t('common:saveFailedText')));
    }
  } catch (error) {
    yield put(pushNotification(i18n.t('common:saveFailedText')));
    console.error('Failed to create a new list with error "%s"', error);
  }
}

function* updateListSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(updateList, payload);

    switch (statusCode) {
      case 200:
        // Response is always in English so fetch list in selected language
        const path = contentHelpers.getContentPath(bodyAsJson, i18n.language);
        const {bodyAsJson: bodyAsJsonFetched} = yield call(fetchByPathRequest, path);
        yield put(receiveContent({[path]: bodyAsJsonFetched}));
        yield put(updateListSuccessful(bodyAsJsonFetched));
        yield put(pushNotification(i18n.t('common:saveSuccessText')));
        yield browserHistory.replace(contentHelpers.getContentPath(bodyAsJsonFetched));
        break;
      default:
        yield put(pushNotification(i18n.t('common:saveFailedText')));
        yield put(updateListFailed());
    }
  } catch (error) {
    console.error('Failed to update a list with error "%s"', error);
  }
}

function* deleteListSaga({payload}): Generator<> {
  try {
    const {
      response: {status: statusCode},
    } = yield call(deleteList, payload);

    switch (statusCode) {
      case 200:
        yield put(deleteListSuccessful(payload));
        yield put(pushNotification(i18n.t('common:deleteSuccessText')));
        yield browserHistory.push('/');
        break;

      default:
        yield put(pushNotification(i18n.t('common:deleteFailedText')));
        yield put(deleteListFailed());
    }
  } catch (error) {
    yield put(pushNotification(i18n.t('common:deleteFailedText')));
    console.error('Failed to delete a list with error "%s"', error);
  }
}

function* addItemToListSaga({payload}): Generator<> {
  try {
    const list = payload.list,
      itemId = payload.itemId,
      index = findIndex(list.items, o => {
        return Number(o.nid) === Number(itemId);
      });

    if (index < 0) {
      list.items.push({
        nid: itemId,
      });

      const {
        response: {status: statusCode},
        bodyAsJson,
      } = yield call(updateList, list);

      switch (statusCode) {
        case 200:
          // Response is always in English so fetch list in selected language
          const path = contentHelpers.getContentPath(bodyAsJson, i18n.language);
          const {bodyAsJson: bodyAsJsonFetched} = yield call(fetchByPathRequest, path);
          yield put(addItemToListSuccessful(bodyAsJsonFetched));
          yield put(pushNotification(i18n.t('common:saveSuccessText')));
          break;
        default:
          yield put(addItemToListFailed());
          yield put(pushNotification(i18n.t('common:saveFailedText')));
      }
    } else {
      yield put(addItemToListFailed());
      yield put(pushNotification(i18n.t('common:saveAlreadyAddedText')));
    }
  } catch (error) {
    yield put(pushNotification(i18n.t('common:saveFailedText')));
    console.error('Failed to add item ta a list with error "%s"', error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*() {
      yield takeLatest('myhki/myHelsinki/FETCH_USERS_LISTS', fetchUsersListsSaga);
    }),
    fork(function*() {
      yield takeLatest('myhki/myHelsinki/CREATE_NEW_LIST', createNewListSaga);
    }),
    fork(function*() {
      yield takeLatest('myhki/myHelsinki/UPDATE_LIST', updateListSaga);
    }),
    fork(function*() {
      yield takeLatest('myhki/myHelsinki/DELETE_LIST', deleteListSaga);
    }),
    fork(function*() {
      yield takeLatest('myhki/myHelsinki/ADD_ITEM_TO_LIST', addItemToListSaga);
    }),
  ];
}
