import {createElement} from 'react';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import omit from 'lodash/omit';
import findIndex from 'lodash/findIndex';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import i18n from '../root/i18n';

import * as helpers from '../helpers';
import * as contentHelpers from '../content/helpers';
import * as myHelsinkiHelpers from '../myHelsinki/helpers';
import {ImageStyles, ContentTypes} from '../constants';
import {getSustainabilityStatus} from '../content/helpers';
import {createDateRangeWithTime, getFinnishMomentDate} from '../content/dateHelpers';

export const getSearchEmptyFilters = language => {
  if (!language) {
    language = i18n.language;
  }

  return {
    language,
    keywords: '',
    tags: [],
    category: '',
    page: 1,
  };
};

export const getHomepageSearchFilters = (content, language) => {
  if (!language) {
    language = i18n.language;
  }

  const filters = {language};

  filters.category = 'events';
  filters.dateFrom = get(content, 'field_events_list_start') || getFinnishMomentDate().format('YYYY-MM-DD');
  filters.dateTo = get(content, 'field_events_list_end') || getFinnishMomentDate().format('YYYY-MM-DD');
  filters.tags = map(get(content, 'field_events_list_tags'), 'name');
  filters.page = 1;

  if (Number(get(content, 'field_sticky_and_hema'))) {
    filters.stickyHema = 1;
  }

  return filters;
};

export const getSearchFilters = (location, language) => {
  if (!language) {
    language = i18n.language;
  }

  const {query} = location,
    filters = {language};

  filters.keywords = query && query.keywords ? query.keywords : '';
  filters.tags = query && query.tags ? query.tags.split(',') : [];
  filters.category = query && query.category ? query.category : '';
  filters.dateFrom = query && query.dateFrom ? query.dateFrom : '';
  filters.dateTo = query && query.dateTo ? query.dateTo : '';
  filters.page = query && query.page ? Number(query.page) : 1;
  filters.sort = query && query.sort ? query.sort : '';

  return filters;
};

export const filtersHaveChanged = (filters, nextFilters) => {
  return !isEqual(omit(filters, ['page']), omit(nextFilters, ['page']));
};

export const getSearchQuery = filters => {
  let query = [];
  forEach(omit(filters, ['language']), (filter, key) => {
    if (!isEmpty(filter) || isNumber(filter)) {
      if (isArray(filter)) {
        const items = [];
        forEach(filter, item => {
          items.push(encodeURIComponent(item));
        });
        filter = items;
      }

      if (key === 'page' && Number(filter) < 2) {
        return;
      }

      query.push(`${key}=${isArray(filter) ? filter.join(',') : encodeURIComponent(filter)}`);
    }
  });

  return query.length ? `?${query.join('&')}` : '';
};

export const getSearchFiltersSummary = (filters, categories = {}) => {
  const summary = [];

  if (filters.dateFrom || filters.dateTo) {
    const dateFrom = filters.dateFrom ? getFinnishMomentDate(filters.dateFrom) : null,
      dateTo = filters.dateTo ? getFinnishMomentDate(filters.dateTo) : null;

    summary.push(formatDateRange(dateFrom, dateTo));
  }

  forEach(omit(filters, ['language', 'dateFrom', 'dateTo', 'sort']), (filter, key) => {
    if (!isEmpty(filter)) {
      if (isArray(filter)) {
        const items = [];
        forEach(filter, item => {
          items.push(item);
        });
        filter = items;
      }

      switch (key) {
        case 'category':
          const index = findIndex(categories, category => {
            return category.key === filter;
          });

          if (categories[index]) {
            filter = categories[index].label;
          }
          break;
      }

      summary.push(isArray(filter) ? filter.join(', ') : filter);
    }
  });

  //if (!summary.length) {
  //  return i18n.t('search:allFiltersSummaryLabel');
  //}

  return summary.join('\n');
};

export const getSearchCount = search => {
  return get(search, 'count', 0);
};

export const getSearchTags = (search, filters) => {
  const tagData = get(search, 'tags'),
    tags = [];

  forEach(tagData, tag => {
    tags.push({
      label: tag,
      key: tag,
      active: filters.tags ? findIndex(filters.tags, t => t === tag) > -1 : false,
    });
  });

  if (tags.length) {
    tags.unshift({
      label: i18n.t('search:tagsAllLabel'),
      key: 'all',
      active: !filters.tags || !filters.tags.length,
    });
  }

  return tags;
};

export const getSearchCategories = (search, filters) => {
  const categoryData = get(search, 'available_categories'),
    categories = [];

  forEach(categoryData, (label, key) => {
    categories.push({
      label: label,
      key: key,
      active: filters.category === key,
    });
  });

  return categories;
};

