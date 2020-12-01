import React, {Component} from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import {withRouter} from 'react-router';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import {browserHistory} from 'react-router';
import isExternal from 'is-url-external';

import i18n from '../../root/i18n';

import {MobileOnlyFocusLock} from './MobileOnlyFocusLock';

import {KoroTypes} from '../../constants';

import Koro from '../../koro/Koro';

type TopNavigationSubmenuProps = {
  links: Array,
  backgroundColor: String,
  show: boolean,
  onHide: Function,
  onClose: Function,
  paddingLeft: number,
};

class TopNavigationSubmenu extends Component {
  props: TopNavigationSubmenuProps;

  static contextTypes = {
    router: PropTypes.object,
  };

  static defaultProps = {
    links: [],
    backgroundColor: null,
    show: false,
    onHide: () => {},
    onClose: () => {},
    paddingLeft: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      animateSlide: false,
    };
  }

  handleLinkClick = (event, link) => {
    event.preventDefault();
    if (global.IS_CLIENT) {
      if (isExternal(link.url)) {
        let url = document.createElement('a');
        url.setAttribute('href', link.url);
        // Test is the url internal or external and open external ones in new tab
        if (window.location.url === url.hostname) {
          browserHistory.push(link.url);
        } else {
          window.open(link.url, '_blank');
        }
      } else {
        browserHistory.push(link.url);
      }
    } else {
      browserHistory.push(link.url);
    }
    this.props.onClose();
  };

  render() {
    const {type, paddingLeft} = this.props;
    const isMobile = type === 'mobile';
    return (
      <div
        className={classNames(`top-navigation-submenu top-navigation-submenu-${type}`, {
          'top-navigation-submenu--hidden': !this.props.show,
          'top-navigation-submenu--animate-slide': this.state.animateSlide,
        })}
        role={isMobile ? 'dialog' : null}
      >
        <MobileOnlyFocusLock mobile={isMobile} disabled={!this.props.show}>
          <div className="top-navigation-submenu__mobile-menu-toggle">
            <button
              className="top-navigation-submenu__hide"
              onClick={() => {
                this.props.onHide();
              }}
              aria-label={i18n.t('returnNavMenu')}
            />
            <button
              className="top-navigation-submenu__close"
              onClick={() => {
                this.props.onClose();
              }}
              aria-label={i18n.t('closeNavMenu')}
            />
          </div>
          <div
            className="top-navigation-submenu__wrapper"
            style={{background: this.props.backgroundColor}}
          >
            <div className="top-navigation-submenu__row">
              <div className="column col-sm-12">
                <ul className="top-navigation-submenu__links" style={{paddingLeft: paddingLeft}}>
                  {this.props.links.map((link, i) => {
                    return (
                      <li key={i}>
                        <a
                          className="top-navigation-submenu__link"
                          href={link.url}
                          onClick={event => {
                            this.handleLinkClick(event, link);
                          }}
                        >
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {!!this.props.backgroundColor && (
            <Koro type={KoroTypes.BASIC_WAVE} color={this.props.backgroundColor} />
          )}
        </MobileOnlyFocusLock>
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['general']),
)(TopNavigationSubmenu);

