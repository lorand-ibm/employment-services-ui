// @flow

import i18n from '../root/i18n';

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';

import type {ViewName} from './types';
import type {BypassCache} from '../types';

export const fetchByNameRequest = (name: ViewName, lang: String, bypassCache: BypassCache): Generator<> =>
  callApi(new Request(createUrl(`view/${encodeURIComponent(name)}`, {language: lang, bypassCache})));
