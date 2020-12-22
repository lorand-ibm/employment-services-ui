export const Languages = {
  EN: 'en',
  FI: 'fi',
  SV: 'sv',
  DE: 'de',
  JA: 'ja',
  RU: 'ru',
};

export const DefaultCoordinates = {
  lat: 60.170833,
  lng: 24.9375,
};

export const Orientations = {
  PORTRAID: 'portrait',
  LANDSCAPE: 'landscape',
};

export const LanguageMenuItems = [
  {id: Languages.EN, label: 'English'},
  {id: Languages.FI, label: 'Suomi'},
  {id: Languages.SV, label: 'Svenska'},
//  {id: Languages.DE, label: 'Deutsch'},
//  {id: Languages.JA, label: '日本語'},
//  {id: Languages.RU, label: 'Русский'},
];

export const WHATS_POPULAR = 'whats_popular';

export const MenuNames = {
  MAIN_EN: 'main',
  MAIN_FI: 'main-fi',
  MAIN_SV: 'main-sv',
  MAIN_DE: 'main-de',
  MAIN_JA: 'main-ja',
  MAIN_RU: 'main-ru',

  FOOTER_TOP_EN: 'top-footer',
  FOOTER_TOP_FI: 'top-footer-fi',
  FOOTER_TOP_SV: 'top-footer-sv',
  FOOTER_TOP_DE: 'top-footer-de',
  FOOTER_TOP_JA: 'top-footer-ja',
  FOOTER_TOP_RU: 'top-footer-ru',

  FOOTER_BOTTOM_EN: 'bottom-footer',
  FOOTER_BOTTOM_FI: 'bottom-footer-fi',
  FOOTER_BOTTOM_SV: 'bottom-footer-sv',
  FOOTER_BOTTOM_DE: 'bottom-footer-de',
  FOOTER_BOTTOM_JA: 'bottom-footer-ja',
  FOOTER_BOTTOM_RU: 'bottom-footer-ru',

  SEARCH_MENU_EN: 'search-menu-en',
  SEARCH_MENU_FI: 'search-menu-fi',
  SEARCH_MENU_SV: 'search-menu-sv',
  SEARCH_MENU_DE: 'search-menu-de',
  SEARCH_MENU_JA: 'search-menu-ja',
  SEARCH_MENU_RU: 'search-menu-ru',
};

export const MainMenuByLanguage = {
  [Languages.EN]: MenuNames.MAIN_EN,
  [Languages.FI]: MenuNames.MAIN_FI,
  [Languages.SV]: MenuNames.MAIN_SV,
  [Languages.DE]: MenuNames.MAIN_DE,
  [Languages.JA]: MenuNames.MAIN_JA,
  [Languages.RU]: MenuNames.MAIN_RU,
};

export const FooterTopMenuByLanguage = {
  [Languages.EN]: MenuNames.FOOTER_TOP_EN,
  [Languages.FI]: MenuNames.FOOTER_TOP_FI,
  [Languages.SV]: MenuNames.FOOTER_TOP_SV,
  [Languages.DE]: MenuNames.FOOTER_TOP_DE,
  [Languages.JA]: MenuNames.FOOTER_TOP_JA,
  [Languages.RU]: MenuNames.FOOTER_TOP_RU,
};

export const FooterBottomMenuByLanguage = {
  [Languages.EN]: MenuNames.FOOTER_BOTTOM_EN,
  [Languages.FI]: MenuNames.FOOTER_BOTTOM_FI,
  [Languages.SV]: MenuNames.FOOTER_BOTTOM_SV,
  [Languages.DE]: MenuNames.FOOTER_BOTTOM_DE,
  [Languages.JA]: MenuNames.FOOTER_BOTTOM_JA,
  [Languages.RU]: MenuNames.FOOTER_BOTTOM_RU,
};

export const SearchMenuByLanguage = {
  [Languages.EN]: MenuNames.SEARCH_MENU_EN,
  [Languages.FI]: MenuNames.SEARCH_MENU_FI,
  [Languages.SV]: MenuNames.SEARCH_MENU_SV,
  [Languages.DE]: MenuNames.SEARCH_MENU_DE,
  [Languages.JA]: MenuNames.SEARCH_MENU_JA,
  [Languages.RU]: MenuNames.SEARCH_MENU_RU,
};

export const SectionKeys = {
  SEE_AND_DO: 'employment-services',
//  EAT_AND_DRINK: 'eat-and-drink',
//  WORK_AND_STUDY: 'work-and-study',
//  BUSINESS_AND_INVEST: 'business-and-invest',
//  INFO: 'info',
};

