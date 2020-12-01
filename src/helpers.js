import {Languages, LanguageMenuItems, Orientations} from './constants';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import {browserHistory} from 'react-router';
import 'moment/locale/en-gb';
import 'moment/locale/sv';
import 'moment/locale/fi';
import 'moment/locale/de';
import 'moment/locale/ja';
import 'moment/locale/ru';
import moment from 'moment-timezone';
import isExternal from 'is-url-external';

import i18n from './root/i18n';

// @todo Refactor to use getWindowWidth instead, which calculates width corretly
export const getDocumentWidth = () => {
  if (global.IS_CLIENT) {
    return Math.max(
      document.documentElement['clientWidth'],
      document.body['scrollWidth'],
      document.documentElement['scrollWidth'],
      document.body['offsetWidth'],
      document.documentElement['offsetWidth'],
    );
  } else {
    return 1000;
  }
};

export const getWindowWidth = () => {
  if (global.IS_CLIENT) {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  return 1000;
};

export const getOrientation = () => {
  if (global.IS_CLIENT) {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return Orientations.PORTRAID;
    } else {
      return Orientations.LANDSCAPE;
    }
  }
};

// @todo Refactor to use getFoundationBreakpointUsingWindowWidth, which uses exactly same breakpoints
// as CSS, instead.
export const getFoundationBreakpoint = () => {
  if (!global.IS_CLIENT) {
    return 'xlarge';
  }

  const width = getDocumentWidth();
  if (width < 640) return 'small';
  if (width < 1024) return 'medium';
  if (width < 1200) return 'large';
  if (width < 1440) return 'xlarge';
  return 'xxlarge';
};

export const getFoundationBreakpointUsingWindowWidth = () => {
  if (!global.IS_CLIENT) {
    return 'xlarge';
  }

  const width = getWindowWidth();
  if (width < 640) return 'small';
  if (width < 1024) return 'medium';
  if (width < 1200) return 'large';
  if (width < 1440) return 'xlarge';
  return 'xxlarge';
};

export const isAllowedLanguage = language => {
  return !!find(Languages, item => {
    return language === item;
  });
};

export const setActiveLanguage = language => {
  const lang = isAllowedLanguage(language) ? language : Languages.EN;
  i18n.changeLanguage(lang);
  moment.locale(lang);
};

export const getActiveLanguage = () => {
  const {language} = i18n;
  let active = null;

  forEach(LanguageMenuItems, item => {
    if (item.id === language) {
      active = item;
      return false;
    }
  });

  return active;
};

export const setMomentLanguage = language => {
  switch (language) {
    case 'fi':
      moment.locale('fi');
      break;
    case 'sv':
      moment.locale('sv');
      break;
    case 'de':
      moment.locale('de');
      break;
    case 'ja':
      moment.locale('ja');
      break;
    case 'ru':
      moment.locale('ru');
      break;
    default:
      moment.locale('en-gb');
      break;
  }
};

export const getLanguagecodeFromUrl = (url: string) => {
  const urlParts = url.split('/');
  if (Array.isArray(urlParts) && urlParts.length > 1) {
    return urlParts[1];
  }
  return '';
};

export const composePageTitle = (title = '', prepend = true) => {
  return prepend ? `${title} | My Helsinki` : title;
};

export const setPageTitle = (title, prepend) => {
  if (global.IS_CLIENT) {
    document.title = composePageTitle(title, prepend);
  }
};

/**
 * Shows login modal by adding "login" to location query.
 */
export const showLoginModal = returnUrl => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query,
    mergeIntoQuery = {login: null};

  if (returnUrl) {
    mergeIntoQuery.returnUrl = returnUrl;
  }

  browserHistory.push(
    Object.assign(location, {
      query: Object.assign(query, mergeIntoQuery),
    }),
  );
};

/**
 * Hides login modal by removing "login" to location query.
 */
export const hideLoginModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  delete query.login;

  browserHistory.push(
    Object.assign(location, {
      query: query,
    }),
  );
};

/**
 * @param nid
 */
export const showCreateListModal = (nid = null) => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  browserHistory.push(
    Object.assign(location, {
      query: Object.assign(query, {createList: nid}),
    }),
  );
};

export const hideCreateListModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  delete query.createList;

  browserHistory.push(
    Object.assign(location, {
      query: query,
    }),
  );
};

export const showChooseListModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  browserHistory.push(
    Object.assign(location, {
      query: Object.assign(query, {chooseList: null}),
    }),
  );
};

