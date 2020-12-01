// @flow
import express from 'express';
import passport from 'passport';
import {requireEnv, getAxiosBaseClient} from './helpers';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as HelsinkiStrategy} from 'passport-helsinki';

import {debug} from './logger';
import get from 'lodash/get';

/*
 * The authentication flow goes roughly as follows:
 *  - User clicks a link to log in via e.g. Facebook
 *  - Frontend saves their current location, and redirects user to `/auth/${provider}`
 *  - The /auth/provider -handler starts the login flow, redirecting user to the provider's site
 *  - The user returns to the /auth/provider/callback, which uses the passport authentication flow to determine success.
 *  - During the callback the onProviderLogin -callback is run, to additionally log in to Drupal backend and pass
 *    extra data to the request handler.
 *  - User is redirected back to a common entry point in the frontend which then can determine where they should go
 */

// These endpoints will be caught by the frontend
const loginFailed = '/login/failed';
const loginSuccess = '/login/success';
const loggedOut = '/login/loggedOut';

export const auth = express.Router();

// https://developers.facebook.com/docs/facebook-login/permissions
const facebookScope = ['public_profile', 'email'];

// https://developers.google.com/identity/protocols/googlescopes
const googleScope = ['profile', 'email'];

// https://dev.hel.fi
const helsinkiScope = ['read'];

const profileFields = ['id', 'emails', 'name', 'displayName', 'picture.type(large)'];

/*
 * Generic methods
 */

/**
 * Set up the strategies to passport after the app has initialized (dotenv needs to be run)
 */
