import { string } from "prop-types";

export type Lang = "fi" | "en" | "sv";
export type Params = { langParam: string; urlAlias: string };
export type EventParams = { langParam: string; urlAlias: string };
// TODO type "any"
export type ParagraphData = {[k in Lang]: any};
export type UrlAliases = {[k in Lang]: string};