export const hideChooseListModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  delete query.chooseList;

  browserHistory.push(
    Object.assign(location, {
      query: query,
    }),
  );
};

export const hideEditModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  delete query.edit;

  browserHistory.push(
    Object.assign(location, {
      query: query,
    }),
  );
};

export const showAddToListModal = itemId => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  browserHistory.push(
    Object.assign(location, {
      query: Object.assign(query, {addToList: itemId}),
    }),
  );
};

export const hideAddToListModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  delete query.addToList;

  browserHistory.push(
    Object.assign(location, {
      query: query,
    }),
  );
};

export const showFeedbackModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query,
    mergeIntoQuery = {sendFeedback: null};

  browserHistory.push(
    Object.assign(location, {
      query: Object.assign(query, mergeIntoQuery),
    }),
  );
};

export const hideFeedbackModal = () => {
  const location = browserHistory.getCurrentLocation(),
    query = location.query;

  delete query.sendFeedback;

  browserHistory.push(
    Object.assign(location, {
      query: query,
    }),
  );
};

/**
 * @returns {*}
 */
export const getLogo = () => {
  switch (i18n.language) {
    case Languages.JA:
      return require(`../assets/images/logo-ja.png`).default;
    case Languages.RU:
      return require(`../assets/images/logo-ru.png`).default;
    case Languages.SV:
      return require(`../assets/images/logo-sv.svg`).default;
    default:
      return require(`../assets/images/logo.svg`).default;
  }
};

export const getLogoClass = () => {
  switch (i18n.language) {
    case Languages.JA:
      return 'logo-ja';
    case Languages.RU:
      return 'logo-ru';
    case Languages.SV:
      return 'logo-sv';
    default:
      return 'logo';
  }
};
/**
 * @returns {string}
 */
export const getCurrentUrl = () => {
  return global.IS_CLIENT ? window.location.href : global.CURRENT_URL;
};

export const isClient = () => {
  return global.IS_CLIENT;
};

export const addTargetBlankToAnchors = (htmlStr: string) => {
  if (global.IS_CLIENT) {
    var el = document.createElement('div');
    el.innerHTML = htmlStr;
    const anchors = Array.from(el.getElementsByTagName('a'));
    // Open external links in a new tab
    anchors.forEach(anchor => {
      if (isExternal(anchor.href)) {
        anchor.target = '_blank';
      }
    });
    return el.innerHTML;
  } else {
    return htmlStr;
  }
};

export const isRetina = () => {
  if (global.IS_CLIENT) {
    return (
      window.devicePixelRatio > 1 ||
      (window.matchMedia &&
        window.matchMedia(
          '(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)',
        ).matches)
    );
  } else {
    return false;
  }
};

export const getCRS = () => {
  require('leaflet-defaulticon-compatibility');
  require('proj4leaflet');
  const L = require('leaflet');
  const bounds = L.bounds([-548576, 8388608], [1548576, 6291456]);
  const originNw = [bounds.min.x, bounds.max.y];
  const crs = new L.Proj.CRS(
    'EPSG:3067',
    '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    {
      resolutions: [
        8192,
        4096,
        2048,
        1024,
        512,
        256,
        128,
        64,
        32,
        16,
        8,
        4,
        2,
        1,
        0.5,
        0.25,
        0.125,
      ],
      bounds,
      transformation: new L.Transformation(1, -originNw[0], -1, originNw[1]),
    },
  );

  return crs;
};

export const parseAddressStr = (addressObj, postalCode = true) => {
  const address = [];
  const city = [];
  if (postalCode && addressObj.postalCode) {
    city.push(addressObj.postalCode);
  }

  if (addressObj.locality) {
    city.push(addressObj.locality);
  }

  if (addressObj.streetAddress) {
    address.push(addressObj.streetAddress);
  }

  if (city.length) {
    address.push(city.join(' '));
  }

  return address.length ? address.join(', ') : null;
};

export const sortObjectByKeys = obj => {
  const sortedObj = {}
  Object.keys(obj).sort().forEach(key => {
    sortedObj[key] = obj[key];
  })
  return sortedObj;
}

export const MAP_URL = 'https://tiles.hel.ninja/wmts/osm-sm/etrs_tm35fin/{z}/{x}/{y}.png';
export const MAP_RETINA_URL =
  'https://tiles.hel.ninja/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png';
