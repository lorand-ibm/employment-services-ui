import {
  Locale,
  DrupalMenuLinkContent,
} from "next-drupal"

export declare type HeaderProps = {
    locale: Locale,
    menu?: DrupalMenuLinkContent[],
    themes?: DrupalMenuLinkContent[],
  };