export function setup() {
  const server = requireEnv('SERVER_ADDRESS');
  const fbConfig = {
    clientID: requireEnv('FACEBOOK_APP_ID'),
    clientSecret: requireEnv('FACEBOOK_APP_SECRET'),
    callbackURL: `${server}/auth/facebook/callback`,
    profileFields: profileFields,
  };

  const googleConfig = {
    clientID: requireEnv('GOOGLE_OAUTH_CLIENT_ID'),
    clientSecret: requireEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
    callbackURL: `${server}/auth/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    profileFields: profileFields,
  };

  const helsinkiConfig = {
    clientID: requireEnv('HELSINKI_OAUTH2_CLIENT_ID'),
    clientSecret: requireEnv('HELSINKI_OAUTH2_CLIENT_SECRET'),
    callbackURL: `${server}/auth/helsinki/callback`,
    profileFields: profileFields,
  };

  passport.use(new FacebookStrategy(fbConfig, onFacebookLogin));
  passport.use(new GoogleStrategy(googleConfig, onGoogleLogin));
  passport.use(new HelsinkiStrategy(helsinkiConfig, onHelsinkiLogin));
}

/**
 * Get an active CSRF token
 * @returns {Promise.<void>}
 */
let getCSRFToken = (function() {
  let cachedCSRFToken = undefined; // eslint-disable-line
  let cachedTokenExpires = 0; // eslint-disable-line
  let cacheTimeout = 10 * 60 * 1000; // 10 minutes

  return async function getCSRFToken() {
    /*if (cachedCSRFToken && cachedTokenExpires > Date.now()) {
      debug(`Using cached CSRF token ${cachedCSRFToken}`);
      return cachedCSRFToken;
    }*/

    const request = getAxiosBaseClient();

    const result = await request.post('/rest/session/token', {});
    const token = result.data;
    debug(`Got CSRF token ${token}`);

    cachedCSRFToken = token;
    cachedTokenExpires = Date.now() + cacheTimeout;

    return token;
  };
})();

/**
 * Generates a "state" parameter for the authentication flows
 * @param req
 */
function getAuthState(req, res) {
  const frontend = requireEnv('FRONTEND_URL');
  let state = {
    langcode: '',
    returnUrl: `${frontend}${loginSuccess}`,
  };

  if (req.query.returnUrl) {
    state.returnUrl = req.query.returnUrl;
  }

  if (req.query.langcode) {
    state.langcode = req.query.langcode;
  } else {
    debug('Cannot process login without langcode argument.');
    res.redirect(`${frontend}${loginFailed}`);
    return undefined;
  }

  const stateText = JSON.stringify(state);
  console.log(`Request state: ${stateText}`);
  return encodeURIComponent(stateText);
}

/**
 * Parses the given state and returns it in usable format (in case it will be encoded in the future)
 * @param {string} state
 * @returns {*}
 */
function extractState(stateText) {
  const state: {langcode: string, returnUrl: string} = JSON.parse(decodeURIComponent(stateText));
  return state;
}

/**
 * Generic method for all login flows where we handle logging in to the Drupal app
 *
 * @param {string} provider Name of the provider, e.g. "facebook"
 * @param {string} username Identifier for the user with the provider: email, id, etc.
 * @returns {Promise.<*>}
 */
async function handleDrupalLogin(provider, profile) {
  const drupal = requireEnv('DRUPAL_URL');
  const request = getAxiosBaseClient();

  let ret: {err: ?string, user: ?Object, info: Object} = {
    err: null,
    user: null,
    info: {
      cookie: undefined,
      drupal: {},
      profile: profile,
    },
  };

  try {
    const csrfToken = await getCSRFToken();
    debug(`${drupal}/restful_authentication`);
    const result = await request.post(
      '/restful_authentication',
      {
        provider: provider,
        username: profile.id,
        displayName: profile.displayName,
        emails: profile.emails || [],
        photos: profile.photos || [],
        secret: requireEnv('DRUPAL_AUTH_SECRET'),
      },
      {
        params: {
          _format: 'json',
        },
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
        },
      },
    );

    if ([200, 201].indexOf(result.status) !== -1) {
      debug(`Logged in ${provider} user ${profile.id} to Drupal`);
      debug('Drupal gave us this user information:', result.data);
      ret.info.cookie = result.headers['set-cookie'];
      ret.info.drupal = result.data;
      ret.user = {
        provider: provider,
        userId: profile.id,
      };
    } else {
      debug(
        `Failed to log in ${provider} user ${profile.id} to Drupal: ${result.status} ${
          result.statusText
        }`,
      );
      debug(result.data);
      ret.err = 'Login failed due to internal error. Please contact support if issue persist.';
    }
  } catch (e) {
    debug(
      `Exception while logging in ${provider} user ${profile.id} to Drupal: ${e.message} ${
        e.statusText
      }`,
    );
    console.error(e);
    ret.err = 'Login failed due to internal error. Please contact support if issue persist.';
  }

  return ret;
}

/**
 * Called at the end of the login-chain with all the data from on*Login
 */
function finishLogin(req, res) {
  return function(err, user, info) {
    debug('Finishing login', err, user, info);
    const frontend = requireEnv('FRONTEND_URL');
    if (err) {
      return res.redirect(`${frontend}${loginFailed}`);
    }
    if (!user) {
      res.status(401);
      return res.send({
        message: 'Login failed.',
      });
    }

    const cookieDomain = requireEnv('COOKIE_DOMAIN');
    let limitedData: Object = {
      displayName: info.drupal.name,
      uid: info.drupal.uid,
      roles: info.drupal.roles,
      provider: info.profile.provider,
    };

    if (info.profile.photos) {
      limitedData.photos = info.profile.photos;
    }

    if (info.drupal.email) {
      limitedData.email = info.drupal.email;
    }

    const userData = encodeURIComponent(JSON.stringify(limitedData));
    const userCookie = `MYHKI_USER=${userData}; Max-Age=2000000; path=/; domain=${cookieDomain};`;

    let cookies = info.cookie;
    cookies.push(userCookie);
    res.set('Set-Cookie', cookies);

    let redirectUrl = `${frontend}${loginSuccess}`;
    if (req.query.state) {
      const state = extractState(req.query.state);
      redirectUrl = `${frontend}/${state.langcode}${loginSuccess}`;
      redirectUrl += `?returnUrl=${encodeURIComponent(state.returnUrl)}`;
    }
    return res.redirect(redirectUrl);
  };
}

auth.get('/logout', function(req, res) {
  const frontend = requireEnv('FRONTEND_URL');

  req.logout();
  for (let key in req.cookies) {
    res.clearCookie(key, {path: '/', domain: requireEnv('COOKIE_DOMAIN')});
  }

  let redirectUrl = `${frontend}${loggedOut}`;
  const langcode = get(req, 'query.langcode');

  if (langcode) {
    redirectUrl = `${frontend}/${langcode}${loggedOut}`;
  }

  res.redirect(redirectUrl);
});

auth.get('/facebook', function(req, res) {
  const state = getAuthState(req, res);
  if (state) {
    return passport.authenticate('facebook', {
      scope: facebookScope,
      state: state,
    })(req, res);
  }
});
auth.get('/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', finishLogin(req, res, next))(req, res, next);
});

function onFacebookLogin(accessToken, refreshToken, profile, cb) {
  const server = requireEnv('SERVER_ADDRESS');
  debug(`Facebook login for user ${profile.id}`, profile);
  const redirectURL = encodeURIComponent(`${server}/auth/facebook/callback`);
  debug(
    `Logout URL: https://www.facebook.com/logout.php?next=${redirectURL}&access_token=${accessToken}`,
  );

  handleDrupalLogin('facebook', profile).then(function(res) {
    cb(res.err, res.user, res.info);
  });
}

auth.get('/google', function(req, res) {
  const state = getAuthState(req, res);
  if (state) {
    return passport.authenticate('google', {
      scope: googleScope,
      state: state,
    })(req, res);
  }
});
auth.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', finishLogin(req, res, next))(req, res, next);
});

function onGoogleLogin(accessToken, refreshToken, profile, cb) {
  debug(`Google login for user ${profile.id}`);
  handleDrupalLogin('google', profile).then(function(res) {
    cb(res.err, res.user, res.info);
  });
}

auth.get('/helsinki', function(req, res) {
  const state = getAuthState(req, res);
  if (state) {
    return passport.authenticate('helsinki', {
      scope: helsinkiScope,
      state: state,
    })(req, res);
  }
});
auth.get('/helsinki/callback', function(req, res, next) {
  passport.authenticate('helsinki', finishLogin(req, res, next))(req, res, next);
});

function onHelsinkiLogin(accessToken, refreshToken, profile, cb) {
  debug(`Helsinki login for user ${profile.id}`, profile);
  handleDrupalLogin('helsinki', profile).then(function(res) {
    cb(res.err, res.user, res.info);
  });
}
