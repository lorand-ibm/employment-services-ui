import React from 'react';
import SearchItem, {SkeletonSearchItem} from './SearchItem';

interface SearchResultsProps {
  isFetching: boolean;
  page: number;
  items: any;
  t: any;
  disableAutoFocus?: boolean;
}

export const SearchResults = ({isFetching, page, items, t, disableAutoFocus}: SearchResultsProps) => {
  if (isFetching) {
    /*
      When is fetching and there are no items, new content is being loaded.
      Skeleton items should be shown.

      When is fetching and there are items, new content is loading in addition to
      existing items. Old items should we shown.
    */
    if (items.length !== 0) {
      return items.map((item, i) => {
        return <SearchItem key={i} {...item} />;
      });
    } else {
      return Array(10 * page)
        .fill(0)
        .map((n,i) => <SkeletonSearchItem key={i}/>);
    }
  } else {
    if (items.length === 0) {
      return (
        <div className="search-page__no-results">
          <h3 className="search-page__no-results-title">{t('search:noResults')}</h3>
          <p className="search-page__no-results-info">{t('search:noResultsInfo')}</p>
        </div>
      );
    }

    const focusItem = items.length < 10 ? 0 : items.length - 10;
    return items.map((item, i) => {
      return <SearchItem key={i} focus={!disableAutoFocus && i === focusItem} {...item} />;
    });
  }
};
