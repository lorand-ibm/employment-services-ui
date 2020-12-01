import React, {Component} from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {withRouter, Link, browserHistory} from 'react-router';
import classNames from 'classnames';
import forEach from 'lodash/forEach';
import {translate} from 'react-i18next';
import isExternal from 'is-url-external';

import i18n from '../../root/i18n';
import {fetchMenuByName} from '../../menu/actions';
import {mainMenuPageSelector} from '../../menu/selectors';
import {buildTopNavigationLinks} from './helpers';
import {MainMenuByLanguage, LanguageMenuItems, BypassCacheQueryParameter} from '../../constants';
import * as helpers from '../../helpers';
import SearchBar from './SearchBar';
import TopNavigationSubmenu from './TopNavigationSubmenu';
import MenuLink from './MenuLink';
import MyHelsinkiListDropdown from '../../myHelsinki/MyHelsinkiListDropdown';
import Dropdown from '../../dropdown/Dropdown';
import {MobileOnlyFocusLock} from './MobileOnlyFocusLock';

import type {User} from '../../auth/types';
import {has, get} from 'lodash';

// The inert attribute is used to prevent the keyboard focus from jumping to the search bar
// Use dist/inert for ES3 (IE support)
import inert from 'wicg-inert/dist/inert';

type Props = {
  links: Array,
  isFetching: Boolean,
  fetchMenuByName: typeof fetchMenuByName,
  menu: Array,
  i18n: Object,
  user: User,
  isAuthenticated: Boolean,
  params: Object,
  location: String,
};

const SCROLL_DIRECTION_UP = 'SCROLL_DIRECTION_UP',
  SCROLL_DIRECTION_DOWN = 'SCROLL_DIRECTION_DOWN',
  SCROLL_DIRECTION_IDLE = 'SCROLL_DIRECTION_IDLE';

class TopNavigation extends Component {
  props: Props;
  links: [];
  prevPageYOffset: 0;
  initiatedByTouch: false;
  mobileMenuAnimationDurationOpen: Number;
  mobileMenuAnimationDurationClose: Number;

  static defaultProps = {
    links: [],
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      showSearch: false,
      active: null,
      open: false,
      showSubmenu: false,
      animateSubmenuHide: false,
      animateSubmenuSlideOut: false,
      scrolled: false,
      scrollDirection: SCROLL_DIRECTION_IDLE,
      logo: helpers.getLogo(),
      logoClass: helpers.getLogoClass(),
      navLinkPadding: 0,
      hamburgerMenuOpen: false,
    };

    this.links = [];
    if (global.IS_CLIENT) {
      i18n.on('languageChanged', this.onLanguageChange);
    }

