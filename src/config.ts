import { Lang } from "./types";


const envSettings = window;

export const configuration = {
  drupalUrl: envSettings.REACT_APP_DRUPAL_URL,
  rnsFi: envSettings.REACT_APP_REACT_AND_SHARE_FI,
  rnsSv: envSettings.REACT_APP_REACT_AND_SHARE_SV,
  rnsEn: envSettings.REACT_APP_REACT_AND_SHARE_EN,
}

console.log(envSettings)
console.log(process.env)
// if (!configuration.drupalUrl) {
//   throw Error("Drupal URL missing");
// }

export const drupalUrl = 'https://edit.test.tyollisyyspalvelut.hel.fi';

const appNames: { [l in Lang]: string } = {
  fi: "Työllisyyspalvelut",
  sv: "Arbetstjänster",
  en: "Employment services",
};

export const getAppName = (l: Lang): string => appNames[l];

const eventsListTitles: { [l in Lang]: string } = {
  fi: "Tapahtumakalenteri",
  sv: "Evenemang",
  en: "Events",
};

export const getEventsListTitle = (l: Lang): string => eventsListTitles[l];

const newsListTitles: { [l in Lang]: string } = {
  fi: "Muita uutisia",
  sv: "Nyheter",
  en: "News",
};

export const getNewsListTitle = (l: Lang): string => newsListTitles[l];

const blogListTitles: { [l in Lang]: string } = {
  fi: "Blogi",
  sv: "Blogg",
  en: "Blog",
};

export const getBlogListTitle = (l: Lang): string => blogListTitles[l];
