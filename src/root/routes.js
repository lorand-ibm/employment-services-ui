// @flow

import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import get from 'lodash/get';

import ErrorPage from '../errorPage/ErrorPage';
import ContentPage from '../content/ContentPage';
import SearchPage from '../search/SearchPage';
import ProfilePage from '../auth/ProfilePage';
import SustainabilityFeedbackPage from '../sustainabilityFeedback/SustainabilityFeedbackPage';
import App from '../app/App';
import {addMessage, removeMessage} from '../toaster/actions';
import {logout} from '../auth/actions';

import * as authHelpers from '../auth/helpers';
import {getLanguagecodeFromUrl, isAllowedLanguage, setMomentLanguage} from '../helpers';

export const getRoutes = (store: Object, i18n: Object) => {
  // eslint-disable-line
  const showToaster = (message: string) => {
    const action = store.dispatch(addMessage(message)),
      id = action.payload.id;

    setTimeout(() => {
      store.dispatch(removeMessage(id));
    }, 2000);
  };

  const normalizeUri = uri => encodeURI(decodeURI(uri));

  const forceNormalizedUri = (nextState, replace) => {
    const {
      location: {pathname, query},
    } = nextState;
    const normalized = normalizeUri(pathname);

    if (pathname !== normalized) {
      replace({pathname: normalized, query});
      //console.log('Forcing normalized URL address. Redirecting from %s to: %s', pathname, normalized);
    }
  };

  const onChange = (prevState, nextState, replace, callback) => {
    const {location: prevLocation} = prevState,
      {location: nextLocation} = nextState,
      {language} = i18n,
      langcode = getLanguagecodeFromUrl(nextLocation.pathname);

    forceNormalizedUri(nextState, replace);

    const prevPathName = normalizeUri(prevLocation.pathname);
    const nextPathName = normalizeUri(nextLocation.pathname);

    if (prevPathName !== nextPathName) {
      console.log(
        'Pathname changed from %s to %s. Resetting scroll position.',
        prevPathName,
        nextPathName,
      );
      if (langcode !== language) {
        if (isAllowedLanguage(langcode)) {
          console.log('Language changed from %s to %s.', language, langcode);
          // Set language without i18next callback function to avoid unwanted routing
          i18n.language = langcode;
          setMomentLanguage(i18n.language);
        }
      }

      const focusNode = document.getElementById("root");
      if (focusNode) {
        focusNode.setAttribute('tabindex', '-1');
      	focusNode.style.outline = 'none';
        focusNode.focus();
        // On blur, remove tabindex, just to avoid capturing focus again
        focusNode.addEventListener('blur', function removeTabIndex() {
          focusNode.removeAttribute('tabindex');
          focusNode.removeEventListener('blur', removeTabIndex);
        });
      }

      window.scrollTo(0, 0);

      // Some pages need body element to be scrolled top as well as window
      document.body.scrollTop = 0;
    }

    callback();
  };

  return (
    <Route path="/" component={App} onChange={onChange} onEnter={forceNormalizedUri}>
      <IndexRoute
        onEnter={(nextState, replace) => {
          replace(`/${i18n.language}`);
        }}
      />

      {/* Remove these after node server supports language codes for these urls. */}
      <Redirect path="login/success" to="/en/login/success" />
      <Redirect path="login/failed" to="/en/login/failed" />
      <Redirect path="login/loggedOut" to="/en" />

      <Route
        path="externalRedirect"
        onEnter={nextState => {
          if (global.IS_CLIENT) {
            window.location.href = get(nextState, 'location.query.redirectUrl');
          }
        }}
      />

      <Route path="/:language">
        <IndexRoute
          component={props => {
            //Return Error page when the path not avaleble
            const pathName = props.location.pathname.toLowerCase();
            const pathLanguage = [
              '/en',
              '/fi',
              '/sv',
              '/de',
              '/ja',
              '/ru',
              '/en/',
              '/fi/',
              '/sv/',
              '/de/',
              '/ja/',
              '/ru/',
            ];
            if (pathName.length > 1 && !pathLanguage.includes(pathName)) {
              return <ErrorPage />;
            }
            return <ContentPage {...props} path={`/${i18n.language}/<front>`} />;
          }}
        />

        {/* These feedback pages works for all languages and the routes are hard coded.
            Could be a good idea to generalize more in the future.*/}
        <Route path={'think-sustainably/feedback'} component={SustainabilityFeedbackPage} />
        <Route path={'valitse-vastuullisemmin/palaute'} component={SustainabilityFeedbackPage} />

        <Route
          path="logout"
          onEnter={(nextState, replace, callback) => {
            if (global.IS_CLIENT) {
              window.location.replace(authHelpers.getAuthUrl('logout'));
            }
            callback();
          }}
        />
        <Route path="login">
          <IndexRoute component={ErrorPage} />
          <Route
            path="success"
            onEnter={(nextState, replace, callback) => {
              const returnUrl = get(nextState, 'location.query.returnUrl'),
                {language} = i18n;

              replace(returnUrl ? returnUrl : `/${language}`);
              callback();
              if (global.IS_CLIENT) {
                showToaster(i18n.t('login:toasterLoginSuccessful'));
              }
            }}
          />
          <Route
            path="failed"
            onEnter={(nextState, replace, callback) => {
              replace(`/${i18n.language}/login?failed`);
              callback();
              if (global.IS_CLIENT) {
                showToaster(i18n.t('login:toasterLoginFailed'));
              }
            }}
          />
          <Route
            path="loggedOut"
            onEnter={(nextState, replace, callback) => {
              replace(`/${i18n.language}`); // Should this have a redirect url support?
              callback();
              if (global.IS_CLIENT) {
                showToaster(i18n.t('login:toasterLoggedOut'));
              }
              store.dispatch(logout());
            }}
          />
          <Route
            path="facebook"
            onEnter={(nextState, replace, callback) => {
              if (global.IS_CLIENT) {
                window.location.replace(
                  authHelpers.getAuthUrl('facebook', get(nextState, 'location.query.returnUrl')),
                );
              }
              callback();
            }}
          />
          <Route
            path="google"
            onEnter={(nextState, replace, callback) => {
              if (global.IS_CLIENT) {
                window.location.replace(
                  authHelpers.getAuthUrl('google', get(nextState, 'location.query.returnUrl')),
                );
              }
              callback();
            }}
          />
          <Route
            path="helsinki"
            onEnter={(nextState, replace, callback) => {
              if (global.IS_CLIENT) {
                window.location.replace(
                  authHelpers.getAuthUrl('helsinki', get(nextState, 'location.query.returnUrl')),
                );
              }
              callback();
            }}
          />
          <Route path="*" component={ErrorPage} />
        </Route>
        <Route path="user" component={ProfilePage} />
        <Route path="search" component={SearchPage} />
        <Route path="*" component={ContentPage} />
      </Route>
      <Route path="*" component={ErrorPage} />
    </Route>
  );
};
