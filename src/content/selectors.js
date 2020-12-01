// @flow

import type {Selector} from '../types';
import type {ContentPath, Content} from './types';
import type {Props as ContentPageProps} from './ContentPage';

export const getContentByPath: Selector<Content, {path: ContentPath}> = (state, {path}): Content =>
  state.content.byPath[path];

export const getIsFetching: Selector<boolean, void> = state => state.content.isFetching;

export const getPageVisited: Selector<number, void> = state => state.content.pageVisited;

export const contentPageSelector: Selector<
  {content: Content, isFetching: boolean},
  ContentPageProps,
> = (state, {path, location: {pathname}}) => {
  return {
    content: getContentByPath(state, {path: path || pathname}),
    isFetching: getIsFetching(state),
    pageVisited: getPageVisited(state),
  };
};
