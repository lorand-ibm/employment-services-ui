// @flow

import React from 'react';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

export type RootProps = {
  store: any,
  children: any,
};

const Root = ({store, children}: RootProps) => (
  <I18nextProvider t={i18n.t} i18n={i18n}>
    <Provider store={store}>{children}</Provider>
  </I18nextProvider>
);

export default Root;
