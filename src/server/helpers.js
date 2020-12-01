import axios from 'axios';
import cachios from 'cachios';
import https from 'https';
import get from 'lodash/get';
import has from 'lodash/get';
import dotenv from 'dotenv';
import forEach from 'lodash/forEach';
import {debug} from './logger';
import {cacheAdapterEnhancer} from 'axios-extensions';
import LRUCache from 'lru-cache';

dotenv.config();

const twitterURL = 'https://publish.twitter.com';

const sosMedAxios = axios.create({});
const sosMedRequest = cachios.create(sosMedAxios, {
  stdTTL: 12 * 60 * 60,
});

export function requireEnv(key) {
  let value = process.env[key];
  if (!value) {
    throw new Error(`Environment is missing ${key}.`);
  }
  return value;
}

export function isDebug() {
  let value = requireEnv('DEBUG');
  return value === 'true';
}

export function skipSSL() {
  if (isDebug()) {
    return true;
  }

  let value = requireEnv('SKIP_SSL');
  return value === 'true';
}

export function cookiePassthrough(req, client) {
  const cookie = req.headers['cookie'];
  if (cookie) {
    debug(`Passing through cookie header: ${cookie}`);
    client.defaults.headers['Cookie'] = cookie;
  }

  return client;
}

export function getAxiosBaseClient() {
  let client;
  const baseURL = requireEnv('DRUPAL_URL');
  if (skipSSL()) {
    client = axios.create({
      baseURL: baseURL,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  } else {
    client = axios.create({
      baseURL: baseURL,
    });
  }

  return client;
}

/**
 * Get an axios client which caches responses.
 *
 * Responses are saved for 15 hours which practically means that when content
 * editor makes some changes in the afternoon, those changes will be visible
 * next morning.
 *
 * The amount of items in the cache is limited to 10,000. The vast majority of
 * our API responses are in the range of 25-100 KB so 10,000 items would consume
 * about 250-1000 MB of memory.
 *
 * The item count will probably never reach 10,000 items though because items
 * will be removed when they become stale (in 15 hours).
 *
 * @returns {AxiosInstance}
 */
export function getCachedAxiosClient() {
  const maxItems = 9500;
  const maxAge = 1000 * 60 * 60 * 15; // 15 hours

  const defaultCache = new LRUCache({maxAge, max: maxItems});
  const cachedAxios = axios.create({
    baseURL: requireEnv('DRUPAL_URL'),
    headers: {'Cache-Control': 'no-cache'},
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, {defaultCache}),
  });

  // Remove stale items from the cache once per 30 minutes.
  const pruneInterval = 1000 * 60 * 30; // 30 minutes
  setInterval(() => {
    console.log(`Axios cache adapter is pruning invalid items`);
    console.log(`Axios cache adapter itemCount before pruning: ${defaultCache.itemCount}`);
    defaultCache.prune();
    console.log(`Axios cache adapter itemCount after pruning: ${defaultCache.itemCount}`);
  }, pruneInterval);

  return cachedAxios;
}

/**
 * Get "bypass cache" status by checking a query object.
 *
 * @param {object} query
 * @returns {boolean}
 *
 * @todo Use a constant for setting the query parameter and for reading it here.
 */
export function getCacheIsBypassed(query) {
  return (has(query, 'bypassCache') && query.bypassCache === 'true');
}

/**
 * Get language value from a query object. Fallback to 'fi'.
 *
 * @param {object} query
 * @returns {string}
 */
export function getLanguage(query) {
  return has(query, 'language') ? query.language : 'fi';
}

/**
 * Get "disable cache" status based on a path.
 *
 * We want to disable caching for these resources:
 *
 * - MyHelsinki list pages: Users can edit their lists and they expect to see
 *   those changes when they return to the list page. Drupal's caching is going
 *   to have to sufficient for these pages for now.
 *
 * @param {string} path
 * @returns {boolean}
 *
 * @todo Enable caching for MyHelsinki-lists and update the cache after user
 *   has edited a list.
 */
export function getCacheIsDisabled(path) {
  let disableCache = false;
  const regex_myhelsinki_list = '^/[a-z]{2}/my-helsinki/.*$'; // eg. /en/my-myhelsinki/some-list
  if (path.match(regex_myhelsinki_list)) {
    disableCache = true;
  }
  return disableCache;
}

export async function getTwitterQuoteData(fieldData) {
  const twitterQuoteData = {};
  const url = get(fieldData, 'field_url[0].uri');
  const response = await sosMedRequest.get(`${twitterURL}/oembed?url=${url}&omit_script=true`);
  twitterQuoteData.tweets = await get(response, 'data');

  return twitterQuoteData;
}

// @todo These functions are currently obsolete. See todo-comment in api.js
//   about external redirects.
/*
export function getLastUrlFromResponse(response) {
  return get(response, 'request.res.responseUrl');
}
export function isCmsUrl(url) {
  const drupalUrl = requireEnv('DRUPAL_URL');
  return url.startsWith(drupalUrl);
}
*/
