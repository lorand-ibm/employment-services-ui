/* global SERVER_ADDRESS */

import i18n from '../root/i18n';
import get from 'lodash/get';
import has from 'lodash/has';

import type {User} from './types';

export const getAuthUrl = (provider: string, returnUrl?: string) => {
  const {language} = i18n,
    ret = returnUrl ? `&returnUrl=${encodeURIComponent(returnUrl)}` : '';
  return `${SERVER_ADDRESS}/auth/${provider}?langcode=${language}${ret}`;
};

export const getReturnUrl = location => {
  return has(location, 'query.returnUrl') ? get(location, 'query.returnUrl') : location.pathname;
};

export const getUserProvider = (user: User) => {
  return get(user, 'provider');
};

/**
 * @param user
 * @returns {*}
 */
export const getUserProfilePicture = (user: User) => {
  const photoUrl = String(get(user, 'photos[0].value'));
  const provider = getUserProvider(user);

  switch (provider) {
    case 'google':
      // Remove query parameters and to be more exact this one "sz=50",
      // so that we don't get 50px * 50px images.
      return photoUrl.split('?')[0];
  }

  return photoUrl;
};

/**
 * @param user
 * @returns {*}
 */
export const getUserName = (user: User) => {
  return get(user, 'displayName');
};

/**
 * @param user
 * @returns {*}
 */
export const getUserEmail = (user: User) => {
  return get(user, 'email');
};
