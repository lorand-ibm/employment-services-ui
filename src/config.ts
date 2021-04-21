import { Lang } from "./types";

if (!process.env.REACT_APP_DRUPAL_URL) throw Error("Drupal URL missing");
export const drupalUrl = process.env.REACT_APP_DRUPAL_URL;

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

