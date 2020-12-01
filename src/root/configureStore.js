// @flow

import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware as createRouterMiddleware} from 'react-router-redux';

import createRootReducer from './createRootReducer';
import createSagaMiddleware from 'redux-saga';
import createRootSaga from './createRootSaga';

export type Options = {
  history: any,
  initialState?: any,
  cookieheader?: string,
};

export default (options: Options) =>
  new Promise(resolve => {
    const rootReducer = createRootReducer();
    const rootSaga = createRootSaga();
    const routerMiddleware = createRouterMiddleware(options.history);
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
      rootReducer,
      options.initialState,
      compose(
        applyMiddleware(sagaMiddleware, routerMiddleware),
        global.IS_CLIENT && window.devToolsExtension ? window.devToolsExtension() : f => f,
      ),
    );

    sagaMiddleware.run(rootSaga, options);

    if (module.hot) {
      // $FlowFixMe
      module.hot.accept('./createRootReducer', () => {
        const nextRootReducer = require('./createRootReducer').default();
        store.replaceReducer(nextRootReducer);
      });
    }

    resolve(store);
  });
