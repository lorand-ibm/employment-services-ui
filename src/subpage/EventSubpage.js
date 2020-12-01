import React, {Component} from 'react';
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

import type {Search, Filters} from '../search/types';
import {fetchSearchByFilters, fetchSearchAllByFilters} from '../search/actions';
import {eventPageSelector} from '../search/selectors';
import * as searchHelpers from '../search/helpers';
import i18n from '../root/i18n';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LiftUpCollection from '../liftUps/LiftUpCollection';
import LiftUpSimple from '../liftUps/LiftUpSimple';
import SearchFilters from '../search/SearchFilters';
import SearchItem from '../search/SearchItem';
import Koro from '../koro/Koro';
import GridCardList from '../gridCardList/GridCardList';

import {Colors} from '../constants';

import {
  getContentPathAlias,
  getContentHeroCarouselSlides,
  getContentLiftUpCollectionItems,
  getContentSimpleLiftUpProps,
  getContentBreadcrumbs,
  getGridCardListProps,
} from '../content/helpers';

export type Props = {
  content: Object,
  filters: Filters,
  search: Search,
  isFetching: boolean,
  location: Object,
  fetchSearchByFilters: typeof fetchSearchByFilters,
  fetchSearchAllByFilters: typeof fetchSearchAllByFilters,
  t: Function,
  params: Object,
};

class EventSubpage extends Component {
  props: Props;

  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      filtersOpen: true,
      items: [],
    };
  }

  componentDidMount() {
    const {location, content} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    if (global.IS_CLIENT) {
      console.log('Event subpage: %o', content);
    }
    filters.category = 'events';
    this.props.fetchSearchAllByFilters(filters);
  }

  componentWillReceiveProps(nextProps: Props) {
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
        this.props.fetchSearchAllByFilters({
          ...nextFilters,
          category: 'events',
        });
      } else {
        this.props.fetchSearchByFilters({
          ...nextFilters,
          category: 'events',
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

  updateFilters = (filters, language) => {
    const basePath = getContentPathAlias(this.props.content);
    this.context.router.replace(
      `/${language ? language : i18n.language}${basePath}${searchHelpers.getSearchQuery(filters)}`,
    );
  };

  render() {
    const {t, content, search, location, isFetching} = this.props,
      {filtersOpen, items} = this.state,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      liftUpCollectionItems = getContentLiftUpCollectionItems(content),
      simpleLiftUpProps = getContentSimpleLiftUpProps(content),
      filters = searchHelpers.getSearchFilters(location),
      tags = searchHelpers.getSearchTags(search, filters),
      filtersSummary = searchHelpers.getSearchFiltersSummary(filters),
      itemCount = get(search, 'items.length', 0),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div
        className={classNames('subpage subpage--event events-page', {
          'events-page--filters-open': filtersOpen,
        })}
      >
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />

            <DisplayThisSection when={!!liftUpCollectionItems.length}>
              <LiftUpCollection items={liftUpCollectionItems} />
            </DisplayThisSection>

            <DisplayThisSection when={gridCardListProps}>
              <div className="grid-card-list">
                <Row>
                  <Column>
                    <GridCardList {...gridCardListProps} />
                  </Column>
                </Row>
              </div>
            </DisplayThisSection>

            <div className="events-page__title">
              <h1>
                <a onClick={this.onTitleClick}>{t('searchTitle')}</a>
              </h1>
              <div className="events-page__filters-summary">{filtersSummary}</div>
            </div>
          </Column>
        </Row>

        <div className="events-page__filters">
          <div className="events-page__filters-wrapper">
            <Row>
              <Column>
                <SearchFilters
                  tags={tags}
                  dateFrom={filters.dateFrom ? getFinnishMomentDate(filters.dateFrom) : null}
                  dateTo={filters.dateTo ? getFinnishMomentDate(filters.dateTo) : null}
                  basePath={getContentPathAlias(content)}
                  showDateFilters
                  updateFilters={this.updateFilters.bind(this)}
                />
              </Column>
            </Row>
            <Koro color={'#ffffff'} flip />
          </div>
        </div>

        <Row>
          <Column small={12}>
            <DisplayThisSection when={items.length}>
              <div className="events-page__items">
                {items.map((item, i) => (
                  <SearchItem key={i} {...item} />
                ))}
              </div>
            </DisplayThisSection>

            <DisplayThisSection when={!isFetching && itemCount >= 10}>
              <div className="events-page__footer">
                <a className="events-page__load-more" onClick={this.onLoadMoreClick}>
                  {t('loadMore')}
                </a>
              </div>
            </DisplayThisSection>
            <DisplayThisSection when={isFetching}>
              <div className="events-page__footer">
                <span className="events-page__load-indicator">
                  {t('loading')} <i className="fa fa-circle-o-notch fa-spin fa-fw" />
                </span>
              </div>
            </DisplayThisSection>

            <DisplayThisSection when={simpleLiftUpProps}>
              <LiftUpSimple colorScheme={{background: Colors.HEL_COPPER, text: Colors.WHITE}} {...simpleLiftUpProps} flip />
            </DisplayThisSection>
          </Column>
        </Row>
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  connect(
    eventPageSelector,
    {fetchSearchByFilters, fetchSearchAllByFilters},
  ),
  translate(['common', 'event']),
)(EventSubpage);
