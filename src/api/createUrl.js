// @flow

/* global API_URL */

const stringifyQuery = (query: {[key: string]: any}) =>
  Object.keys(query)
    .map(key => [key, query[key]].map(v => encodeURIComponent(v)).join('='))
    .join('&');

export default (url: string, params?: Object) =>
  // $FlowFixMe
  `${global.IS_CLIENT ? API_URL : `http:${API_URL}`}/${url}${
    params ? `?${stringifyQuery(params)}` : ''
  }`;
