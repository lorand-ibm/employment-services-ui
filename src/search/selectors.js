// @flow
import base64 from 'base-64';
import type {Selector} from '../types';
import type {Filters, Search} from './types';
import {getHomepageSearchFilters, getSearchFilters} from './helpers';
import {sortObjectByKeys} from '../helpers';
import type {Props as HomepageProps} from '../homepage/Homepage';
import type {Props as SearchPageProps} from './SearchPage';
import type {Props as EventPageProps} from '../subpage/EventSubpage';
import type {Props as ActivityPageProps} from '../subpage/ActivitySubpage';

export const getSearchByFilters: Selector<Search, {filters: Filters}> = (
  state,
  {filters},
): Search => {
  const index = base64.encode(encodeURIComponent(JSON.stringify(sortObjectByKeys(filters)))); 
  return state.search.byFilters[index];
};

export const getIsFetching: Selector<boolean, void> = state => state.search.isFetching;

export const searchPageSelector: Selector<
  {search: Search, isFetching: boolean},
  SearchPageProps,
> = (state, {location}) => {
  return {
    search: getSearchByFilters(state, {filters: getSearchFilters(location)}),
    isFetching: getIsFetching(state),
  };
};

export const homePageSelector: Selector<{search: Search, isFetching: boolean}, HomepageProps> = (
  state,
  {content},
) => {
  const filters = getHomepageSearchFilters(content);

  return {
    search: getSearchByFilters(state, {filters: filters}),
    isFetching: getIsFetching(state),
  };
};

export const eventPageSelector: Selector<{search: Search, isFetching: boolean}, EventPageProps> = (
  state,
  {location},
) => {
  const filters = getSearchFilters(location);
  filters.category = 'events';

  return {
    search: getSearchByFilters(state, {filters: filters}),
    isFetching: getIsFetching(state),
  };
};

export const activityPageSelector: Selector<
  {search: Search, isFetching: boolean},
  ActivityPageProps,
> = (state, {location}) => {
  const filters = getSearchFilters(location);
  filters.category = 'activities';

  return {
    search: getSearchByFilters(state, {filters: filters}),
    isFetching: getIsFetching(state),
  };
};
