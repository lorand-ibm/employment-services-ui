import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import capitalize from 'lodash/capitalize';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Row, Column} from 'react-foundation';
import {performLogin} from './actions';
import {getIsAuthenticated} from './selectors';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import FocusLock from 'react-focus-lock';

import i18n from '../root/i18n';

import * as authHelpers from './helpers';

const emptyFn = () => {};

type Props = {
  router: any,
  isAuthenticated: boolean,
  performLogin: typeof performLogin,
  t: Function,
  onClose: Function,
  location: Object,
};

class LoginModal extends Component {
  props: Props;

  static defaultProps = {
    onClose: emptyFn,
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('keydown', this.onDocumentKeyPress);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('keydown', this.onDocumentKeyPress);
    }
  }

  onDocumentKeyPress = event => {
    // Escape
    if (event.keyCode === 27) {
      this.close();
    }
  };

  close = () => {
    this.props.onClose();
  };

  render() {
    const {t, location} = this.props,
      {language} = i18n,
      providers = ['facebook', 'google', 'helsinki'];

    return (
      <FocusLock returnFocus={true}>
        <div className="auth-login-modal">
          <div className="auth-login-modal__wrapper">
            <button className="auth-login-modal__close" onClick={this.close} aria-label={t('common:close')}/>
            <Row>
              <Column large={6} offsetOnLarge={3}>
                <h1 className="auth-login-modal__title">{t('title')}</h1>
                <div className="auth-login-modal__content">
                  <p className="auth-login-modal__description">{t('description')}</p>
                  <ul className="auth-login-modal__providers">
                    {providers.map(provider => {
                      const returnUrl = authHelpers.getReturnUrl(location),
                        url = `/${language}/login/${provider}?returnUrl=${returnUrl}`;
                      return (
                        <li key={provider}>
                          <a
                            href={url}
                            className={classNames(
                              'auth-login-modal__provider',
                              `auth-login-modal__provider--${provider}`,
                            )}
                          >
                            {t(`providerLabel${capitalize(provider)}`)}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Column>
            </Row>
          </div>
        </div>
      </FocusLock>
    );
  }
}

export default flowRight(
  connect(
    state => ({
      isAuthenticated: getIsAuthenticated(state),
    }),
    {
      performLogin,
    },
  ),
  translate(['login']),
  withRouter,
)(LoginModal);