// Note: There are some inconsistencies in the color names. For example we used
// to have two different blueish colors with the name "Bus" (one version in
// backend "Colours" vocabulary and another one in frontend). Those
// insconsistencies have been separated by adding a number after the name,
// eg. HEL_BUS_1, HEL_BUS_2.
export const Colors = {
  WHITE: '#ffffff',
  LIGHT_BLUE: '#cfe4f5',
  LIGHT_BLUE_GREY: '#d5ebe0',
  LIGHT_SILVER: '#ebedf1',
  HEL_BRICK: '#db2719',
  HEL_SPORA: '#009a4a',
  HEL_METRO: '#f35f00',
  HEL_FOG: '#a3c8eb',
  HEL_ENGEL: '#fdeb6c',
  HEL_BUS_1: '#0000bf',
  HEL_BUS_2: '#3b00ff',
  HEL_VAAKUNA: '#0072c6',
  //HEL_SUMMER_1: '#fbd400',
  HEL_SUMMER_2: '#ffc61e',
  HEL_SUOMENLINNA: '#f49ec3',
  HEL_MY_HELSINKI: '#f4d9e5',
  HEL_COPPER: '#00d9af',
  HEL_COPPER_2: '#7febd3',
  HEL_GOLD: '#c2a251',
  HEL_SILVER: '#dedfe1',
  HEL_MEDIUM_GRAY: '#a2aab7',
  HEL_DARK_GRAY: '#48505b',
  HEL_BLACK: '#231f20',
};

// These colors should have black text when used in hero backgrounds
export const HeroBlackTextBackgroundColors = [
  Colors.WHITE,
  Colors.HEL_FOG,
  Colors.HEL_ENGEL,
  Colors.HEL_SUMMER_2,
  Colors.HEL_SUOMENLINNA,
  Colors.HEL_COPPER,
  Colors.HEL_GOLD,
];

export const SectionColors = {
  [SectionKeys.SEE_AND_DO]: Colors.HEL_SPORA,
  [SectionKeys.EAT_AND_DRINK]: Colors.HEL_SUOMENLINNA,
  [SectionKeys.WORK_AND_STUDY]: Colors.LIGHT_BLUE,
  [SectionKeys.BUSINESS_AND_INVEST]: Colors.HEL_SUMMER_2,
  [SectionKeys.INFO]: Colors.WHITE,
};

export const TextColors = {
  DARK: Colors.HEL_BLACK,
  LIGHT: Colors.WHITE,
};

// Text color definition for each color value.
export const TextColorMap = {
  [Colors.WHITE]: TextColors.DARK,
  [Colors.LIGHT_BLUE]: TextColors.DARK,
  [Colors.LIGHT_BLUE_GREY]: TextColors.DARK,
  [Colors.LIGHT_SILVER]: TextColors.DARK,
  [Colors.HEL_BRICK]: TextColors.LIGHT,
  [Colors.HEL_SPORA]: TextColors.LIGHT,
  [Colors.HEL_METRO]: TextColors.LIGHT,
  [Colors.HEL_FOG]: TextColors.DARK,
  [Colors.HEL_ENGEL]: TextColors.DARK,
  [Colors.HEL_BUS_1]: TextColors.LIGHT,
  [Colors.HEL_BUS_2]: TextColors.LIGHT,
  [Colors.HEL_VAAKUNA]: TextColors.LIGHT,
  [Colors.HEL_SUMMER_2]: TextColors.DARK,
  [Colors.HEL_SUOMENLINNA]: TextColors.DARK,
  [Colors.HEL_COPPER]: TextColors.DARK,
  [Colors.HEL_GOLD]: TextColors.DARK,
  [Colors.HEL_SILVER]: TextColors.DARK,
  [Colors.HEL_MEDIUM_GRAY]: TextColors.LIGHT,
  [Colors.HEL_DARK_GRAY]: TextColors.LIGHT,
  [Colors.HEL_BLACK]: TextColors.LIGHT,
  [Colors.HEL_MY_HELSINKI]: TextColors.DARK,
};

// Color mapping of backend color names. Backend currently has two ways for
// defining colors:
// a) The old way using taxonomy terms and giving hexadecimal values in the API
//    responses. Theme Page hero area color uses this way.
// b) The new way using config entities and giving just the color machine name
//    in the API responses. All other places use this one, eg. Paragraph
//    components and Generic subpage hero carousel.
export const ColorNameMapping = {
  black: Colors.HEL_BLACK,
  brick: Colors.HEL_BRICK,
  bus: Colors.HEL_BUS_1,
  copper: Colors.HEL_COPPER,
  engel: Colors.HEL_ENGEL,
  fog: Colors.HEL_FOG,
  light_blue: Colors.LIGHT_BLUE,
  light_silver: Colors.LIGHT_SILVER,
  metro: Colors.HEL_METRO,
  spora: Colors.HEL_SPORA,
  summer: Colors.HEL_SUMMER_2,
  suomenlinna: Colors.HEL_SUOMENLINNA,
  white: Colors.WHITE,
};

export const KoroTypes = {
  BASIC_WAVE: 'basicWave',
  VERTICAL_BASIC_WAVE: 'verticalBasicWave',
  HIGH_WAVE: 'highWave',
  MEDIUM_WAVE: 'mediumWave',
  PYRAMID: 'pyramid',
  ROUND: 'round',
  DIAGONAL: 'diagonalWave',
};

