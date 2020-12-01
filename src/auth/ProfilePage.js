// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import i18n from '../root/i18n';
import {Row, Column, Link} from 'react-foundation';
import {translate} from 'react-i18next';
import has from 'lodash/has';
import {Helmet} from 'react-helmet';

import * as helpers from '../helpers';
import * as authHelpers from './helpers';
import {getUser} from './selectors';
import type {RootState} from '../root/types';
import type {User} from '../auth/types';
import Koro from '../koro/Koro';
import {Colors} from '../constants';
import EditProfileModal from './EditProfileModal';

type Props = {
  t: Function,
  user: User,
  i18n: Object,
  router: Object,
  location: Object,
};

class ProfilePage extends Component {
  props: Props;

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    if (global.IS_CLIENT) {
      i18n.on('languageChanged', this.onLanguageChange);
    }
  }

  onLanguageChange = language => {
    this.context.router.push(`/${language}/user`);
  };

  componentDidMount() {
    const {t, user} = this.props;

    if (user) {
      helpers.setPageTitle(user.displayName);
    } else {
      helpers.setPageTitle(t('profilePageTitle'));
      helpers.showLoginModal();
    }
  }

  onEditClick = () => {
    const {location, router} = this.props;

    router.push({
      ...location,
      query: {
        ...location.query,
        edit: null,
      },
    });
  };

  getPageTitle(): string {
    const {t, user} = this.props;

    if (user) {
      return helpers.composePageTitle(user.displayName);
    } else {
      return helpers.composePageTitle(t('profilePageTitle'));
    }
  }

  render() {
    const {
      t,
      user,
      location,
      i18n: {language},
    } = this.props;

    if (!user) {
      return null;
    }

    const profilePicture = authHelpers.getUserProfilePicture(user);

    return (
      <div className={classNames('auth-profile-page')}>
        <Helmet>
          <title>{this.getPageTitle()}</title>
          <meta property="og:title" content={this.getPageTitle()} />
        </Helmet>
        <Row>
          <Column>
            <div className="auth-profile-page__header">
              <h1 className="auth-profile-page__title">{user.displayName}</h1>
              <div className="auth-profile-page__profile-picture">
                {!!profilePicture && <img src={profilePicture} />}
              </div>
            </div>
          </Column>
        </Row>
        <Koro color={Colors.HEL_FOG} flip />
        <div className="auth-profile-page__content">
          <Row>
            <Column>
              <div className="auth-profile-page__content-wrapper">
                <h3>{t('basicSettingsHeader')}</h3>

                <div className="auth-profile-page__field auth-profile-page__field--name">
                  <div className="auth-profile-page__field-label">{t('fieldNameLabel')}</div>
                  <div className="auth-profile-page__field-value">
                    {authHelpers.getUserName(user)}
                  </div>
                  <a
                    className="auth-profile-page__field auth-profile-page__field-edit-link"
                    onClick={this.onEditClick}
                  >
                    {t('edit')}
                  </a>
                </div>
                <div className="auth-profile-page__field auth-profile-page__field--email">
                  <div className="auth-profile-page__field-label">{t('fieldEmailLabel')}</div>
                  <div className="auth-profile-page__field-value">
                    {authHelpers.getUserEmail(user)}
                  </div>
                </div>
              </div>
            </Column>
          </Row>
        </div>
        <Row>
          <Column>
            <div className="auth-profile-page__logout">
              <Link
                className="auth-profile-page__logout-button"
                href={`/${language}/logout`}
                isHollow
              >
                {t('logoutButtonLabel')}
              </Link>
            </div>
          </Column>
        </Row>
        <EditProfileModal
          isOpen={has(location, 'query.edit')}
          user={user}
          close={() => this.props.router.push({...this.props.location, query: {}})}
        />
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  connect((state: RootState) => ({
    user: getUser(state),
  })),
  translate(['profile', 'common']),
)(ProfilePage);
