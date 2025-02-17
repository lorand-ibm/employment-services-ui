export type Lang = "fi" | "en" | "sv";
export type Params = { langParam: string; urlAlias: string };
export type EventParams = { urlAlias: string };
export type DateContent = {
  startTime: string;
  endTime: string;
};
export type CardType = "event" | "Card" | "news" | "blog" | null;
export type ParagraphWidth = "Narrow" | "Medium" | "Wide" | "Full" | null;
// TODO type "any"
export type ParagraphData = {[k in Lang]: any};
export type UrlAliases = {[k in Lang]: string};
export interface SingleCardProps {
  text: string;
  title: string;
  type: CardType;
  lang: Lang;

  image?: string;
  alt?: string;
  dateContent?: DateContent;
  location?: string;
  tags?: any;
  locationExtraInfo?: string;

  text_color?: string;
  title_color?: string;
  url?: string;
  buttonText?: string;
  buttonBgColor?: string;
  bgColor?: string;
}
export interface ListItemProps {
  text: string;
  title: string;
  type: CardType;
  lang: Lang;

  imageUrl?: string;
  alt?: string;
  dateContent: DateContent;
  location?: string;

  text_color?: string;
  title_color?: string;
  url: string;
  buttonText?: string;
  buttonBgColor?: string;
  bgColor?: string;
}
declare global {
  interface Window {
    rnsData: any;
    _paq: any;
    DRUPAL_URL: string;
    RNS_FI: string;
    RNS_SV: string;
    RNS_EN: string;
  }
}
