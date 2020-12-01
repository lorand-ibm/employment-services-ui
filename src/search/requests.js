// @flow

import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';

import type {Filters} from './types';

export const fetchByFiltersRequest = (filters: Filters): Generator<> => {
  const searchFilters = {};

  forEach(filters, (filter, key) => {
    if (!isEmpty(filter) || isNumber(filter)) {
      searchFilters[key] = filter;
    }
  });

  return callApi(
    new Request(
      createUrl(`search`, {
        ...searchFilters,
      }),
    ),
  );
};
