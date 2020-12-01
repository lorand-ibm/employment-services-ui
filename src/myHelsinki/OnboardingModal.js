import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import has from 'lodash/has';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {translate} from 'react-i18next';
import {Column, Row, Button} from 'react-foundation';
import {getIsAuthenticated} from '../auth/selectors';
import FocusLock from 'react-focus-lock';

import Koro from '../koro/Koro';

import animation from '../../assets/images/onboarding.gif';

const emptyFn = () => {};

type Props = {
  router: any,
  location: any,
  onClose: Function,
  isAuthenticated: boolean,
  t: Function,
};

class OnboardingModal extends Component {
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

  onLoginButtonClick = () => {
    const {location} = this.props,
      queryParam = has(location.query, 'addToList')
        ? `addToList=${location.query.addToList}`
        : 'chooseList';

    this.close();
    this.props.router.push({
      ...this.props.location,
      query: {
        login: '',
        returnUrl: encodeURIComponent(`${location.pathname}?${queryParam}`),
      },
    });
  };

  render() {
    const {t} = this.props;

    return (
      <FocusLock returnFocus={true}>
        <div className={classNames('my-helsinki-onboarding-modal')}>
          <button
            className="my-helsinki-onboarding-modal__close"
            onClick={this.close}
            aria-label={t('common:close')}
          />
          <div className="my-helsinki-onboarding-modal__header">
            <img className="my-helsinki-onboarding-modal__header-animation" src={animation} />
            <Koro color="#ffffff" flip />
          </div>
          <div className="my-helsinki-onboarding-modal__wrapper">
            <Row>
              <Column large={8} offsetOnLarge={2}>
                <h1 className="my-helsinki-onboarding-modal__title">{t('title')}</h1>
                <p className="my-helsinki-onboarding-modal__description">{t('description')}</p>
                <div className="my-helsinki-onboarding-modal__buttons">
                  {this.props.isAuthenticated && (
                    <Button
                      isHollow
                      onClick={() => {
                        this.close();
                        this.props.router.push({...this.props.location, query: {createList: ''}});
                      }}
                    >
                      {t('getStartedButtonText')}
                    </Button>
                  )}
                  {!this.props.isAuthenticated && (
                    <Button isHollow onClick={this.onLoginButtonClick}>
                      {t('loginButtonText')}
                    </Button>
                  )}
                </div>
              </Column>
            </Row>
          </div>
        </div>
      </FocusLock>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default flowRight(
  connect(mapStateToProps),
  withRouter,
  translate(['myHelsinkiOnboarding']),
)(OnboardingModal);
