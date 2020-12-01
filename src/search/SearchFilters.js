import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import {withRouter} from 'react-router';
import i18n from '../root/i18n';
import findIndex from 'lodash/findIndex';
import {getFinnishMomentDate} from '../content/dateHelpers';
import {simplifyName} from '../content/helpers';

import DatePicker from '../datePicker/DatePicker';
import * as searchHelpers from '../search/helpers';

type Props = {
  className: String,
  dateFrom: Object,
  dateTo: Object,
  tags: Array,
  categories: Array,
  basePath: String,
  location: Object,
  showDateFilters: Boolean,
  params: Object,
  t: Function,
  updateFilters: Function,
};

const isTodayActive = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) {
    return false;
  }
  const today = getFinnishMomentDate();
  return today.isSame(dateFrom, 'day') && today.isSame(dateTo, 'day');
};

const isTomorrowActive = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) {
    return false;
  }

  const tomorrow = getFinnishMomentDate().add(1, 'day');
  return tomorrow.isSame(dateFrom, 'day') && tomorrow.isSame(dateTo, 'day');
};

const isChooseActive = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) {
    return false;
  }

  return !isTodayActive(dateFrom, dateTo) && !isTomorrowActive(dateFrom, dateTo);
};

class SearchFilters extends Component {
  props: Props;

  static defaultProps = {
    dateFrom: null,
    dateTo: null,
    tags: [],
    categories: [],
    basePath: '/search',
    showDateFilters: false,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      showDatePicker: false,
    };
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const {location, params, updateFilters} = this.props,
      filters = searchHelpers.getSearchFilters(location, params.language),
      nextFilters = searchHelpers.getSearchFilters(nextProps.location, nextProps.params.language);
    if (filters.category === 'events' && nextFilters.category !== 'events') {
      nextFilters.dateFrom = '';
      nextFilters.dateTo = '';

      updateFilters(nextFilters, nextProps.params.language);
    }
  }

  onDocumentClick = event => {
    const target = event.target,
      el = ReactDOM.findDOMNode(this.datepicker),
      buttonEl = ReactDOM.findDOMNode(this.datepickerButton);

    if (this.state.showDatePicker && target !== el && target !== buttonEl && !el.contains(target)) {
      this.setState({
        showDatePicker: false,
      });
    }
  };

  onFilterCategoryClick = category => {

    const {location, updateFilters} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    filters.category = filters.category !== category.key ? category.key : '';
    filters.page = 1;

    updateFilters(filters);
  };

  onFilterTagClick = tag => {
    const {location, updateFilters} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    if (tag.key === 'all') {
      filters.tags = [];
    } else {
      const index = findIndex(filters.tags, t => t === tag.key);
      if (index > -1) {
        filters.tags.splice(index, 1);
      } else {
        filters.tags.push(tag.key);
      }
    }

    filters.page = 1;

    updateFilters(filters);
  };

  onFilterDateSelect = (dateFrom, dateTo) => {
    const {location, updateFilters} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    filters.dateFrom = dateFrom ? dateFrom.format('YYYY-MM-DD') : '';
    filters.dateTo = dateTo ? dateTo.format('YYYY-MM-DD') : '';

    filters.page = 1;

    updateFilters(filters);
  };

  getDateSelected = () => {
    const {dateFrom, dateTo} = this.props;

    if (!dateFrom && !dateTo) {
      return '';
    }

    return searchHelpers.formatDateRange(dateFrom, dateTo);
  };

  isDateFilterVisible = () => {
    const {location, showDateFilters} = this.props,
      filters = searchHelpers.getSearchFilters(location);

    return showDateFilters || filters.category === 'events';
  };

  render() {
    const {t, className, dateFrom, dateTo, tags, categories} = this.props,
      {showDatePicker} = this.state;

    return (
      <div
        className={classNames('search-filters', className, {
          'search-filters--show-datepicker': this.state.showDatePicker,
        })}
        role="group"
        aria-label={t('searchFilters')}
        tabIndex={-1}
      >
        {this.isDateFilterVisible() && (
          <div className="search-filters__date">
            <div className="search-filters__title">{t('dateTitle')}</div>
            <div className="search-filters__date-items">
              <button
                title={t('dateFilterToday')}
                className={classNames('search-filters__date-item button', {
                  'search-filters__date-item--active': isTodayActive(dateFrom, dateTo)
                })}
                aria-pressed={isTodayActive(dateFrom, dateTo)}
                onClick={() => {
                  if (isTodayActive(dateFrom, dateTo)) {
                    this.onFilterDateSelect(null, null);
                  } else {
                    const today = getFinnishMomentDate();
                    this.onFilterDateSelect(today, today);
                  }
                }}
              >
                {t('dateFilterToday')}
              </button>
              <button
                title={t('dateFilterTomorrow')}
                className={classNames('search-filters__date-item button', {
                  'search-filters__date-item--active': isTomorrowActive(dateFrom, dateTo)
                })}
                aria-pressed={isTomorrowActive(dateFrom, dateTo)}
                onClick={() => {
                  if (isTomorrowActive(dateFrom, dateTo)) {
                    this.onFilterDateSelect(null, null);
                  } else {
                    const tomorrow = getFinnishMomentDate().add(1, 'days');
                    this.onFilterDateSelect(tomorrow, tomorrow);
                  }
                }}
              >
                {t('dateFilterTomorrow')}
              </button>
              <button
                title={t('dateFilterChoose')}
                ref={pickerButton => this.datepickerButton = pickerButton}
                className={classNames('search-filters__date-item button', {
                  'search-filters__date-item--active':
                    showDatePicker || isChooseActive(dateFrom, dateTo)
                })}
                aria-expanded={showDatePicker}
                onClick={() => {
                  this.setState({
                    showDatePicker: !showDatePicker,
                  });
                }}
              >
                {t('dateFilterChoose')}
              </button>
            </div>
            <div className="search-filters__date-selected">{this.getDateSelected()}</div>
            <div className="search-filters__date-datepicker">
              {this.state.showDatePicker && (
                <DatePicker
                  ref={picker => this.datepicker = picker}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  onChange={(from, to) => {
                    this.onFilterDateSelect(from, to);
                  }}
                  onClose={() => {
                    this.setState({
                      showDatePicker: false,
                    });
                  }}
                />
              )}
            </div>
          </div>
        )}
        {!!categories.length && (
          <div className="search-filters__categories">
            <div className="search-filters__title">{t('categoriesTitle')}</div>
            <div className="search-filters__categories-items">
              {categories.map((category, key) => (
                <button
                  key={key}
                  title={category.label}
                  aria-pressed={category.active}
                  className={classNames('search-filters__category button', {
                    'search-filters__category--active': category.active
                  })}
                  onClick={e => {
                    this.onFilterCategoryClick(category);
                    e.preventDefault();
                  }}
                >
                  {simplifyName(category.label)}
                </button>
              ))}
            </div>
          </div>
        )}
        {!!tags.length && (
          <div className="search-filters__tags">
            <div className="search-filters__title">{t('tagsTitle')}</div>
            <div className="search-filters__tags-items">
              {tags.map((tag, key) => (
                <button
                  key={key}
                  title={tag.label}
                  aria-pressed={tag.active}
                  className={classNames('search-filters__tag button', {
                    'search-filters__tag--active': tag.active
                  })}
                  onClick={e => {
                    this.onFilterTagClick(tag);
                    e.preventDefault();
                  }}
                >
                  {(tag.key !== 'all' ? '#' : '') + simplifyName(tag.label)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['search']),
)(SearchFilters);
