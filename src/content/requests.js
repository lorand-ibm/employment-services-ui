// @flow

import callApi from '../api/callApi';
import createUrl from '../api/createUrl';

import type {ContentPath} from './types';
import type {BypassCache} from '../types';
import i18n from '../root/i18n';

export const fetchByPathRequest = (path: ContentPath, bypassCache: BypassCache): Generator<> =>
  callApi(new Request(createUrl(`path/${encodeURIComponent(path)}`, {language: i18n.language, bypassCache})));
