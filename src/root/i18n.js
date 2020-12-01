import keyBy from 'lodash/keyBy';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {setMomentLanguage} from '../helpers';

const localesContext = require.context('../../locales', true, /\.json$/);
const listOfLocalePaths = localesContext.keys();
const localesByPath = mapValues(keyBy(listOfLocalePaths, s => s), localePath =>
  localesContext(localePath),
);
const resources = mapKeys(localesByPath, (_, localePath) =>
  localePath.replace(/^\.\//, '').replace(/\.json$/, ''),
);

/**
 * @todo On SSR, this will only show English translations, because we're not correctly
 * detecting the user's preferred language.
 */

i18n.use(LanguageDetector).init(
  {
    whitelist: ['en', 'fi', 'sv', 'de', 'ja', 'ru'],
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    resources,
    // debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    react: {
      nsMode: 'fallback',
    },
  },
  () => {
    setMomentLanguage(i18n.language);
    if (global.IS_CLIENT) {
      i18n.on('languageChanged', language => {
        setMomentLanguage(language);
      });
    }
  },
);

export default i18n;
