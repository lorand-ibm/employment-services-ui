// TODO:
// Remove this and _activity-subpage.scss after Listing is deployed and in use.
// Deouble check that this is not used in other unexpected places

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

import type {Search, Filters} from '../search/types';
import {fetchSearchByFilters, fetchSearchAllByFilters} from '../search/actions';
import {activityPageSelector} from '../search/selectors';
import * as searchHelpers from '../search/helpers';
import i18n from '../root/i18n';
import {getFoundationBreakpoint} from '../helpers.js';

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

class ActivitySubpage extends Component {
  props: Props;

  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      filtersOpen: getFoundationBreakpoint() !== 'small',
      items: [],
    };
  }

  componentDidMount() {
    const {location, content} = this.props,
      filters = searchHelpers.getSearchFilters(location);
    if (global.IS_CLIENT) {
      console.log('Activity subpage: %o', content);
    }

    filters.category = 'activities';
    this.props.fetchSearchAllByFilters(filters);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {location, params, search} = this.props,
      {search: nextSearch, isFetching} = nextProps,
      filters = searchHelpers.getSearchFilters(location, params.language),
      nextFilters = searchHelpers.getSearchFilters(nextProps.location, nextProps.params.language);

    if (!isEqual(filters, nextFilters)) {
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
          category: 'activities',
        });
      } else {
        this.props.fetchSearchByFilters({
          ...nextFilters,
          category: 'activities',
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
    const {t, content, search, location} = this.props,
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
        className={classNames('subpage subpage--activity activities-page', {
          'activities-page--filters-open': filtersOpen,
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
                <GridCardList {...gridCardListProps} />
              </div>
            </DisplayThisSection>

            <div className="activities-page__title">
              <h1>
                <a onClick={this.onTitleClick}>{t('searchTitle')}</a>
              </h1>
              <div className="activities-page__filters-summary">{filtersSummary}</div>
            </div>
          </Column>
        </Row>

        <div className="activities-page__filters">
          <div className="activities-page__filters-wrapper">
            <Row>
              <Column>
                <SearchFilters
                  updateFilters={this.updateFilters.bind(this)}
                  tags={tags}
                  basePath={getContentPathAlias(content)} />
              </Column>
            </Row>
            <Koro color={'#ffffff'} flip />
          </div>
        </div>

        <Row>
          <Column small={12}>
            <DisplayThisSection when={items.length}>
              <div className="activities-page__items">
                {items.map((item, i) => (
                  <SearchItem key={i} {...item} />
                ))}
              </div>
            </DisplayThisSection>

            <DisplayThisSection when={itemCount >= 10}>
              <div className="activities-page__footer">
                <a className="activities-page__load-more" onClick={this.onLoadMoreClick}>
                  {t('loadMore')}
                </a>
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
    activityPageSelector,
    {fetchSearchByFilters, fetchSearchAllByFilters},
  ),
  translate(['common', 'activity']),
)(ActivitySubpage);
