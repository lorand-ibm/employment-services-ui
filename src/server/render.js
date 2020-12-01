import React from 'react';
import {match, RouterContext} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import configureStore from '../root/configureStore';
import {getRoutes} from '../root/routes';
import Root from '../root/Root';
import i18n from '../root/i18n';
import renderPage from './renderPage';
import chunks from '../../webpack-chunks.json';
import Q from 'q';
import url from 'url';

import {requireEnv} from './helpers';

const render = async (req, res) => {
  const protocol = requireEnv('PROTOCOL');

  // Is there any better way of doing this? This is a bit hacky way
  // Check getCurrentUrl function in "src/helpers.js".
  global.CURRENT_URL = url.format({
    protocol: protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });

  global.PROTOCOL = `${protocol}:`;
  global.FACEBOOK_APP_ID = requireEnv('FACEBOOK_APP_ID');

  const memoryHistory = createHistory(req.originalUrl);

  const store = await configureStore({
    history: memoryHistory,
    cookieHeader: req.headers.cookie || '',
  });
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = getRoutes(store, i18n);

  const deferred = Q.defer();

  const resolve = () => {
    deferred.resolve();
  };

  let timeout = null;
  let hasReached1 = false;

  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const {numberOfApiCallsOngoing} = state;

    if (numberOfApiCallsOngoing === 0 && hasReached1 && timeout === undefined) {
      timeout = setTimeout(resolve, 5);
    } else if (numberOfApiCallsOngoing > 0) {
      clearTimeout(timeout);
      timeout = undefined;
      hasReached1 = true;
    }
  });

  match({routes, location: req.url, history}, async (err, redirect, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (renderProps) {
      renderPage(
        chunks,
        <Root history={history} store={store}>
          <RouterContext {...renderProps} />
        </Root>,
        store.getState(),
      );
      try {
        await deferred.promise;
        res.status(200).send(
          renderPage(
            chunks,
            <Root history={history} store={store}>
              <RouterContext {...renderProps} />
            </Root>,
            store.getState(),
          ),
        );
      } catch (e) {
        unsubscribe();
        res.status(404).send('Page not found.');
      }
    } else {
      unsubscribe();
      res.status(404).send('Page not found.');
    }
  });
};

export default render;