export const SectionSubnavigationKoros = {
  'see-and-do': '/assets/images/see-and-do-koro.svg',
  'business-and-invest': '/assets/images/business-and-invest-koro.svg',
  info: '/assets/images/info-koro.svg',
};

export const LiftUpCollectionTypes = {
  DEFAULT: 'default',
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export const InfoSubpageTypes = {
  ACCORDION: 'accordion',
  RICH_BLOCK: 'rich-block',
};

export const SimpleQuoteTypes = {
  QUOTE: 'quote',
  TWITTER: 'twitter',
};

// These are Drupal side TIDs.
export const PlaceTypes = {
  SIGHT: 60,
  RESTAURANT: 74,
  HOTEL: 80,
  PARTY_ROOM: 83,
  MEETING_PLACE: 63,
  CAFE: 1498,
  BARS_AND_NIGHTLIFE: 1478,
  ACCOMMODATION: 1482,
  NATURE_AND_SPORTS: 1502,
  SAUNA_AND_WELLNESS: 1503,
  WORK_AND_STUDY: 1546,
  SHOP: 69,
};

export const PlaceTypeNames = {
  [PlaceTypes.SIGHT]: 'sight',
  [PlaceTypes.RESTAURANT]: 'restaurant',
};

export const HeroCarouselTypes = {
  DEFAULT: 'default',
  SIMPLE: 'simple',
  SPECIAL: 'special',
  ROTATED: 'rotated',
};

export const PhotoGridSortOrderTypes = {
  NA: 'N/A',
  MOST_POPULAR: 'Most popular',
  MOST_RECENT: 'Most recent',
};

export const ImageStyles = {
  CARD_275: 'card_275',
  CARD_375: 'card_375',
  CARD_500: 'card_500',
  SQUARE_150: 'square_150',
  SQUARE_275: 'square_275',
  SQUARE_375: 'square_375',
  SQUARE_600: 'square_600',

  HERO_IMAGE: 'hero_image',
  COLUMN_FULL: 'column_full',
  CONTENT_SLIDESHOW_ITEM: 'image_slideshow_item',

  // @todo Replace this with some generic image-style (non-crop, width ~320px).
  THUMBNAIL_ASPECT_PRESERVED: 'image_thumbnail_aspect_preserved',
};

export const ContentTypes = {
  HOMEPAGE: 'homepage',
  ARTICLE: 'article',
  EVENT: 'event',
  INFO_PAGE: 'info_page',
  ACTIVITY: 'activity',
  PLACE: 'place',
  THEME_PAGE: 'theme_page',
  MY_HELSINKI_LOCAL_GUIDE: 'my_helsinki_local_guide',
  MY_HELSINKI_LIST: 'my_helsinki_list',
  MEDIA_CARD: 'media_card',
  INFO_CARD: 'info_card',
  EAT_AND_DRINK: 'eat_drink_sub_page',
};

export const ParagraphTypes = {
  BIG_CARD_LIST: 'big_card_list',
  CARD_LIST: 'card_list',
  GRID_CARD_LIST: 'grid_card_list',
  INSTAGRAM: 'instagram',
  LEAD_TEXT: 'lead_text',
  LIFTUP_COLLECTION: 'liftup_collection',
  LOCATION_CAROUSEL: 'location_carousel',
  MEDIA: 'media',
  QUOTE: 'quote',
  RICH_CARD_LIST: 'rich_card_list',
  SIMPLE_LIFTUP: 'simple_liftup',
  SMALL_CARD: 'small_card',
  TAGS_CONTAINER: 'tags_container',
  TEXT: 'text',
  TWITTER: 'twitter',
  VIDEO: 'video',
  VIDEO_CAROUSEL: 'video_carousel',
  SUSTAINABILITY_SERVICE_LIFTUP: 'sustainability_service_liftup',
  SQUARE_IMAGE_LIFTUP: 'square_image_liftup',
  BANNER: 'banner',
  HSL_WIDGET: 'hsl_widget',
  PORTRAIT: 'portrait',
  QUESTIONNAIRE: 'questionnaire',
  EMBEDDED_VIDEO: 'embedded_video',
  CONTENT_SLIDESHOW: 'content_slideshow',
  LISTING: 'listing',
  ACCORDION: 'accordion',
  NOTIFICATION: 'notification',
};

export const CardTypes = {
  COMPANY: 'company_card',
  MEDIA: 'media_card',
  INFO: 'info_card',
};

export const MyHelsinkiHeartColors = {
  BLACK: 'black',
  BLUE: 'blue',
  WHITE: 'white',
};

export const MyHelsinkiListAllowedContentTypes = [
  ContentTypes.EVENT,
  ContentTypes.PLACE,
  ContentTypes.ACTIVITY,
];

export const CarouselSwipeTolerance = 20;

export const BypassCacheQueryParameter = 'live';

export const ContactForms = {
  FEEDBACK_FORM: 'website_feedback',
  SUSTAINABILITY_FEEDBACK_FORM: 'sustainability_feedback',
};