export const getSearchItems = search => {
  let itemsData = get(search, 'items');
  const items = [],
    imageStyle = ImageStyles.SQUARE_150;

  forEach(itemsData, item => {
    let heart;
    if (item.field_heart_icon) {
      heart = myHelsinkiHelpers.getListCardBackground(item, imageStyle);
    } else if (item.field_hero_carousel) {
      const itemContent = item.field_hero_carousel[0]
        ? item.field_hero_carousel[0].field_promotion_link
        : {};
      if (itemContent && itemContent[0]) {
        heart = itemContent[0].field_heart_icon
          ? myHelsinkiHelpers.getListCardBackground(itemContent[0], imageStyle)
          : null;
      }
    }
    const image = contentHelpers.getContentCoverImage(item, imageStyle),
      itemData = {
        link: contentHelpers.getContentPath(item),
        heart: heart ? heart : null,
        image: image ? `url("${image}")` : null,
        title: contentHelpers.getContentTitle(item),
        tags: contentHelpers.getContentTags(item),
        header: getSearchItemHeader(item),
        description: getSearchItemDescription(item),
        sustainabilityStatus: getSustainabilityStatus(item),
      };

    const placeholder = contentHelpers.getContentCardPlaceholder(item);
    if (placeholder) {
      itemData.placeholder = createElement(placeholder, {type: 'search-item'});
    }

    if (myHelsinkiHelpers.isContentAllowedListItem(item)) {
      itemData.onHeartClick = () => {
        helpers.showAddToListModal(contentHelpers.getContentId(item));
      };
    }

    const color = contentHelpers.getContentColor(item);
    if (color) {
      itemData.color = color;
    }

    items.push(itemData);
  });

  return items;
};

export const getSearchTagUrl = tag => {
  // TODO: Support other filters.
  return `/${i18n.language}/search?tags=${encodeURIComponent(tag)}`;
};

/**
 *
 * @param item
 * @returns {*}
 */
export const getSearchItemHeader = item => {
  const type = contentHelpers.getContentType(item);
  switch (type) {
    case ContentTypes.ACTIVITY:
      return i18n.t('search:headerActivity');
    case ContentTypes.ARTICLE:
      return i18n.t('search:headerArticle');
    case ContentTypes.INFO_PAGE:
      return i18n.t('search:headerArticle');
    case ContentTypes.THEME_PAGE:
      return i18n.t('search:headerArticle');
    case ContentTypes.MY_HELSINKI_LOCAL_GUIDE:
      return i18n.t('search:headerMyLocalGuide');
    case ContentTypes.MY_HELSINKI_LIST:
      return i18n.t('search:headerMyHelsinkiList');
    case ContentTypes.EAT_AND_DRINK:
      return i18n.t('search:headerEatAndDrink');
    case ContentTypes.PLACE:
      const priceRangeData = get(item, 'field_price_range'),
        priceRange = priceRangeData ? new Array(Number(priceRangeData)).join('€') : '',
        placeType = get(item, 'field_place_type[0].name', '');
      return `${placeType}   ${priceRange}`;
    case ContentTypes.EVENT:
      const startTime = get(item, 'field_start_time'),
        endTime = get(item, 'field_end_time');
      return createDateRangeWithTime(startTime, endTime);
    default:
      return null;
  }
};

/**
 *
 * @param item
 * @returns {*}
 */
export const getSearchItemDescription = item => {
  const type = contentHelpers.getContentType(item);
  switch (type) {
    case ContentTypes.PLACE:
      return get(item, 'field_street_address', '');
    case ContentTypes.EVENT:
    case ContentTypes.ACTIVITY:
      const description = [],
        address = get(item, 'field_location_street_address', '') || '',
        locationName = get(item, 'field_location_name', '') || '';

      if (locationName) {
        description.push(locationName);
      }

      if (address) {
        description.push(address);
      }

      return description.join(', ');
    case ContentTypes.THEME_PAGE:
    case ContentTypes.ARTICLE:
      return get(item, 'field_teaser_text');
    default:
      return contentHelpers.getContentDescription(item);
  }
};

/**
 *
 * @param dateFrom
 * @param dateTo
 * @param format
 * @returns {string}
 *
 * @todo Consider refactoring the site-wide helper function formatDateRange()
 *   so that it can be used in this situation.
 */
export const formatDateRange = (dateFrom, dateTo, format = 'dddd, D MMM YYYY') => {
  if (!dateFrom && !dateTo) {
    return '';
  }

  if (!dateFrom || !dateTo) {
    if (dateFrom) {
      return `${dateFrom.format(format)} - `;
    }

    return ` - ${dateTo.format(format)}`;
  }

  if (dateFrom.isSame(dateTo)) {
    return dateFrom.format(format);
  }

  return `${dateFrom.format(format)} - ${dateTo.format(format)}`;
};

/**
 * Checks if current location is search page.
 * @param router
 */
export const isSearchPage = router => {
  return router.isActive(`/${i18n.language}/search`);
};

/**
 * Helps determine whether to show/hide action link for search result pages
 * @param currentCategory
 */
export const showActionLinks = (currentCategory: string) => {
  const categoriesToHideActionLinks = [
    'my_helsinki_local_guide',
    'events',
    'activities',
    'my_helsinki_list',
    'articles',
  ];

  if (i18n.language === 'en' || i18n.language === 'fi') {
    if (categoriesToHideActionLinks.includes(currentCategory)) {
      return false;
    }
    return true;
  }
  return false;
};
