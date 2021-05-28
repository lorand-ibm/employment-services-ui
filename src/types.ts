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

  dateContent?: DateContent;
  location?: string;

  text_color?: string;
  title_color?: string;
  image?: string;
  buttonUrl?: string;
  buttonText?: string;
  button_bg_color?: string;
  bgColor?: string;
  bg_color?: string;
}
export interface ListItemProps {
  text: string;
  title: string;
  type: CardType;
  lang: Lang;

  imageUrl?: string;
  dateContent: DateContent;
  location?: string;

  text_color?: string;
  title_color?: string;
  buttonUrl?: string;
  buttonText?: string;
  button_bg_color?: string;
  bgColor?: string;
  bg_color?: string;
}
declare global {
  interface Window {
    rnsData: any;
    _paq: any;
  }
}
