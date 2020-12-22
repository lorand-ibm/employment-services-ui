// @flow

/* global FACEBOOK_APP_ID */

/* global PROTOCOL */

import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import has from 'lodash/has';
import {connect} from 'react-redux';
import {Sizes} from '../foundation/enums';
import {revealContext} from '../foundation/reveal';
import i18n from '../root/i18n';
import {withRouter} from 'react-router';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

import {clearError} from '../api/actions';
import {getError} from '../api/selectors';
import ApiErrorModal from '../api/ApiErrorModal';
import Toaster from '../toaster/Toaster';
import TopNavigation from './topNavigation/TopNavigation';
import Footer from './footer/Footer';
import * as helpers from '../helpers';
import {fetchUser} from '../auth/actions';

import type {ApiError} from '../api/types';
import type {RootState} from '../root/types';

import LoginModal from '../auth/LoginModal';
import NewListModal from '../myHelsinki/NewListModal';
import FeedbackModal from '../feedback/FeedbackModal';
import Notifications from '../notification/Notifications';
import Koro from '../koro/Koro';

import shareImagePlaceholder from '../../assets/images/share-placeholder.png';

type Props = {
  apiError: ApiError,
  closeReveal: Function,
  clearError: typeof clearError,
  children: any,
  params: Object,
  route: Object,
  router: any,
  location: Object,
  fetchUser: typeof fetchUser,
  t: Function,
};

const shouldShowLoginModal = location => {
  return has(location, 'query.login');
};

class App extends Component {
  props: Props;

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchUser();

    const {
      params: {language},
    } = this.props;

    helpers.setMomentLanguage(language);

    if (language !== i18n.language) {
      helpers.setActiveLanguage(language);
    }
  }

  handleDismissErrorModal = () => {
    this.props.closeReveal('apiError');
    this.props.clearError();
  };

  onLoginModalClose = () => {
    helpers.hideLoginModal();
  };

  render() {
    const {apiError, children, location, t} = this.props;
    const showLoginModal = shouldShowLoginModal(location);

    // $FlowFixMe
    const fbAppId = FACEBOOK_APP_ID;
    // $FlowFixMe
    const protocol = PROTOCOL;

    const image =
      shareImagePlaceholder.search('http:') !== 0 && shareImagePlaceholder.search('https:') !== 0
        ? `${protocol}:${shareImagePlaceholder}`
        : shareImagePlaceholder;
    const description = t('description');

    return (
      <div
        className={classNames('app', {
          'app--modal-open': showLoginModal,
        })}
      >
        <Helmet htmlAttributes={{lang: i18n.language}}>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content={helpers.getCurrentUrl(location)} />
          <meta property="fb:app_id" content={fbAppId} />
          <meta property="og:image" content={image} />
          {protocol === 'http' && <meta property="og:image:url" content={image} />}
          {protocol === 'https' && <meta property="og:image:secure_url" content={image} />}
          {!!description && <meta property="og:description" content={description} />}
          {!!description && <meta name="twitter:description" content={description} />}
          {!!description && <meta name="description" content={description} />}
          <meta property="og:image:width" content="1980" />
          <meta property="og:image:height" content="900" />
        </Helmet>
        <TopNavigation />
        <main className="app__content">
          {children}
        </main>
        <div>
          <Koro className={'myhki-koro-footer'} color={'#0E00BF'} flip/>
        </div>
        <Footer />
        <Toaster />
        <ApiErrorModal
          size={Sizes.LARGE}
          data={apiError}
          isOpen={Boolean(apiError)}
          handleDismiss={this.handleDismissErrorModal}
        />
        <NewListModal
          isOpen={has(this.props.location, 'query.createList')}
          close={() => this.props.router.push({...this.props.location, query: {}})}
        />
        <FeedbackModal
          isOpen={has(this.props.location, 'query.sendFeedback')}
          close={() => this.props.router.push({...this.props.location, query: {}})}
        />
        {showLoginModal && <LoginModal onClose={this.onLoginModalClose} />}
        <Notifications />
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['common']),
  connect(
    (state: RootState) => ({
      apiError: getError(state),
    }),
    {clearError, fetchUser},
  ),
  revealContext(),
)(App);
