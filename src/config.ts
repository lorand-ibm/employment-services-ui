import { Lang } from "./types";

if (!process.env.REACT_APP_DRUPAL_URL) throw Error("Drupal URL missing");
export const drupalUrl = process.env.REACT_APP_DRUPAL_URL;

const appNames: { [l in Lang]: string } = {
  fi: "Työllisyyspalvelut",
  sv: "Arbetstjänster",
  en: "Employment services",
};

export const getAppName = (l: Lang): string => appNames[l];

const eventListTitles: { [l in Lang]: string } = {
  fi: "Tapahtumakalenteri",
  sv: "Evenemang",
  en: "Events",
};

export const getEventListTitle = (l: Lang): string => eventListTitles[l];
