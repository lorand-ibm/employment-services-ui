import React, {createRef}  from 'react';
import PropTypes from 'prop-types';
import {Row, Column} from 'react-foundation';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import concat from 'lodash/concat';
import classNames from 'classnames';
import {getFinnishMomentDate} from '../content/dateHelpers';

import {fetchSearchByFilters, fetchSearchAllByFilters} from '../search/actions';
import {eventPageSelector} from '../search/selectors';
import {activityPageSelector} from '../search/selectors';
import * as searchHelpers from '../search/helpers';
import i18n from '../root/i18n';
import {getFoundationBreakpoint} from '../helpers.js';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import SearchFilters from '../search/SearchFilters';
import SearchItem from '../search/SearchItem';
import {SearchResults} from '../search/SearchResults';
import Koro from '../koro/Koro';

interface ListingProps {
  categoryFilter: "activities" | "events",
  showDateFilters: boolean,
  content: any,
  filters: any,
  search: any,
  isFetching: boolean,
  location: any,
  fetchSearchByFilters: typeof fetchSearchByFilters,
  fetchSearchAllByFilters: typeof fetchSearchAllByFilters,
  t: any,
  params: any,
};

interface ListingState {
   filtersOpen: boolean; 
   items: any;
}


class Listing extends React.Component<ListingProps, ListingState> {

  static contextTypes = {
    router: PropTypes.object,
  }

  titleBtnRef = createRef<HTMLButtonElement>()
  
  constructor(props) {
    super(props);

    this.state = {
      filtersOpen: getFoundationBreakpoint() !== 'small',
      items: [],
    };
  }

  componentDidMount() {
    const {location, content, categoryFilter} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    filters.category = categoryFilter;
    this.props.fetchSearchAllByFilters(filters);
  }

  componentWillReceiveProps(nextProps: ListingProps) {
    const {location, params, search, categoryFilter} = this.props,
      {search: nextSearch, isFetching} = nextProps,
      filters = searchHelpers.getSearchFilters(location, params.language),
      nextFilters = searchHelpers.getSearchFilters(nextProps.location, nextProps.params.language);


    if (!isEqual(filters, nextFilters)) {
      // Fetch all search results if some other filter than only page has been changed
      if (
        !isEqual(filters.category, nextFilters.category) ||
        !isEqual(filters.dateFrom, nextFilters.dateFrom) ||
        !isEqual(filters.dateTo, nextFilters.dateTo) ||
        !isEqual(filters.keywords, nextFilters.keywords) ||
        !isEqual(filters.tags, nextFilters.tags) ||
        nextFilters.page - filters.page !== 1
      ) {
        this.props.fetchSearchAllByFilters({
          ...nextFilters,
          category: categoryFilter,
        });
      } else {
        this.props.fetchSearchByFilters({
          ...nextFilters,
          category: categoryFilter,
        });
      }
    }

    if (!isFetching && (!this.state.items.length || !isEqual(search, nextSearch))) {
      const nextItems = searchHelpers.getSearchItems(nextSearch),
        items =
          searchHelpers.filtersHaveChanged(filters, nextFilters) || nextFilters.page === 1
            ? nextItems
            : concat(this.state.items, nextItems);

      this.setState({
        items: items,
      });
    }
  }

  getBasePath = (location) => {
      return('/' + location.split("/").splice(2).join('/'));
  }

  onTitleClick = () => {
    this.setState({
      filtersOpen: !this.state.filtersOpen,
    });
  };

  onLoadMoreClick = () => {
    const {location} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    filters.page = filters.page + 1;

    this.updateFilters(filters);
  };

  updateFilters = (filters, language?: string) => {
    const basePath = this.getBasePath(this.props.location.pathname);
    this.context.router.replace(
      `/${language ? language : i18n.language}${basePath}${searchHelpers.getSearchQuery(filters)}`,
    );

    if (filters.page === 1 && this.titleBtnRef.current) {
      this.titleBtnRef.current.focus();
    }
  };

  render() {
    const {t, search, location, isFetching, showDateFilters} = this.props,
      {filtersOpen, items}: {filtersOpen: any, items: any} = this.state,
      filters = searchHelpers.getSearchFilters(location),
      tags = searchHelpers.getSearchTags(search, filters),
      filtersSummary = searchHelpers.getSearchFiltersSummary(filters),
      itemCount = get(search, 'items.length', 0);

    const page = isNaN(filters.page) ? 1 : filters.page;

    return (
      <div
        className={classNames('listing-page', {
          'listing-page--filters-open': filtersOpen,
        })}
      >
        <Row>
          <Column>
            <div className="listing-page__title">
              <h2>
                <button ref={this.titleBtnRef} id="listing-page__title-button" onClick={this.onTitleClick} aria-expanded={filtersOpen}>{t('searchTitle')}</button>
              </h2>
              <div className="listing-page__filters-summary">{filtersSummary}</div>
            </div>
          </Column>
        </Row>

        <div className="listing-page__filters">
          <div className="listing-page__filters-wrapper">
            <Row>
              <Column>
                <SearchFilters
                  updateFilters={this.updateFilters.bind(this)}
                  tags={tags}
                  dateFrom={filters.dateFrom && showDateFilters ? getFinnishMomentDate(filters.dateFrom) : null}
                  dateTo={filters.dateTo && showDateFilters ? getFinnishMomentDate(filters.dateTo) : null}
                  basePath={this.getBasePath(this.props.location.pathname)}
                  showDateFilters={showDateFilters}
                />
              </Column>
            </Row>
            <Koro color={'#ffffff'} flip />
          </div>
        </div>

        <Row>
          <Column small={12}>
              <span className="visually-hidden" aria-atomic="true" aria-live="polite" role="status">
                {itemCount === '1' ? t('countSingle') : t('countPlural', {count: itemCount})}
              </span>
              <div className="listing-page__items">
                <SearchResults isFetching={isFetching} items={items} page={page} t={t} disableAutoFocus={page===1} />
              </div>

            <DisplayThisSection when={!isFetching && itemCount >= 10}>
              <div className="listing-page__footer">
                <button className="listing-page__load-more" onClick={this.onLoadMoreClick}>
                  {t('loadMore')}
                </button>
              </div>
            </DisplayThisSection>
            <DisplayThisSection when={isFetching}>
              <div className="listing-page__footer listing-page__footer--fetching">
                <span className="listing-page__load-indicator">
                  {t('loading')} <i className="fa fa-circle-o-notch fa-spin fa-fw" />
                </span>
              </div>
            </DisplayThisSection>
          </Column>
        </Row>
      </div>
    );
  }
}

const getListingClass = (translation, pageSelector) => flowRight(
  withRouter,
  connect(
    pageSelector,
    {fetchSearchByFilters, fetchSearchAllByFilters},
  ),
  translate(['common', 'search', translation]),
)(Listing) as any;

export const ListingWithActivityPageSelector = getListingClass('activity', activityPageSelector);
export const ListingWithEventPageSelector = getListingClass('event', eventPageSelector);