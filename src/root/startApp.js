// @flow
import React from 'react';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './configureStore';
// import {registerPageView} from '../tag-manager';
import renderApp from './renderApp';
import i18n from './i18n';
import {getRoutes} from './routes';
import Root from './Root';

export default async () => {
  const initialState = global.IS_CLIENT ? window.__INITIAL_STATE__ : {};

  const store = await configureStore({
    history: browserHistory,
    initialState: initialState,
  });

  const history = syncHistoryWithStore(browserHistory, store);

  const onRouterUpdate = () => {
    if (global.IS_CLIENT) {
      // We're missing each & every landing page like this...
      // registerPageView(document.title, window.location.pathname + window.location.search);
    }
  };

  const rootProps = {
    store,
    children: (
      <Router
        onUpdate={onRouterUpdate}
        history={history}
        routes={getRoutes(store, i18n)}
        key={Math.random()}
      />
    ),
  };

  renderApp(Root, rootProps);

  if (module.hot) {
    // $FlowFixMe
    module.hot.accept('./Root', () => {
      const nextRoot = require('./Root').default;
      renderApp(nextRoot, rootProps);
    });
  }

  if (process.env.NODE_ENV === 'production') {
    require('./enableOfflineMode');
  }
};
