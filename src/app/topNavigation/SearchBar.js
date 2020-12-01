import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import {connect} from 'react-redux';
import {fetchViewByName} from '../../view/actions';
import {fetchMenuByName} from '../../menu/actions';
import {SearchMenuByLanguage} from '../../constants';
import {searchMenuSelector} from '../../menu/selectors';
import {WHATS_POPULAR, BypassCacheQueryParameter} from '../../constants';
import SearchItem from '../../search/SearchItem';
import i18n from '../../root/i18n';
import FocusLock from 'react-focus-lock';

import Koro from '../../koro/Koro';
import {Colors} from '../../constants';
import * as searchHelpers from '../../search/helpers';
import has from 'lodash/has';

type Props = {
  show: boolean,
  onClose: Function,
  onShow: Function,
  location: Object,
  links: Array,
  fetchViewByName: typeof fetchViewByName,
  fetchMenuByName: typeof fetchMenuByName,
  menu: Array,
  view: Object,
  language: String,
  params: Object,
};

class SearchBar extends Component {
  props: Props;

  static contextTypes = {
    router: PropTypes.object,
  };

  static defaultProps = {
    show: true,
    onClose: () => {},
    onShow: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('keydown', this.onDocumentKeyPress);
      const {menu, view, language} = this.props,
        whatsPopular = WHATS_POPULAR,
        menuName = SearchMenuByLanguage[language];

      if (!language) return;

      const bypassCache = has(this.props.location, `query.${BypassCacheQueryParameter}`);

      if (!view && whatsPopular) {
        this.props.fetchViewByName(whatsPopular, language, bypassCache);
      }

      if (!menu && menuName) {
        this.props.fetchMenuByName(menuName, language, bypassCache);
      }
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('keydown', this.onDocumentKeyPress);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const filters = searchHelpers.getSearchFilters(nextProps.location);
    if (filters.keywords !== this.state.value) {
      this.setState({value: filters.keywords});
      this.props.onClose();
    } else if (!filters.keywords && this.props.location.pathname !== nextProps.location.pathname) {
      this.props.onClose();
    }

    if (filters.keywords && this.props.location.pathname !== nextProps.location.pathname) {
      this.props.onShow();
    }

    const {
        params: {language},
      } = this.props,
      {
        menu,
        params: {language: nextLanguage},
      } = nextProps;

    // Check if we need to fetch menu and view from API, but only if language has changed.

    if (language !== nextLanguage) {
      const whatsPopular = WHATS_POPULAR,
        menuName = SearchMenuByLanguage[nextLanguage];

      const bypassCache = has(this.props.location, `query.${BypassCacheQueryParameter}`);

      if (!menu && menuName) {
        this.props.fetchMenuByName(menuName, nextLanguage, bypassCache);
      }

      if (whatsPopular) {
        this.props.fetchViewByName(whatsPopular, nextLanguage, bypassCache);
      }
    }
  }

  onDocumentKeyPress = event => {
    // Escape
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  onInputKeyPress = event => {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  };

  onClose = event => {
    this.props.onClose();
    event.preventDefault();
  };

  onSearch = event => {
    const {location} = this.props,
      {language} = i18n,
      {router} = this.context,
      {value} = this.state,
      filters = searchHelpers.isSearchPage(router)
        ? searchHelpers.getSearchFilters(location)
        : searchHelpers.getSearchEmptyFilters();

    filters.keywords = value;
    filters.page = 1;
    const query = searchHelpers.getSearchQuery(filters);

    router.push(`/${language}/search${query}`);

    if (event) {
      event.preventDefault();
    }
  };

  onSuggest = suggestion => {
    const {router} = this.context;

    router.push(suggestion);

    this.props.onClose();
  };

  onInputChange = event => {
    this.setState({value: event.target.value});
  };

  getWhatsPopularItems = () => {
    const {view} = this.props;
    const items = searchHelpers.getSearchItems(view);

    return items.length
      ? {
        title: i18n.t("search:what'sPopular"),
        items: items,
      }
      : null;
  };

  getSearchMenu = () => {
    const searchMenu = this.props.menu;

    if (searchMenu) {
      return searchMenu.map(({title, url}, i) => (
        <div key={i}>
          <a href={url} onClick={() => this.onSuggest(url)}>{title}</a>
        </div>
      ));
    }
    return null;
  };

  render() {
    const isSearchPage = searchHelpers.isSearchPage(this.context.router),
      whatsPopular = this.getWhatsPopularItems(),
      searchMenu = this.getSearchMenu();

    return (
      <FocusLock disabled={!this.props.show} onActivation={(node) => {
        // FocusLock will be active if we just call `this.input.focus()`.
        // The below timeout trick is suggested to be used in the library docs:
        // https://github.com/theKashey/react-focus-lock#unmounting-and-focus-management
        setTimeout(() => { this.input.focus() }, 0);
      }}>
      <div
        className={classNames('search-bar', {
          'search-bar--hidden': !this.props.show,
        })}
      >
        <div className="row">
          <div className="column col-md-12">
              <div className="search-bar__close">
                <button onClick={this.onClose} aria-label={i18n.t('common:close')} />
              </div>
              <div className="search-bar__search-field">
                <input
                  ref={c => {
                    this.input = c;
                  }}
                  type="search"
                  value={this.state.value}
                  onChange={this.onInputChange}
                  onKeyDown={this.onInputKeyPress}
                  aria-label={i18n.t('common:search')}
                />
                <button
                    className="search-bar__search-button button"
                    onClick={this.onSearch}
                >
                  {i18n.t('common:search')}
                </button>
              </div>
          </div>
          <div className="search-bar__search-menu">{!isSearchPage && searchMenu}</div>
          {!isSearchPage && !!whatsPopular && (
            <div className="search-bar__whats-popular">
              <div className="title">{whatsPopular.title}</div>
              {whatsPopular.items.map((item, i) => (
                <SearchItem key={i} {...item} />
              ))}
            </div>
          )}
        </div>
        <Koro color={Colors.HEL_SUMMER_2} />
      </div>
      </FocusLock>
    );
  }
}

export default flowRight(
  withRouter,
  connect(
    searchMenuSelector,
    {fetchViewByName, fetchMenuByName},
  ),
)(SearchBar);
