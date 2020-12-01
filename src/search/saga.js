// @flow
import base64 from 'base-64';
import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {receiveSearch, receiveAllSearch} from './actions';
import {fetchByFiltersRequest} from './requests';
import {sortObjectByKeys} from '../helpers';

import type {FetchByFiltersAction} from './types';

function* fetchByFiltersSaga({payload: filters}: FetchByFiltersAction): Generator<> {
  try {
    const {
        response: {status: statusCode},
        bodyAsJson,
      } = yield call(fetchByFiltersRequest, filters),
      key = base64.encode(encodeURIComponent(JSON.stringify(sortObjectByKeys(filters))));
    switch (statusCode) {
      case 200:
        yield put(receiveSearch({[key]: bodyAsJson}));
        break;
      case 404: // TODO: Remove this when 404 problem is fixed on API side.
        yield put(
          receiveSearch({
            [key]: {
              count: 0,
              items: [],
              tags: [],
              available_categories: [],
            },
          }),
        );
        break;
    }
  } catch (error) {
    console.error('Failed to fetch search (%o) with error "%s"', filters, error);
  }
}

function* fetchAllByFiltersSaga({payload: filters}: FetchByFiltersAction): Generator<> {
  try {
    const maxPage = filters.page;
    const key = base64.encode(encodeURIComponent(JSON.stringify(sortObjectByKeys(filters))));
    const filtersMut = {...filters, page: 1};
    let {
      response: {status: statusCode},
      bodyAsJson,
    } = yield call(fetchByFiltersRequest, filtersMut);

    for (let i = 2; i <= Number(maxPage); i++) {
      filtersMut.page = i;
      const response = yield call(fetchByFiltersRequest, filtersMut);
      bodyAsJson.items = [...bodyAsJson.items, ...response.bodyAsJson.items];
      statusCode = response.response.status;
      if (statusCode !== 200) {
        break;
      }
    }

    switch (statusCode) {
      case 200:
        yield put(receiveAllSearch({[key]: bodyAsJson}));
        break;
      case 404: // TODO: Remove this when 404 problem is fixed on API side.
        yield put(
          receiveAllSearch({
            [key]: {
              count: 0,
              items: [],
              tags: [],
              available_categories: [],
            },
          }),
        );
        break;
    }
  } catch (error) {
    console.error('Failed to fetch search (%o) with error "%s"', filters, error);
  }
}

export default function*(): Generator<> {
  yield [
    fork(function*(): Generator<> {
      yield takeLatest('myhki/search/FETCH_BY_FILTERS', fetchByFiltersSaga);
      yield takeLatest('myhki/search/FETCH_ALL_BY_FILTERS', fetchAllByFiltersSaga);
    }),
  ];
}