    // Note: Mobile menu animation duration should be defined so that they match
    // the durations of the CSS open/close animations.
    this.mobileMenuAnimationDurationOpen = 600;
    this.mobileMenuAnimationDurationClose = 600;
  }

  onLanguageChange = () => {
    this.setState({
      logo: helpers.getLogo(),
      logoClass: helpers.getLogoClass(),
    });
  };

  updateNavigationWidth = () => {
    const rowWidth = get(this.refs, 'topNavigationRow.clientWidth');
    this.setState({
      navigationWidth: rowWidth,
    });
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('click', this.checkClickOutsideOfSubmenu);
      document.addEventListener('scroll', this.onDocumentScroll);
      const {
          menu,
          params: {language},
        } = this.props;

      let menuName = MainMenuByLanguage[language];

      //Default to english if language missing
      if (!menuName) {
        menuName = MainMenuByLanguage['en'];
      }

      if (!menu && menuName) {
        const bypassCache = has(this.props.location, `query.${BypassCacheQueryParameter}`);
        this.props.fetchMenuByName(menuName, language, bypassCache);
      }

      if (menu) {
        this.updateLinks(menu);
      }

      if (global.IS_CLIENT) {
        window.addEventListener('resize', this.updateNavigationWidth);
      }
      this.updateNavigationWidth();
    }
  }

  componentDidUpdate(prevProps) {
    //close search when enter search page
    if (prevProps.location.pathname !== this.props.location.pathname && this.props.location.pathname.match(/\/([^+]){2}\/search/)) {
      this.hideSearch();
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('click', this.checkClickOutsideOfSubmenu);
      document.removeEventListener('scroll', this.onDocumentScroll);
      window.removeEventListener('resize', this.updateNavigationWidth);
    }

    clearTimeout(this.openTimeout);
    clearTimeout(this.closeTimeout);
    clearTimeout(this.submenuHideTimeout);
  }

  //need to use 'WillRecieve' because this.updateLinks updates class variable
  componentWillReceiveProps(nextProps) {
    const nextLanguage = nextProps.params.language;
    const language = this.props.params.language;

    //langauge has changed, but no menu for it: fetch from API
    if (nextLanguage !== language && !nextProps.menu) {
      this.fetchMenu(nextProps.params.language);
    }

    if (nextProps.menu) {
      this.updateLinks(nextProps.menu);
    }
  }

  fetchMenu(language) {
    let menuName = MainMenuByLanguage[language];

    //Default to english if language missing
    if (!menuName) {
      menuName = MainMenuByLanguage['en'];
    }

    const bypassCache = has(this.props.location, `query.${BypassCacheQueryParameter}`);
    this.props.fetchMenuByName(menuName, language, true);
  }

  updateLinks = menu => {
    this.links = menu ? buildTopNavigationLinks(menu, '../../..') : [];
  };

  onNavigationLinkTouchEnd = () => {
    if (this.state.animateOpen) {
      return;
    }
    this.initiatedByTouch = true;
  };

  // Close submenu if clicked outside submenu links children
  checkClickOutsideOfSubmenu = event => {
    const target = event.target,
      links = ReactDOM.findDOMNode(this.refs.links);

    if (
      !this.initiatedByTouch &&
      this.state.showSubmenu &&
      // Clicking links parent should NOT close
      links !== target &&
      // Clicking links children should close
      !links.contains(target)
    ) {
      this.slideOutSubmenu();
    }
  };

  onNavigationLinkMouseEnter = (event, link, i) => {
    if (this.state.animateOpen) {
      return;
    }
    // Don't do anything if the link doesn't have any children.
    const children = get(link, 'children');
    if (!children.length) {
      return;
    }

    if (!this.initiatedByTouch && this.state.showSubmenu && this.state.active !== i) {
      // Set padding for submenu links
      const linkPosition = event.target.offsetLeft;
      const navPosition = document.getElementById('top-navigation__wrapper').offsetLeft;
      const paddingLeft = linkPosition - navPosition;
      this.setState({navLinkPadding: paddingLeft});
      this.setActive(i);
    }
  };

  onNavigationLinkClick = (event, link, i) => {
    if (this.state.animateOpen) {
      return;
    }
    // Open the link if the link doesn't have any children (since there is no sub-menu to show).
    const children = get(link, 'children');

    if (!children.length) {
      if (isExternal(link.url) && global.IS_CLIENT) {
        window.open(link.url, '_blank');
      } else {
        browserHistory.push(link.url);
      }
      this.setSubmenuClosed();
      this.setState({submenuOpen: false})
      this.setState
      return;
    }

    // Set padding for submenu links
    const linkPosition = event.target.offsetLeft;
    const navPosition = document.getElementById('top-navigation__wrapper').offsetLeft;
    const paddingLeft = linkPosition - navPosition;
    this.setState({navLinkPadding: paddingLeft});

    this.setState({submenuOpen: true});

    if (isExternal(link.url)) {
      window.open(link.url, '_blank');
    }

    if (this.initiatedByTouch) {
      if (this.initiatedByTouch && this.state.active === i) {
        this.slideOutSubmenu();
      } else {
        this.setActive(i);
      }
      this.initiatedByTouch = false;
      return;
    }
    if (this.state.showSubmenu) {
      if (this.state.active !== i) {
        this.setActive(i);
      } else {
        this.slideOutSubmenu();
      }
    } else {
      this.setActive(i);
    }
  };

  onDocumentScroll = () => {
    const offset = this.getScrollY();

    if (
      this.prevPageYOffset > offset &&
      offset >= 0 &&
      this.state.scrollDirection !== SCROLL_DIRECTION_UP
    ) {
      this.setState({
        scrollDirection: SCROLL_DIRECTION_UP,
      });
    }

    if (
      this.prevPageYOffset < offset &&
      offset > 0 &&
      this.state.scrollDirection !== SCROLL_DIRECTION_DOWN
    ) {
      this.setState({
        scrollDirection: SCROLL_DIRECTION_DOWN,
      });
    }

    this.prevPageYOffset = offset;

    if (this.state.scrolled && offset < 10) {
      this.setState({scrolled: false});
      return;
    }
    if (this.state.scrolled === false && offset > 0) {
      this.setState({scrolled: true});
    }
  };

  //scroll to top only in search page
  onSearchClick = () => {
    if (this.props.location.pathname.match(/\/([^+]){2}\/search/)) {
      window.scrollTo(0,0);

      // Some pages need body element to be scrolled top as well as window
      document.body.scrollTop = 0;
    } else {
      this.showSearch();
    }
  };

  homeClick = () => {
    this.context.router.push('/');
    this.closeMenu();
  };

  onLanguageMenuItemClick = item => {
    if (item.id !== i18n.language) {
      helpers.setActiveLanguage(item.id);
    }
  };

  showSearch = () => {
    this.setState({
      active: null,
      showSearch: true,
      showSubmenu: false,
    });
  };

  hideSearch = () => {
    this.setState({showSearch: false,}, () => {
      setTimeout(() => {
        let searchButton = document.querySelector(".user-menu-link--search");
        if (searchButton) {
          searchButton.focus();
        }
      }, 0);
    });
  };

  openMenu = () => {
    this.setState({hamburgerMenuOpen: true})
    this.setState({
      animateOpen: true,
      open: true,
      active: null,
    });
    this.openTimeout = setTimeout(() => {
      this.setState({
        animateOpen: false,
        open: true,
        active: null,
      });
    }, this.mobileMenuAnimationDurationOpen);
  };

  slideOutSubmenu = () => {
    this.setState({
      animateSubmenuSlideOut: true,
      showSubmenu: false,
    });

    this.closeTimeout = setTimeout(() => {
      this.setSubmenuClosed();
    }, 200);
  };

  setSubmenuClosed = () => {
    this.setState({
      animateSubmenuSlideOut: false,
      active: null,
      showSubmenu: false,
      open: false,
    }, () => {
      setTimeout(() => {
        const navOpenButton = document.querySelector(".top-navigation__open");
        if (navOpenButton) {
          navOpenButton.focus();
        }
      }, 0);
    });
  };

  closeMenu = () => {
    this.setState({hamburgerMenuOpen: false})
    this.setState({
      animateClose: true,
    });
    this.closeTimeout = setTimeout(() => {
      this.setState({
        animateClose: false,
        open: false,
        active: null,
        showSubmenu: false,
      });
    }, this.mobileMenuAnimationDurationClose);
  };

  setActive = active => {
    this.setState({
      active: active,
      showSubmenu: active !== null,
    });
  };

  getChildren = key => {
    const link = this.links[key];
    return link && link.children.length > 0 ? link.children : [];
  };

  getColor = key => {
    const link = this.links[key];
    return link ? link.color : null;
  };

  // http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
  getScrollY = () => {
    if (!global.IS_CLIENT) {
      return 0;
    }

    return (
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0)
    );
  };

  hideSubmenu = () => {
    this.setState({
      animateSubmenuHide: true,
    });

    this.submenuHideTimeout = setTimeout(() => {
      this.setState({
        animateSubmenuHide: false,
        showSubmenu: false,
        active: null,
      });
    }, 200);
  };

  /**
   * Get menu type (mobile / desktop)
   *
   * Menu type depends on the language. We want to keep the items on one row and the width of the
   * menu items differs a lot per language.
   *
   * At the time of writing this (2019-05) the max width of the website content area is 1200px.
   * Some languages (eg. German) would need more than 1200px to show the desktop menu. This means
   * that those languages will always show the mobile menu, even on high resolutions.
   *
   * @returns {string}
   */
  getMenuType = () => {
    const {i18n} = this.props;
    const {navigationWidth} = this.state;

    let desktopMenuResolution;
    switch (i18n.language) {
      case 'en':
        desktopMenuResolution = 1055;
        break;
      case 'fi':
        desktopMenuResolution = 1125;
        break;
      case 'sv':
        desktopMenuResolution = 1050;
        break;
      case 'de':
        desktopMenuResolution = 1150;
        break;
      case 'ja':
        desktopMenuResolution = 1050;
        break;
      case 'ru':
        desktopMenuResolution = 1100;
        break;
      default:
        desktopMenuResolution = 1200;
        break;
    }

    return (navigationWidth < desktopMenuResolution) ? 'mobile' : 'desktop';
  };

  // Accessibility helper to help set correct message (button collapsed) for nav buttons if MyHelsinki logo link is clicked
  submenuIsClosed = () => {
    this.setState({showSubmenu: false});
  }

  render() {
    const {i18n, isAuthenticated} = this.props;
    const active = this.state.active !== null ? this.links[this.state.active] : null;
    const {navLinkPadding} = this.state;

    const getLinks = () => (
      <div className="top-navigation__links" ref="links">
        {this.links.map((link, i) => {
          const children = get(link, 'children');
          return (
            <div
              className={classNames('top-navigation__link', `top-navigation__link--${link.key}`, {
                'top-navigation__link--active': i === this.state.active,
              })}
              key={i}
            >
              {!children.length ? (
                <a
                  className="title"
                  ref={'navigation-link-' + i}
                  href={link.url}
                  onMouseEnter={event => {
                    this.onNavigationLinkMouseEnter(event, link, i);
                  }}
                  onTouchEnd={this.onNavigationLinkTouchEnd}
                  onClick={event => {
                    this.onNavigationLinkClick(event, link, i);
                  }}
                >
                  {link.title}
                </a>
              ) : (
                <>
                  <button
                    className="title"
                    ref={'navigation-link-' + i}
                    aria-expanded={this.state.showSubmenu && this.state.active === i}
                    onMouseEnter={event => {
                      this.onNavigationLinkMouseEnter(event, link, i);
                    }}
                    onTouchEnd={this.onNavigationLinkTouchEnd}
                    onClick={event => {
                      event.preventDefault();
                      this.onNavigationLinkClick(event, link, i);
                    }}
                  >
                    {link.title}
                  </button>
                  <TopNavigationSubmenu
                    type={type}
                    show={this.state.active === i}
                    paddingLeft={navLinkPadding}
                    links={this.getChildren(i)}
                    backgroundColor={this.getColor(i)}
                    onHide={() => {
                      this.hideSubmenu();
                    }}
                    onClose={() => {
                      this.slideOutSubmenu();
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    );

    // Control menu type (mobile / desktop) based on the parent elements width.
    // @todo This solution is a quick fix to handle the menu items wrapping to multiple rows.
    //   A proper long-term solution might be to create separate components for mobile menu and
    //   and desktop menu since they don't almost anything in common.
    const type = this.getMenuType();
    const isMobile = type === 'mobile';

    return (
      <header className={classNames(
        'top-navigation-type-wrap',
        `top-navigation-type-wrap--${type}`,
      )}>
        <nav aria-label={i18n.t('primary')}>
          <div
            className={classNames(
              'top-navigation',
              active ? 'top-navigation--active-' + active.key : false,
              {
                'top-navigation--active': active,
                'top-navigation--is-open': this.state.open,
                'top-navigation--opening': this.state.animateOpen,
                'top-navigation--closing': this.state.animateClose,
                'top-navigation--is-closed': !this.state.open,
                'top-navigation--scrolled': this.state.scrolled,
                'top-navigation--scrolling-up': this.state.scrollDirection === SCROLL_DIRECTION_UP,
                'top-navigation--scrolling-down': this.state.scrollDirection === SCROLL_DIRECTION_DOWN,
                'top-navigation--submenu-open': this.state.showSubmenu,
                'top-navigation--submenu-animate-hide': this.state.animateSubmenuHide,
                'top-navigation--submenu-animate-slide-out': this.state.animateSubmenuSlideOut,
              },
            )}
          >
            <MobileOnlyFocusLock mobile={isMobile} disabled={!this.state.open}>
              <div className="top-navigation__bar-wrapper"
                role={isMobile ? 'dialog' : null}>
                <div className="top-navigation__row" ref="topNavigationRow" inert={this.state.showSearch ? 'true' : null}>
                  <div className="column col-sm-12">
                    <div className="top-navigation__wrapper" id="top-navigation__wrapper">
                      <div className="top-navigation__mobile-menu-toggle">
                        <span className="visually-hidden">{i18n.t('menu')}</span>
                        <button className="top-navigation__open" onClick={this.openMenu} aria-label={i18n.t('openNavMenu')} aria-expanded={this.state.hamburgerMenuOpen} />
                        <button className="top-navigation__close" onClick={this.closeMenu} aria-label={i18n.t('closeNavMenu')} aria-expanded={this.state.hamburgerMenuOpen} />
                      </div>
                      <div className="top-navigation__logo">
                        <Link to="/" className={this.state.logoClass} onClick={this.submenuIsClosed}>
                          <img src={this.state.logo} alt={i18n.t('home')} />
                        </Link>
                      </div>
                      {type !== 'mobile' && getLinks()}
                      <div className="top-navigation__user-menu">
                        <div className="top-navigation__user-menu--buttons">

                          <Dropdown
                            className="myhki-language-chooser myhki-language-chooser"
                            active={helpers.getActiveLanguage(i18n.language)}
                            activeLabel="id"
                            items={LanguageMenuItems}

                            onItemClick={this.onLanguageMenuItemClick}
                          />
                        </div>
                      </div>
                      {type === 'mobile' && getLinks()}
                    </div>
                  </div>
                </div>
              </div>
            </MobileOnlyFocusLock>
            <div inert={this.state.showSearch ? null : 'true'}>

            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['general']),
  connect(
    mainMenuPageSelector,
    {fetchMenuByName},
  ),
)(TopNavigation);
