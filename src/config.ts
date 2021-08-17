import { Lang } from "./types";

const envSettings = window;
console.log(envSettings)
// if (!configuration.drupalUrl) {
//   throw Error("Drupal URL missing");
// }

export const drupalUrl = envSettings.DRUPAL_URL;
export const rnsFi = envSettings.RNS_FI;
export const rnsSv = envSettings.RNS_SV;
export const rnsEn = envSettings.RNS_EN;

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
