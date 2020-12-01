import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-foundation';
import get from 'lodash/get';
import flowRight from 'lodash/flowRight';
import isEqual from 'lodash/isEqual';
import concat from 'lodash/concat';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import i18n from '../root/i18n';
import {Helmet} from 'react-helmet';
import type {Search, Filters} from './types';
import {fetchSearchByFilters, fetchSearchAllByFilters} from './actions';
import {searchPageSelector} from './selectors';
import * as searchHelpers from './helpers';
import * as helpers from '../helpers';
import {getFinnishMomentDate} from '../content/dateHelpers';

import SearchFilters from './SearchFilters';
import {SearchResults} from './SearchResults';
import Koro from '../koro/Koro';

export type SearchPageProps = {
  filters: Filters,
  search: Search,
  isFetching: boolean,
  location: any,
  fetchSearchByFilters: typeof fetchSearchByFilters,
  fetchSearchAllByFilters: typeof fetchSearchAllByFilters,
  t: any,
  params: any,
};

type SearchPageState = {
  filtersOpen: boolean,
  items: Array<Object>,
  searchInput: string,
};

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  props: SearchPageProps;

  state: SearchPageState = {
    filtersOpen: helpers.getFoundationBreakpoint() !== 'small',
    items: [],
    searchInput: '',
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    if (global.IS_CLIENT) {
      i18n.on('languageChanged', this.onLanguageChange);
    }
  }

  componentDidMount() {
    const {location} = this.props,
      filters = searchHelpers.getSearchFilters(location);
    this.props.fetchSearchAllByFilters(filters);

    this.setState({searchInput: filters.keywords});

    if (location.search.includes('advanced')) {
      this.setState({filtersOpen: true});
    }
  }

  componentDidUpdate(prevProps) {
    const propsTags = this.props.location.query.tags;
    const prevPropsTags = prevProps.location.query.tags;
    //on tags update, scroll to top
    if (
      global.IS_CLIENT && (
        //tags changed
        (propsTags && propsTags !== prevPropsTags) ||
        //tags exsisted and were deleted
        (!propsTags && prevPropsTags)
      )
    ) {
      window.scrollTo(0, 0);
      // Some pages need body element to be scrolled top as well as window
      document.body.scrollTop = 0;
    }

    // Update search input, if location has changed
    if (this.props.location !== prevProps.location) {
      const {location} = this.props;
      const filters = searchHelpers.getSearchFilters(location);
      this.setState({searchInput: filters.keywords});
    }
  }

  onLanguageChange = (language) => {
    this.updateFilters(searchHelpers.getSearchEmptyFilters(), language);
  };

  getPageTitle(): string {
    const {t} = this.props;
    return helpers.setPageTitle(t('title'));
  }

  onSortClick = (sort?) => {
    const {location} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    filters.sort = sort ? sort : '';
    filters.page = 1;

    this.updateFilters(filters);
  };

  componentWillReceiveProps(nextProps: SearchPageProps) {
    const {location, params, search} = this.props,
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
        this.props.fetchSearchAllByFilters(nextFilters);
        this.setState({items: []});
      } else {
        this.props.fetchSearchByFilters(nextFilters);
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

  onSearchClick = () => {
    this.updateSearchQuery();
  };

  onSearchInputChange = (e) => {
    this.setState({searchInput: e.target.value});
  };

  onSearchInputClear = () => {
    this.setState({searchInput: ''}, () =>
      this.updateFilters(searchHelpers.getSearchEmptyFilters()),
    );
  };

  onFilterToggle = () => {
    this.setState({ filtersOpen: !this.state.filtersOpen });
  };

  onLoadMoreClick = () => {
    const {location} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    filters.page = filters.page + 1;

    this.updateFilters(filters);
  };

  updateSearchQuery = () => {
    const {location} = this.props,
      filters = searchHelpers.getSearchFilters(location);
    filters.keywords = this.state.searchInput;
    this.updateFilters(filters);
  };

  updateFilters = (filters, language?) => {
    this.context.router.replace(
      `/${language ? language : i18n.language}/search${searchHelpers.getSearchQuery(filters)}`,
    );
  };

  preventReloadOnSubmit = (e) => {
    e.preventDefault();
    return false
  }

  render() {
    const {t, search, location, isFetching} = this.props,
      {filtersOpen, items} = this.state,
      count = searchHelpers.getSearchCount(search),
      filters = searchHelpers.getSearchFilters(location),
      categories = searchHelpers.getSearchCategories(search, filters),
      tags = searchHelpers.getSearchTags(search, filters),
      filtersSummary = searchHelpers.getSearchFiltersSummary(filters, categories),
      itemCount = get(search, 'items.length', 0),
      currentCategory = this.props.location.query.category;

    const sortLatestSelected = filters.sort === 'latest';

    const page = isNaN(filters.page) ? 1 : filters.page;

    const searchResultSummary = (
      <>
        <div
          className="search-page__count"
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          {count === '1' ? t('countSingle') : t('countPlural', {count: count})}
        </div>
        <div>
          <button
            className={
              !sortLatestSelected
                ? 'search-page__sort-link--selected'
                : 'search-page__sort-link'
            }
            aria-pressed={!sortLatestSelected}
            onClick={() => this.onSortClick()}
          >
            {i18n.t('search:sortAll')}
          </button>
          <button
            className={
              sortLatestSelected
                ? 'search-page__sort-link--selected'
                : 'search-page__sort-link'
            }
            aria-pressed={sortLatestSelected}
            onClick={() => this.onSortClick('latest')}
          >
            {i18n.t('search:sortLatest')}
          </button>
        </div>
      </>
    );
    const loading = (<div>{i18n.t('common:loading')}</div>);

    return (
      <Row>
        <div className="search-page">
          <form className="search-form" role="search" onSubmit={this.preventReloadOnSubmit}>
            <Helmet>
              <title>{this.getPageTitle()}</title>
              <meta property="og:title" content={this.getPageTitle()} />
            </Helmet>
            <div
              className={
                'search-page__input-wrapper' +
                (filtersOpen ? ' search-page__input-wrapper--background-color' : '')
              }
            >
              <div className={'search-page__heading-wrapper'}>
                <h1 className={'search-page__heading'}>
                  {i18n.t('common:search')}
                </h1>
              </div>
              <div className="search-page__content-wrapper">
                <div className="search-page__search">
                  <label className="search-page__label" htmlFor="search-input">
                    {i18n.t('search:searchInputLabel')}
                  </label>
                  <input
                    className="search-page__search-input"
                    id="search-input"
                    value={this.state.searchInput}
                    onChange={this.onSearchInputChange}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        this.onSearchClick();
                      }
                    }}
                  />
                  <div className="search-page__search-buttons">
                    <button
                      className="search-page__search-button button search-page__search-button--primary"
                      type="submit"
                      onClick={this.onSearchClick}
                    >
                      {i18n.t('common:search')}
                    </button>
                    <button
                      className="search-page__search-button button"
                      type="reset"
                      onClick={this.onSearchInputClear}
                    >
                      {i18n.t('common:clear')}
                    </button>
                  </div>
                </div>
                <button
                  className="search-page__toggle"
                  type="submit"
                  onClick={this.onFilterToggle}
                  aria-expanded={this.state.filtersOpen}
                >
                  <div>
                    <span className="search-page__toggle-title">
                      {i18n.t('search:filterSearchResults')}
                    </span>
                    <span
                      className={
                        'search-page__toggle-button' +
                        (filtersOpen ? ' search-page__toggle-button-flip' : '')
                      }
                    />
                  </div>
                </button>
                {filtersOpen && (
                  <div className="search-page__filters">
                    <SearchFilters
                      categories={categories}
                      tags={tags}
                      dateFrom={filters.dateFrom ? getFinnishMomentDate(filters.dateFrom) : null}
                      dateTo={filters.dateTo ? getFinnishMomentDate(filters.dateTo) : null}
                      basePath="/search"
                      updateFilters={this.updateFilters.bind(this)}
                    />
                  </div>
                )}
              </div>
              {filtersOpen && <Koro color={'#ffffff'} flip />}
            </div>
            <div className="search-page__content-wrapper">
              <h2 className="search-page__header">
                {isFetching ? loading : searchResultSummary}
              </h2>
              <div className="search-page__items">
                <SearchResults isFetching={isFetching} items={items} page={page} t={t} />
              </div>
              <div className="search-page__footer">
                {searchHelpers.showActionLinks(currentCategory) && (
                  <div className="search-page__suggestPlace">
                    {t('cantFindPlace')}
                    <br />
                    <a href="https://places.myhelsinki.fi" target="_blank" rel="noopener noreferrer">
                      {t('suggestPlaceToUs')}
                    </a>
                  </div>
                )}
                {!isFetching && itemCount >= 10 && (
                  <button className="search-page__load-more" onClick={this.onLoadMoreClick}>
                    {t('loadMore')}
                  </button>
                )}
                {isFetching && (
                  <span className="search-page__load-indicator">
                    {t('loading')} <i className="fa fa-circle-o-notch fa-spin fa-fw" />
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </Row>
    );
  }
}

export default flowRight(
  connect(
    searchPageSelector,
    {fetchSearchByFilters, fetchSearchAllByFilters},
  ),
  withRouter,
  translate(['common', 'search']),
)(SearchPage);
