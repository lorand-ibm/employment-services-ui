/* global DRUPAL_URL PROTOCOL FRONTEND_URL */

import React, {createElement} from 'react';
import get from 'lodash/get';
import axios from 'axios';
import cachios from 'cachios';
import forEach from 'lodash/forEach';
import forEachRight from 'lodash/forEachRight';
import find from 'lodash/find';
import isString from 'lodash/isString';
import i18n from '../root/i18n';
import {formatDate, createDateRangeWithTime, getContentDateRange} from './dateHelpers';

import {PhotoGridSortOrderTypes, HeroBlackTextBackgroundColors} from '../constants';

import {
  ContentTypes,
  Colors,
  ParagraphTypes,
  ImageStyles,
  PlaceTypes,
  Languages,
  CardTypes,
  DefaultCoordinates,
  Orientations,
  ColorNameMapping,
  TextColorMap,
  TextColors,
} from '../constants';
import * as helpers from '../helpers';
import * as searchHelpers from '../search/helpers';
import * as myHelsinkiHelpers from '../myHelsinki/helpers';

import SeeAndDoCardPlaceholder from '../cardList/cardPlaceholder/SeeAndDo';
import EatAndDrinkCardPlaceholder from '../cardList/cardPlaceholder/EatAndDrink';
import WorkAndStudyCardPlaceholder from '../cardList/cardPlaceholder/WorkAndStudy';
import BusinessAndInvestCardPlaceholder from '../cardList/cardPlaceholder/BusinessAndInvest';
import NewsCardPlaceholder from '../cardList/cardPlaceholder/Article';
import SaunaAndWellnessPlaceholder from '../cardList/cardPlaceholder/SaunaAndWellness';
import CafePlaceholder from '../cardList/cardPlaceholder/Cafe';
import AccomondationPlaceholder from '../cardList/cardPlaceholder/Accomondation';
import BarsAndNightlifePlaceholder from '../cardList/cardPlaceholder/BarsAndNightlife';
import ShopPlaceholder from '../cardList/cardPlaceholder/Shop';
import Accordion from "../accordion/Accordion";


const igURL = 'https://www.instagram.com';
const igParams = { params: { __a: 1 } };
const sosMedAxios = axios.create({});
const sosMedRequest = cachios.create(sosMedAxios, {
  stdTTL: 2 * 60 * 60, // sec -> 2 h
});

/**
 * @param path
 * @returns {string}
 */
export const getDrupalUrl = path => {
  return `${DRUPAL_URL}${path}`;
};

export const getDrupalFileUrl = (drupalFileField) => {
  if (drupalFileField[0] && drupalFileField[0].url) {
    return getDrupalUrl(drupalFileField[0].url);
  }
  return null;
}

export const getContentBreadcrumbs = content => {
  const breadcrumbsData = get(content, 'breadcrumbs', []),
    title = getContentTitle(content),
    breadcrumbs = [
      {
        text: i18n.t('breadcrumbs:homeLabel'),
        link: '/',
      },
    ];

  forEachRight(breadcrumbsData, item => {
    breadcrumbs.push({
      text: item.title,
      link: item.path,
    });
  });

  if (breadcrumbs.length) {
    breadcrumbs.push({
      text: title,
    });
  }

  return breadcrumbs;
};

/**
 * @param content
 * @param language
 * @returns {*}
 */
export const getContentPath = (content, language) => {
  if (!content) {
    return null;
  }

  if (!language) {
    language = get(content, 'langcode');

    if (language === 'und') {
      language = i18n.language;
    }
  }

  let path = find(content.path, item => {
    return item.langcode === language;
  });

  if (!path) {
    return null;
  }

  const resolvedPath = path.alias ? `/${path.langcode}${path.alias}` : getContentNodePath(content, language);
  const escapedPath = encodeURI(resolvedPath);

  return escapedPath;
};

/**
 * @param content
 * @param language
 * @returns {*}
 */
export const getContentNodePath = (content, language) => {
  if (!language) {
    language = get(content, 'langcode');
  }

  const nid = get(content, 'nid');

  return nid ? `/${language}/node/${nid}` : null;
};

/**
 * @param content
 * @param language
 * @returns {*}
 */
export const getContentPathAlias = (content, language) => {
  if (!content) {
    return null;
  }

  if (!language) {
    language = get(content, 'langcode');
  }

  let path = find(content.path, item => {
    return item.langcode === language;
  });

  return path ? path.alias : null;
};

/**
 * @param content
 * @returns String
 */
export const getContentAddressObj = (
  content,
  streetAddressFieldName,
  postalCodeFieldName,
  localityFieldName,
) => {
  return {
    streetAddress: get(content, streetAddressFieldName, ''),
    postalCode: get(content, postalCodeFieldName),
    locality: get(content, localityFieldName),
  };
};

/**
 * @param content
 * @param path
 * @param language
 * @returns {*}
 */
export const getContentLink = (content, path = 'field_link[0]', language) => {
  if (!language) {
    language = get(content, 'langcode') || get(content, `${path}.langcode`);
    if (!language) {
      language = Languages.EN; // fallback
    }
  }

  const linkData = get(content, path),
    uri = get(linkData, 'uri');

  if (!uri) {
    return null;
  }

  const uriParts = uri.split(':');
  switch (uriParts[0]) {
    case 'entity':
      const alias = get(linkData, 'alias');
      return alias ? `/${language}${alias}` : `/${language}/${uriParts[1]}`;
    case 'internal':
      switch (uriParts[1]) {
        case '/':
          return `/${language}`;
        case 'login':
          return `/${language}/login`;
        default:
          return uriParts[1];
      }
    case 'http': // NOTICE: Passthrough!
    case 'https':
      return uri;
    default:
      return null;
  }
};

export const getContentSeeAllLink = (content, path) => {
  const title = get(content, path ? [path, '0', 'title'] : 'field_see_all_link[0].title');
  const link = getContentLink(content, path ? [path, '0'] : 'field_see_all_link[0]');

  if (!title || !link) {
    return null;
  }

  return {
    text: title,
    link: link,
  };
};

/**
 * @param content
 * @param path
 * @returns {*}
 */
export const getContentLinkTitle = (content, path = 'field_link[0]') => {
  const linkData = get(content, path);
  return get(linkData, 'title');
};

/**
 *
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentLinks = (content, path) => {
  const linksData = get(content, path, []),
    links = [];

  forEach(linksData, (link, i) => {
    links.push({
      title: get(link, 'title'),
      link: getContentLink(content, `${path}[${i}]`),
    });
  });

  return links;
};

/**
 * Getter for contents type.
 * @param content
 */
export const getContentType = content => {
  return get(content, 'type[0]', null);
};

/**
 * Getter for contents place type tid.
 * @param content
 * @returns {*}
 */
export const getContentPlaceType = content => {
  const type = getContentType(content);

  if (type !== ContentTypes.PLACE) {
    return null;
  }

  return Number(get(content, 'field_place_type[0].tid'));
};

/**
 * Getter for contents place type name.
 * @param content
 * @returns {*}
 */
export const getContentPlaceTypeName = content => {
  const type = getContentType(content);

  if (type !== ContentTypes.PLACE) {
    return null;
  }

  return get(content, 'field_place_type[0].name');
};

/**
 * Getter for content title.
 * @param content
 */
export const getContentTitle = content => {
  const type = getContentType(content);

  switch (type) {
    case CardTypes.COMPANY:
      return get(content, 'field_name');
    case CardTypes.MEDIA:
    case CardTypes.INFO:
      return get(content, 'field_title');
    default:
      const titleData = get(content, 'title', null);
      if (!titleData) {
        return null;
      }
      return isString(titleData) ? titleData : get(titleData, '[0].value');
  }
};

/**
 * @param content
 * @returns {number}
 */
export const getContentId = content => {
  return Number(get(content, 'nid'));
};

/**
 * Getter for content body.
 * @param content
 * @param showSummary
 * @param path
 * @returns {*}
 */
export const getContentBody = (content, showSummary = false, path = 'body[0]') => {
  const body = get(content, path, null),
    value = get(body, 'value'),
    summary = get(body, 'summary');

  return showSummary ? summary : value;
};

/**
 *
 * @param content
 * @returns {*}
 */
export const getContentDescription = content => {
  const type = getContentType(content);
  switch (type) {
    case 'activity':
      const teaserText = get(content, 'field_formatted_description[0].value', '');
      return teaserText ? stripHtml(teaserText) : '';
    case 'article':
      return get(content, 'field_teaser_text', '');
    case 'homepage':
      const quote = get(content, 'field_teaser_text', '');
      return quote ? stripHtml(quote) : '';
    case 'theme_page':
      return get(content, 'field_teaser_text', '');
    case 'event':
    case 'my_helsinki_list':
      return get(content, 'field_description', '');
    case 'my_helsinki_location_carousel':
      const location = get(content, 'field_location[0]'),
        field_text_value = get(content, 'field_text[0].value');
      return field_text_value ? field_text_value : location ? getContentDescription(location) : '';
    case 'activity_sub_page':
    case 'business_sub_page':
    case 'eat_drink_sub_page':
    case 'event_sub_page':
    case 'for_media_sub_page':
    case 'invest_sub_page':
    case 'see_do_sub_page':
    case 'sub_page':
    case 'work_sub_page':
      return get(content, 'field_teaser_text', '');
    default:
      const summary = getContentBody(content, true),
        body = getContentBody(content, false);
      return summary ? stripHtml(summary) : stripHtml(body);
  }
};

/**
 * Getter that tries to find a cover image copyright for the given content (e.g. Article, Theme).
 * @param content
 * @returns String|null
 */
export const getContentCoverImageCopyright = content => {
  const paths = [`field_hero_image[0].field_copyright`];

  let src = null;
  forEach(paths, path => {
    const tmpSrc = get(content, path);

    if (tmpSrc) {
      src = tmpSrc;
      return false;
    }
  });

  return src;
};

/**
 * Getter that tries to find a carousel image copyright for the given content (e.g. Article, Theme)
 * and carousel index (e.g. 1).
 * @param content
 * @param idx
 * @returns String|null
 */
export const getContentCarouselImageCopyright = (content, idx = 0) => {
  const paths = [
    `field_hero_image[${idx}].field_copyright`,
    `field_image[${idx}].field_copyright`,
    `field_images[${idx}].field_photographer_name`,
  ];

  let src = null;
  forEach(paths, path => {
    const tmpSrc = get(content, path);

    if (tmpSrc) {
      src = tmpSrc;
      return false;
    }
  });

  return src;
};

/**
 * Getter that tries to find a background colour for the given content (e.g. Article, Event, Place).
 * @param content
 * @param style
 * @returns String|null
 */
export const getContentColor = content => {
  const paths = [`field_hero_colour[0].field_hexadecimal_value`];

  let color = null;
  forEach(paths, path => {
    const tmpColor = get(content, path);

    if (tmpColor) {
      color = tmpColor;
      return false;
    }
  });

  return color;
};

/**
 * Getter that tries to find a teaser image for the given content.
 * @param content
 * @param style
 * @returns String|null
 */
export const getContentTeaserImage = (content, style = ImageStyles.HERO_IMAGE) => {
  const path = `field_teaser_image[0].field_image[0].styles.${style}`;

  return get(content, path);
};

/**
 * Getter that tries to find a cover image for the given content (e.g. Article, Event, Place).
 * @param content
 * @param style
 * @param getTeaserImage
 * @returns String|null
 */
export const getContentCoverImage = (
  content,
  style = ImageStyles.HERO_IMAGE,
  getTeaserImage = true,
) => {
  const type = getContentType(content),
    paths = [
      `field_images[0].field_image[0].styles.${style}`,
      `field_image[0].styles.${style}`,
      `field_image[0].field_image[0].styles.${style}`,
      `field_hero_image[0].field_image[0].styles.${style}`,
      `field_hero_carousel[0].field_image_video[0].field_image[0].styles.${style}`,
      `field_hero_carousel[0].field_promotion_link[0].field_hero_image[0].field_image[0].styles.${style}`,
      `field_hero_carousel[0].field_promotion_link[0].field_location_carousel[0].field_image[0].field_image[0].styles.${style}`,
      `field_location_carousel[0].field_image[0].field_image[0].styles.${style}`,
      `field_hero_carousel[0].field_promotion_link[0].field_images[0].field_url[0].uri`,
      `field_hero_carousel[0].field_image_video[0].field_video_upload_preview[0].field_image[0].styles.${style}`,
      `field_hero_carousel[0].field_video_upload_preview[0].field_image[0].styles.${style}`,
      `field_image_video[0].field_image[0].styles.${style}`,
      `field_media[0].field_image[0].styles.${style}`,
      `field_my_helsinki_list_hero[0].field_image[0].styles.${style}`,
      `field_hero_carousel[1].field_image_video[0].field_image[0].styles.${style}`,
      `field_hero_carousel[2].field_image_video[0].field_image[0].styles.${style}`,
      `field_hero_carousel[3].field_image_video[0].field_image[0].styles.${style}`,
      `field_images[0].field_url[0].uri`, // Event images (doesn't support image styles).
      `field_url[0].uri`, // Event images (doesn't support image styles).
      `field_hero_carousel[1].field_image_video[0].field_image[0].styles.${style}`,
    ];

  // Add teaser-image path as the first one to check.
  if (getTeaserImage) {
    paths.unshift(`field_teaser_image[0].field_image[0].styles.${style}`);
  }

  if (type === ContentTypes.MY_HELSINKI_LIST) {
    return myHelsinkiHelpers.getListCoverImage(content, style);
  }

  let src = null;
  forEach(paths, path => {
    const tmpSrc = get(content, path);

    if (tmpSrc) {
      src = tmpSrc;
      return false;
    }
  });

  return src;
};

/**
 *
 * @param content
 * @returns {*}
 */
export const getContentVideo = content => {
  const paths = [
    'field_video_url',
    'field_video_upload[0]',
    'field_image_video[0].field_media_video_embed_field',
    'field_image_video[0].field_video_upload[0]',
    'field_simple_video[0].field_media_video_embed_field',
    'field_simple_video[0].field_video_upload[0]',
  ];

  let src = null;
  forEach(paths, path => {
    const tmpSrc = get(content, path);

    if (tmpSrc) {
      src = isString(tmpSrc) ? tmpSrc : getDrupalUrl(tmpSrc.url);
      return false;
    }
  });

  return src;
};

/**
 *
 * @param content
 * @returns {*}
 */
export const getContentHeroVideo = content => {
  const paths = ['field_hero_image[0].field_video_upload[0]'];

  let src = null;
  forEach(paths, path => {
    const tmpSrc = get(content, path);

    if (tmpSrc) {
      src = isString(tmpSrc) ? tmpSrc : getDrupalUrl(tmpSrc.url);
      return false;
    }
  });

  return src;
};

/**
 * Builds data for HeroCarousel -component.
 * @param content
 * @param options
 * @returns {Array}
 */
export const getContentHeroCarouselSlides = (content, options) => {
  const paths = ['field_hero_carousel', 'field_images', 'field_image'],
    slides = [];
  const breakpoint = helpers.getFoundationBreakpoint();
  const orientation = helpers.getOrientation();
  const imageStyle =
    breakpoint === 'small'
      ? orientation === Orientations.PORTRAID
        ? ImageStyles.CARD_500
        : ImageStyles.HERO_IMAGE
      : ImageStyles.HERO_IMAGE;
  forEach(paths, path => {
    const heroCarouselData = get(content, path),
      style = get(options, 'style', imageStyle);

    if (heroCarouselData) {
      switch (path) {
        case 'field_hero_carousel':
          forEach(heroCarouselData, item => {
            const image = getContentCoverImage(item, style),
              video = getContentVideo(item),
              link = get(item, 'field_promotion_link[0]');
            let heart;
            if (item.field_promotion_link) {
              heart = item.field_promotion_link[0].field_heart_icon
                ? myHelsinkiHelpers.getListHeroBackground(item.field_promotion_link[0])
                : null;
            }
            let subpage = '';
            if (getContentType(content) === ContentTypes.HOMEPAGE) {
              subpage = get(item, 'field_homepage_subtitle');
            } else {
              subpage = get(options, 'subpage', getContentTitle(content));
            }

            const slide = {
              subpage: subpage,
              title: item.title,
              video: video ? video : null,
              loop: Boolean(Number(get(item, 'field_loop_video', '0'))),
              link: link ? getContentPath(link) : null,
            };

            if (heart) {
              slide.background = heart ? heart : null;
            } else if (image) {
              slide.background = image ? `url("${image}")` : null;
            } else if (link) {
              switch (getContentType(link)) {
                case ContentTypes.THEME_PAGE:
                  slide.background = getThemePageCoverBackground(link, style, null);
                  break;

                default:
                  const image = getContentCoverImage(link, style);
                  slide.background = image ? `url("${image}")` : null;
              }
            }

            slides.push(slide);
          });
          return false;

        case 'field_images':
        case 'field_image':
          forEach(heroCarouselData, item => {
            const image = getContentCoverImage(item, style),
              video = getContentVideo(item);

            slides.push({
              background: image ? `url("${image}")` : null,
              video: video ? video : null,
              title: get(options, 'title', getContentTitle(content)),
              subpage: get(options, 'subpage'),
            });
          });
          return false;
      }
    }
  });

  return slides;
};

/**
 * Builds data for HeroCarousel -component.
 * @param content
 * @returns {Array}
 */
export const getContentSpecialHeroCarouselSlides = content => {
  const slides = [];
  const breakpoint = helpers.getFoundationBreakpoint();
  const orientation = helpers.getOrientation();
  const imageStyle =
    breakpoint === 'small'
      ? orientation === Orientations.PORTRAID
        ? ImageStyles.CARD_500
        : ImageStyles.HERO_IMAGE
      : ImageStyles.HERO_IMAGE;
  const path = 'field_hero_carousel';
  const heroCarouselData = get(content, path);
  let style = imageStyle;

  if (heroCarouselData) {
    let imageIndex = 0;
    forEach(heroCarouselData, item => {
      if (breakpoint !== 'small') {
        if (imageIndex % 2 === 0) {
          style = ImageStyles.HERO_IMAGE;
        } else {
          style = ImageStyles.SQUARE_600;
        }
      }
      const image = getContentCoverImage(item, style);
      const video = getContentVideo(item);

      let link = get(item, 'field_website_url[0].uri') || getContentPath(get(item, 'field_promotion_link[0]')) || null;

      // Temporary hardcoded link change to external URL
      if (link === '/en/caas-placeholder') {
        link = 'https://helsinkiasaservice.com';
      }

      let subpage = '';
      subpage = get(item, 'field_homepage_subtitle');

      const slide = {
        subpage: subpage,
        title: item.title,
        video: video ? video : null,
        loop: Boolean(Number(get(item, 'field_loop_video', '0'))),
        link,
      };

      if (image) {
        slide.background = image ? `url("${image}")` : null;
      } else if (link) {
        const image = getContentCoverImage(link, style);
        slide.background = image ? `url("${image}")` : null;
      }
      slides.push(slide);
      imageIndex += 1;
    });
  }

  return slides;
};

/**
 * @param content
 * @returns {string}
 */
export const getContentLiftUpTitle = content => {
  switch (getContentType(content)) {
    case ContentTypes.EVENT:
      const locationName = get(content, 'field_location_name'),
        dateRange = getContentDateRange(content);

      let title = getContentTitle(content);

      if (dateRange) {
        title += ` - ${dateRange}`;
      }

      if (locationName) {
        title += ` - ${locationName}`;
      }

      return title;
    default:
      return getContentTitle(content);
  }
};

/**
 * Builds data for LiftUpCollection -component.
 * @param content
 * @param defaults
 * @returns {*}
 */
export const getContentLiftUpCollectionItems = (content, defaults = {}) => {
  const liftUpsData = get(content, 'field_lift_up_collection'),
    liftUps = [],
    defaultOptions = {
      background: Colors.HEL_SILVER,
      color: Colors.HEL_BLACK,
      ...defaults,
    };

  // @todo Some of the items are landscape and some of them are portraits. We
  //   should use different image-styles for different types of items. Currently
  //   we are forced to use an overly large image-style (HERO_IMAGE) to ensure
  //   that the images will have high enough resolution for both landscape and
  //   portrait.
  const imageStyle = ImageStyles.HERO_IMAGE;

  if (liftUpsData) {
    forEach(liftUpsData, liftUpData => {
      const type = getContentType(liftUpData),
        liftUp = {
          title: getContentLiftUpTitle(liftUpData),
          background: defaultOptions.background,
          color: defaultOptions.color,
          link: getContentPath(liftUpData),
        };

      switch (type) {
        case ContentTypes.THEME_PAGE:
          liftUp.background = getThemePageCoverBackground(liftUpData, imageStyle);
          liftUp.color = getThemePageCoverTextColor(liftUpData);
          break;

        default:
          const imageUrl = getContentCoverImage(liftUpData, imageStyle);
          if (imageUrl) {
            liftUp.background = `url("${imageUrl}")`;
            liftUp.color = '#ffffff';
          }
      }

      liftUps.push(liftUp);
    });

    if (liftUps.length > 4) {
      return liftUps.slice(0, 3);
    }
  }

  return liftUps;
};

/**
 * Getter for GridCardList props.
 *
 * @param content
 * @param suffix
 * @param forceShowAsGrid
 * @returns {*}
 */
export const getGridCardListProps = (content, suffix = null, forceShowAsGrid = false) => {
  suffix = suffix ? `_${suffix}` : '';

  let showAsGrid = Boolean(Number(get(content, `field_show_as_grid${suffix}`, '0')));
  showAsGrid = forceShowAsGrid ? true : showAsGrid;

  const cardsPath = `field_grid_card_list${suffix}`,
    style = ImageStyles.CARD_275,
    items = getContentCards(content, cardsPath, style, null, showAsGrid);

  return items.length
    ? {
      cardDefaults: {isDimmed: true},
      title: get(content, `field_grid_card_list_title${suffix}`),
      description: get(content, `field_grid_card_list_description${suffix}`),
      links: getContentLinks(content, `field_card_list_links${suffix}`),
      items: items,
      showAsGrid: showAsGrid,
    }
    : null;
};

/**
 * Getter for SimpleLiftUp props.
 * @param content
 * @returns {*}
 */
export const getContentSimpleLiftUpProps = content => {
  const liftUpData = get(content, 'field_simple_liftup[0]');

  if (!liftUpData) {
    return null;
  }

  const imageStyle = ImageStyles.SQUARE_600;

  const type = getContentType(liftUpData),
    liftUp = {
      title: getContentTitle(liftUpData),
      link: getContentPath(liftUpData),
      image: getContentCoverImage(liftUpData, imageStyle),
    };

  switch (type) {
    case ContentTypes.THEME_PAGE:
      liftUp.backgroundImage = getThemePageCoverBackground(liftUpData, imageStyle);
      break;
    default:
      const imageUrl = getContentCoverImage(liftUpData, imageStyle);
      if (imageUrl) {
        liftUp.backgroundImage = `url("${imageUrl}")`;
      }
  }

  return liftUp;
};

const getInstagramUrl = code => {
  return `https://www.instagram.com/p/${code}`;
};

/* NOTE:

  This commented out section contains logic for parsing Instagram's
  accessibility_caption to shorter and (hopefully) more meaning format.

  However, it was decided that at least initially
  the accessibility_caption is used as it comes from Instagram.

const extractContentDescription = (accessibilityCaption) => {
  if (accessibilityCaption) {
      const parts = accessibilityCaption.split('Image may contain: ');
      if (parts.length > 1) {
        return parts[1]; // text after 'image may contain'
      }
    }
    return null;
}

const isMeaningfulPlaceDescription = (placeDescription) => {
  return ![
    'Helsinki',
    'Helsinki City',
    'Helsinki City, Finland',
    'Helsinki, Finland',
    'Helsinki, Finnland',
    'Helsinki, Uusimaa, Finland',
    'Helsinki, Etelä-Suomen Lääni, Finland'
  ].includes(placeDescription);
}

// Parse Instagram accessibility caption which can be e.g.
// 'Photo by NN in Helsinki in Seurasaari with @MM. Image may contain: sea'
// Prefer the last "in" part, if not available use "may contain" description.
const parseCaptionText = (accessibilityCaption) => {
  if (accessibilityCaption) {
    const photoSentence = accessibilityCaption.split('.')[0]; // first sentence
    const photoPlaceWithMentions = photoSentence.split(' in ').pop(); // last "in" part
    const photoPlace = photoPlaceWithMentions.split(' with ')[0]; // drop mentions like 'with @abc'
    if (photoPlace
        && !photoPlace.startsWith('Photo')
        && isMeaningfulPlaceDescription(photoPlace)) {
      return photoPlace;
    }
    return extractContentDescription(accessibilityCaption);
  }
  return null;
}

*/

const getCaption = (igCaption) => {
  if (!igCaption) {
    return i18n.t('instagram:photoDescription');
  }
  if (igCaption.startsWith('Photo ')) {
    return igCaption.replace(/^(Photo )/, "Photo on Instagram ");
  }
  return igCaption;
}

const edgesToImages = (edges) => {
  return edges.map((edge) => {
    const { node: { shortcode, display_url, thumbnail_src, accessibility_caption }} = edge;
    return {
      url: getInstagramUrl(shortcode),
      src: display_url,
      thumbnail: thumbnail_src,
      caption: getCaption(accessibility_caption),
    }
  });
}

async function getImagesForUser(username) {
  const {data} = await sosMedRequest.get(`${igURL}/${username}`, igParams);
  const edges = get(data, 'graphql.user.edge_owner_to_timeline_media.edges', []);
  return edgesToImages(edges);
}

async function getImagesForTag(tag, sort) {
  const {data} = await sosMedRequest.get(`${igURL}/explore/tags/${tag}`, igParams);
  const edgesPath =
      sort === PhotoGridSortOrderTypes.MOST_POPULAR
        ? 'graphql.hashtag.edge_hashtag_to_top_posts.edges'
        : 'graphql.hashtag.edge_hashtag_to_media.edges';
  const edges = get(data, edgesPath, []);
  return edgesToImages(edges);
}

/**
 * @param fieldData
 * @param configData
 * @returns {object}
 */
const getPhotoGridData = async (fieldData, configData) => {
  let username = get(configData, 'instagram_username');
  let hashtag = get(configData, 'instagram_hashtag');
  let sortOrder = get(configData, 'instagram_sort_order');
  let title = null;

  const {field_username, field_title, field_hashtag, field_sort_order} = fieldData;
  const photoGridData = {};

  if (field_username || field_hashtag) {
    title = field_title;

    if (field_username) {
      username = field_username;
      hashtag = null;
    } else {
      hashtag = field_hashtag;
      sortOrder = field_sort_order;
      username = null;
    }
  }

  if (username) {
    if (!title) {
      title = username.indexOf('@') !== -1 ? username : `@${username}`;
    }

    photoGridData.photos = await getImagesForUser(username.replace('@', ''));
  } else {
    if (!title) {
      title = hashtag.indexOf('#') !== -1 ? hashtag : `#${hashtag}`;
    }

    photoGridData.photos = await getImagesForTag(hashtag.replace('#', ''), sortOrder);
  }

  photoGridData.title = title;

  return photoGridData;
}

/**
 * Getter for content photogrid.
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentPhotogridData = async (content, photoGridPath = 'field_photo_grid[0]', configPath = 'my_helsinki_config') => {
  let title = '';
  let photos = [];
  const photoGridDetails = get(content, photoGridPath);

  if (photoGridDetails) {
    try {
      const config = get(content, configPath);
      const photoGridData = await getPhotoGridData(photoGridDetails || {}, config || {});
      title = get(photoGridData, 'title');
      photos = get(photoGridData, 'photos');
    } catch (e) {
      console.error(e);
    }
  }
  return {
    title,
    photos,
  };
};

/**
 * Getter for content tags.
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentTags = (content, path = 'field_tags') => {
  const tagsData = get(content, path),
    tags = [];

  forEach(tagsData, item => {
    tags.push({
      name: simplifyName(item.name),
      link: searchHelpers.getSearchTagUrl(item.name),
    });
  });

  return tags;
};

/**
 * Simplify or clean tag/category name.
 *
 * Names are sometimes too 'scientific' and not suitable for UI usage.
 * E.g. Dance (Performing Arts) or Ballet (Art Forms).
 *
 * This function clears away possible content in parenthasis.
 *
 * @param content
 * @returns {boolean}
 */
export const simplifyName = (name) => {
  return name.split('(')[0].trim();
};

/**
 * Getter for LiftUpCarousels title.
 * @param content
 * @param path
 */
export const getContentLiftUpCarouselTitle = (content, path = 'field_carousel_title') => {
  return get(content, path);
};

/**
 *
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentLiftUpCarouselSlides = (content, path = 'field_carousel') => {
  const carouselData = get(content, path, []),
    slides = [],
    imageStyle = ImageStyles.SQUARE_600;

  forEach(carouselData, item => {
    const slide = {
      subtitle: '',
      title: getContentTitle(item),
      description: getContentDescription(item),
    };

    const image = getContentCoverImage(item, imageStyle);
    if (image) {
      slide.image = `url("${image}")`;
    } else {
      const placeholder = getContentCardPlaceholder(item);

      if (placeholder) {
        slide.placeholder = createElement(placeholder, {type: 'liftup-carousel'});
      }
    }

    let link = getContentPath(item);

    if (link) {
      slide.link = link;
    }

    slides.push(slide);
  });

  return slides;
};

/**
 *
 * @param content
 * @returns {function(): XML}
 */
export const getContentPlaceCardPlaceholder = content => {
  const placeType = getContentPlaceType(content);
  switch (placeType) {
    case PlaceTypes.SIGHT:
      return SeeAndDoCardPlaceholder;
    case PlaceTypes.RESTAURANT:
      return EatAndDrinkCardPlaceholder;
    case PlaceTypes.WORK_AND_STUDY:
      return WorkAndStudyCardPlaceholder;
    case PlaceTypes.SAUNA_AND_WELLNESS:
    case PlaceTypes.NATURE_AND_SPORTS:
      return SaunaAndWellnessPlaceholder;
    case PlaceTypes.CAFE:
      return CafePlaceholder;
    case PlaceTypes.ACCOMMODATION:
      return AccomondationPlaceholder;
    case PlaceTypes.BARS_AND_NIGHTLIFE:
      return BarsAndNightlifePlaceholder;
    case PlaceTypes.SHOP:
      return ShopPlaceholder;
    default:
      return SeeAndDoCardPlaceholder;
  }
};

/**
 *
 * @param content
 * @returns {*}
 */
export const getContentCardPlaceholder = content => {
  const type = getContentType(content);
  switch (type) {
    case ContentTypes.ARTICLE:
      return NewsCardPlaceholder;
    case ContentTypes.EVENT: // TODO: Add similar type of logic than "Place" has.
    case ContentTypes.ACTIVITY:
      return SeeAndDoCardPlaceholder;
    case ContentTypes.PLACE:
      return getContentPlaceCardPlaceholder(content);
    case CardTypes.COMPANY:
      return BusinessAndInvestCardPlaceholder;
    default:
      return null;
  }
};

/**
 *
 * @param content
 * @returns {*}
 */
export const getContentCardSubtitle = content => {
  const type = getContentType(content);

  switch (type) {
    case ContentTypes.ARTICLE:
      return content.created ? formatDate(Number(content.created), 'D.M.YYYY') : '';
    case ContentTypes.PLACE:
      return get(content, 'field_place_type[0].name');
    case CardTypes.COMPANY:
      return get(content, 'field_genre');
    case CardTypes.MEDIA:
    case CardTypes.INFO:
      return get(content, 'field_category');
    case ContentTypes.EVENT:
      const locationName = get(content, 'field_location_name');
      const start = get(content, 'field_start_time');
      const end = get(content, 'field_end_time');
      const dateRangeWithTime = createDateRangeWithTime(start, end);
      return locationName ? `${dateRangeWithTime} ${locationName}` : dateRangeWithTime;
    default:
      return null;
  }
};

/**
 *
 * @param content
 * @param path
 * @param style
 * @param type
 * @param showAsGrid
 * @returns {Array}
 */
export const getContentCards = (
  content,
  path = 'field_card_list',
  style = ImageStyles.CARD_275,
  type = null,
  showAsGrid = false,
) => {
  const cardListData = get(content, path, []),
    cards = [];

  let i = 1;
  forEach(cardListData, item => {
    if (item) {
      // When list is shown as a grid, every fifth item is a large one.
      if (showAsGrid) {
        const everyFifth = i % 5 === 1;
        style = everyFifth ? ImageStyles.CARD_500 : ImageStyles.CARD_275;
      }
      cards.push(getContentCard(item, style, type));
      i++;
    }
  });

  return cards;
};

/**
 *
 * @param content
 * @param style
 * @param overridedType
 * @returns {{cardType: string, detailsBackground: *, headline, link: *, subtitle: *, sustainabilityStatus: *, type: *}}
 */
export const getContentCard = (content, style = ImageStyles.CARD_275, overridedType = null) => {
  const type = overridedType || getContentType(content),
    card = {
      cardType: 'card',
      headline: getContentTitle(content),
      link: getContentPath(content),
      subtitle: getContentCardSubtitle(content),
      sustainabilityStatus: getSustainabilityStatus(content),
      type,
    };

  if (myHelsinkiHelpers.isContentAllowedListItem(content)) {
    card.showLike = true;
    card.onLike = () => {
      helpers.showAddToListModal(getContentId(content));
    };
  }

  const placeholder = getContentCardPlaceholder(content);
  if (placeholder) {
    card.placeholder = createElement(placeholder);
  }

  const rating = get(content, 'field_rating');
  if (rating) {
    card.rating = Number(rating);
  }

  const extLink = get(content, 'field_link[0].uri');
  if (extLink) {
    card.extLink = getContentLink(content);
    card.extLinkTitle = getContentLinkTitle(content);
  }

  // If this is an article and it's being shown with 'CARD_275' image-style,
  // switch into a square format ('SQUARE_275') because the image will be shown
  // as a square, instead of portrait. See /cardList/_card.scss.
  if (type === ContentTypes.ARTICLE && style === ImageStyles.CARD_275) {
    style = ImageStyles.SQUARE_275;
  }

  const image = getContentCoverImage(content, style);

  switch (type) {
    case ContentTypes.ARTICLE:
      if (image) {
        card.image = image;
      }
      break;
    case ContentTypes.THEME_PAGE:
      card.background = getThemePageCoverBackground(content, style);
      break;
    case ContentTypes.MY_HELSINKI_LOCAL_GUIDE:
      card.background = myHelsinkiHelpers.getLocalGuideCardBackground(content, style);
      break;
    case ContentTypes.MY_HELSINKI_LIST:
      card.background = myHelsinkiHelpers.getListCardBackground(content, style);
      break;
    case ContentTypes.MEDIA_CARD:
      card.link = getContentLink(content);
      if (image) {
        card.background = `url("${image}")`;
      }
      break;
    case ContentTypes.INFO_CARD:
      card.link = getContentLink(content);
      if (image) {
        card.background = `url("${image}")`;
      }
      break;
    default:
      if (image) {
        card.background = `url("${image}")`;
      }
  }

  if (content.field_heart_icon) {
    card.background = myHelsinkiHelpers.getListCardBackground(content, style);
  } else if (content.field_hero_carousel) {
    const itemContent = content.field_hero_carousel[0]
      ? content.field_hero_carousel[0].field_promotion_link
      : null;
    if (itemContent) {
      if (itemContent[0]) {
        if (itemContent[0].field_heart_icon) {
          card.background = myHelsinkiHelpers.getListCardBackground(itemContent[0], style);
        }
      }
    }
  }

  if (content.field_teaser_video) {
    const fileUrl = getDrupalFileUrl(content.field_teaser_video);
    if (fileUrl.endsWith('.mp4')) {
      card.teaserVideoUrl = fileUrl;
    }
  }
  if (content.field_teaser_video_mobile) {
    const fileUrl = getDrupalFileUrl(content.field_teaser_video_mobile);
    if (fileUrl.endsWith('.mp4')) {
      card.teaserVideoMobileUrl = fileUrl;
    }
  }

  return card;
};

/**
 *
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentProgramCards = (content, path = 'field_card_list') => {
  const cardListData = get(content, path, []),
    cards = [];

  forEach(cardListData, item => {
    const card = {
      cardType: 'card',
      headline: get(item, 'field_programme_name', null),
      isDimmed: true,
      subtitle: get(item, 'field_university_name', null),
      extLink: get(item, 'field_link[0].uri'),
      extLinkTitle: get(item, 'field_link[0].title'),
    };

    const image = getContentCoverImage(item, ImageStyles.CARD_275);
    if (image) {
      card.background = `url("${image}")`;
    }

    cards.push(card);
  });

  return cards;
};

const getSquareImageData = item => {
  return {
    type: 'square_image_liftup',
    content: {
      initialImageLeft: !!item.field_flip,
      items: item.field_square_image_liftup,
    },
  };
};

const getBannerData = item => {
  const title = get(item, 'field_title');
  const link = getContentLink(item, 'field_link[0]');
  const linkText = getContentLinkTitle(item, 'field_link[0]');
  const linkTextMobile = get(item, 'field_name', linkText);
  const iconType = get(item, 'field_icon_type');
  const colorScheme = getColorScheme(item);

  return {
    type: 'banner',
    content: {
      title,
      link,
      linkText,
      linkTextMobile,
      iconType,
      colorScheme,
    },
  };
};

const getTextData = item => {
  const value = get(item, 'field_text[0].value');

  return {
    type: 'text',
    content: {
      paragraph: {
        value
      }
    },
  };
};

const getPortraitData = item => {
  const text = get(item, 'field_details[0].value');
  const image = get(item, 'field_media[0].field_image[0].styles.card_500');
  const alt = get(item, 'field_media[0].field_image[0].title');
  const flip = get(item, 'field_flip') === '1';
  const copyright = get(item, 'field_media[0].field_copyright');

  return {
    type: 'portrait',
    text,
    image,
    alt,
    flip,
    copyright,
  };
};

const extractQuestionName = (q) => {
  // for single question there is no value field
  // for multiple questions (array) the question is in value field
  return q.value ? q.value : q;
}

const extractQuestion = (q) => {
  const question = extractQuestionName(q);
  const parts = question.split('|');
  const label = parts[0];
  const flags = parts[1] || '';
  const area = flags.includes('a');
  const halfWidth = flags.includes('h');
  const mandatory = flags.includes('m');
  return {
    label,
    area,
    halfWidth,
    mandatory,
  }
}

const getQuestionnaireData = item => {
  const description = get(item, 'field_details[0].value');
  const submitEmail = get(item, 'field_email');
  const buttonLabel = get(item, 'field_name');
  const consentShort = get(item, 'field_consent');
  const consentLink = get(item, 'field_plain');
  const consentLong = get(item, 'field_consent_description');
  const thankYou = get(item, 'field_text[0].value');
  const colorScheme = getColorScheme(item);

  const questionsFromJson = get(item, 'field_question');
  const questions = [].concat(questionsFromJson || []); // make sure it's always an array
  const questionList = questions
    .map(extractQuestion);

  return {
    type: 'questionnaire',
    description,
    submitEmail,
    buttonLabel,
    consentShort,
    consentLink,
    consentLong,
    thankYou,
    colorScheme,
    questionList,
  };
};

/**
 * Get 'content' elements (aka paragraphs) for the Paragraphs component.
 *
 * @param {Object} content
 * @returns {Array}
 *
 * @todo Get rid of code duplication by combining getContentParagraphs() and
 *   getContentGenericSubPage(). Both functions are doing the same thing, only
 *   the source field is different.
 */
export const getContentParagraphs = content => {
  const paragraphsData = get(content, 'field_paragraphs', []),
    paragraphs = [];

  forEach(paragraphsData, item => {
    switch (getContentType(item)) {
      case ParagraphTypes.TEXT:
        paragraphs.push({
          type: ParagraphTypes.TEXT,
          value: get(item, 'field_text[0].value'),
        });
        break;
      case ParagraphTypes.MEDIA:
        const landscapeFormat = get(item, 'field_show_in_landscape_format', '0') === '1';
        const mediaImageStyle = landscapeFormat ? ImageStyles.HERO_IMAGE : ImageStyles.COLUMN_FULL;
        paragraphs.push({
          type: ParagraphTypes.MEDIA,
          src: get(item, `field_media[0].field_image[0].styles.${mediaImageStyle}`),
          title: get(item, 'field_media[0].field_image[0].title'),
          copyright: get(item, 'field_media[0].field_copyright'),
          source: get(item, 'field_media[0].field_source'),
          alt: get(item, 'field_media[0].field_image[0].alt'),
        });
        break;
      case ParagraphTypes.VIDEO:
        // @todo Consider using getContentVideo() helper function.
        paragraphs.push({
          type: ParagraphTypes.VIDEO,
          content: [
            {
              video: get(item, 'field_media[0].field_media_video_embed_field'),
              description: get(item, 'field_caption'),
            },
          ],
        });
        break;
      case ParagraphTypes.QUOTE:
        paragraphs.push({
          type: ParagraphTypes.QUOTE,
          quote: getContentQuote(item),
        });
        break;
      case ParagraphTypes.ACCORDION:
        const accordion = {
          title: get(item, 'field_accordion_title', ''),
          body: get(item, 'field_text[0].value', ''),
        };
        console.log(accordion);
        paragraphs.push({
          type: ParagraphTypes.ACCORDION,
          title: get(item, 'field_accordion_title', ''),
          body: get(item, 'field_text[0].value', ''),
        });
        break;
      case ParagraphTypes.SMALL_CARD:
        const items = get(item, 'field_small_card_items'),
          imageStyle = ImageStyles.SQUARE_150;
        if (Array.isArray(items)) {
          items.map(card => {
            const image = getContentCoverImage(card, imageStyle);
            const paragraph = {
              type: ParagraphTypes.SMALL_CARD,
              title: get(card, 'title'),
              link: getContentPath(card),
              image: image ? `url(${image})` : null,
              header: searchHelpers.getSearchItemHeader(card),
              location:
                get(card, 'field_street_address') || get(card, 'field_location_street_address'),
            };

            const placeholder = getContentCardPlaceholder(card);
            if (placeholder) {
              paragraph.placeholder = createElement(placeholder, {type: 'search-item'});
            }

            if (myHelsinkiHelpers.isContentAllowedListItem(card)) {
              paragraph.onHeartClick = () => {
                helpers.showAddToListModal(get(card, 'nid'));
              };
            }
            paragraphs.push(paragraph);
          });
        }

        // @todo Get rid of this code duplication. The code inside this
        //   else-statement is 99% same as in the if-statement above.
        else if (typeof items == 'object') {
          Object.values(items).map(card => {
            const image = getContentCoverImage(card, imageStyle);
            const paragraph = {
              type: ParagraphTypes.SMALL_CARD,
              title: get(card, 'title'),
              link: getContentPath(card),
              image: image ? `url(${image})` : null,
              header: searchHelpers.getSearchItemHeader(card),
              location:
                get(card, 'field_street_address') || get(card, 'field_location_street_address'),
            };

            const placeholder = getContentCardPlaceholder(card);
            if (placeholder) {
              paragraph.placeholder = createElement(placeholder, {type: 'search-item'});
            }

            if (myHelsinkiHelpers.isContentAllowedListItem(card)) {
              paragraph.onHeartClick = () => {
                helpers.showAddToListModal(get(card, 'nid'));
              };
            }
            paragraphs.push(paragraph);
          });
        }
        break;
      case ParagraphTypes.INSTAGRAM:
        paragraphs.push({
          type: ParagraphTypes.INSTAGRAM,
          url: get(item, 'field_media[0].field_url[0].uri'),
        });
        break;
      case ParagraphTypes.TWITTER:
        let name = get(item, 'field_media[0].name');
        if (name) {
          name = name.split(' - ');
          paragraphs.push({
            type: ParagraphTypes.TWITTER,
            id: name[1],
          });
        }
        break;
      case ParagraphTypes.CARD_LIST:
        const cards = getContentCards(item, 'field_card_list');
        if (cards.length)
          paragraphs.push({
            type: ParagraphTypes.CARD_LIST,
            title: get(item, 'field_title'),
            description: get(item, 'field_card_list_description'),
            items: cards,
            seeAllLink: getContentLink(item, 'field_link[0]'),
            seeAllLinkText: getContentLinkTitle(item, 'field_link[0]'),
            cardDefaults: {isDimmed: true},
            colorScheme: getColorScheme(item),
          });
        break;
      case ParagraphTypes.RICH_CARD_LIST:
        const heroColour = get(content, 'field_hero_colour[0].field_hexadecimal_value');
        const richCards = getContentRichBlocks(item, 'field_rich_card_list');
        if (richCards.length)
          paragraphs.push({
            type: ParagraphTypes.RICH_CARD_LIST,
            items: richCards,
            themeColor: heroColour,
          });
        break;
      case ParagraphTypes.LOCATION_CAROUSEL:
        const carouselItems = getContentLocationCarouselItems(item);
        if (carouselItems.length)
          paragraphs.push({
            type: ParagraphTypes.LOCATION_CAROUSEL,
            items: carouselItems,
            content: {
              title: get(item, 'field_title'),
              seeAllLink: getContentLink(item, 'field_link[0]'),
              seeAllLinkText: getContentLinkTitle(item, 'field_link[0]'),
            },
          });
        break;
      case ParagraphTypes.LEAD_TEXT:
        const leadText = get(item, 'field_lead_text');
        if (leadText) {
          paragraphs.push({
            type: ParagraphTypes.LEAD_TEXT,
            value: leadText,
            colorScheme: getColorScheme(item),
          });
        }
        break;
      case ParagraphTypes.SIMPLE_LIFTUP:
        const simpleLiftup = getContentSimpleLiftUpProps(item);
        if (simpleLiftup) {
          paragraphs.push({
            type: ParagraphTypes.SIMPLE_LIFTUP,
            title: simpleLiftup.title,
            link: simpleLiftup.link,
            image: simpleLiftup.image,
            backgroundImage: simpleLiftup.backgroundImage,
            colorScheme: getColorScheme(item),
            flip: Number(get(item, 'field_flip')),
          });
        }
        break;
      case ParagraphTypes.VIDEO_CAROUSEL:
        const videoSlides = getVideoCarouselSlides(item);
        let colorScheme = getColorScheme(item);
        if (!get(colorScheme, 'background')) {
          colorScheme.background = Colors.HEL_ENGEL;
        }
        if (videoSlides.length)
          paragraphs.push({
            type: ParagraphTypes.VIDEO_CAROUSEL,
            slides: videoSlides,
            background: Colors.HEL_ENGEL,
            colorScheme: colorScheme,
          });
        break;
      case ParagraphTypes.SUSTAINABILITY_SERVICE_LIFTUP:
        paragraphs.push({
          type: ParagraphTypes.SUSTAINABILITY_SERVICE_LIFTUP,
          details: get(item, 'field_sustainability_service.sustainability_details'),
          flip: Number(get(item, 'field_flip')),
          image: getContentCoverImage(item, ImageStyles.SQUARE_600),
          text: get(item, 'field_text[0].value'),
          title: get(item, 'field_title'),
        });
        break;
      case ParagraphTypes.SQUARE_IMAGE_LIFTUP:
        paragraphs.push(getSquareImageData(item));
        break;
      case ParagraphTypes.BANNER:
        paragraphs.push(getBannerData(item));
        break;
      case ParagraphTypes.TEXT:
        paragraphs.push(getTextData(item));
      case ParagraphTypes.HSL_WIDGET:
        paragraphs.push({type: 'hsl_widget'});
        break;
      case ParagraphTypes.PORTRAIT:
        paragraphs.push(getPortraitData(item));
      case ParagraphTypes.CONTENT_SLIDESHOW:
        const slidesData = get(item, 'field_slides');
        paragraphs.push({
          type: ParagraphTypes.CONTENT_SLIDESHOW,
          slides: getContentSlideshowItems(item),
        });
        break;
      case ParagraphTypes.QUESTIONNAIRE:
        paragraphs.push(getQuestionnaireData(item));
        break;
      case ParagraphTypes.EMBEDDED_VIDEO:
        paragraphs.push({
          type: 'embedded_video',
          videoUrl: get(item, 'field_video_url'),
          width: get(item, 'field_width'),
          height: get(item, 'field_height'),
          colorBackground: get(ColorNameMapping, get(item, 'field_color_background[0]', null), null),
          colorBackground2: get(ColorNameMapping, get(item, 'field_color_background_2[0]', null), null)
        });

        break;
      default:
        console.error(`getContentParagraphs: unknown paragraph type ${paragraphs.type}`);
    }
  });

  return paragraphs;
};

/**
 * Get 'content' elements (paragraphs) for the GenericSubPage component.
 *
 * @param {Object} content
 * @returns {Array}
 *
 * @todo Get rid of code duplication by combining getContentParagraphs() and
 *   getContentGenericSubPage(). Both functions are doing the same thing with
 *   only minor differences.
 */
export const getContentGenericSubPage = content => {
  const fieldData = get(content, 'field_content', []),
    fields = [];

  forEach(fieldData, item => {
    switch (getContentType(item)) {
      case ParagraphTypes.CARD_LIST:
        const cards = getContentCards(item, 'field_card_list');
        if (cards.length)
          fields.push({
            type: ParagraphTypes.CARD_LIST,
            title: get(item, 'field_title'),
            description: get(item, 'field_card_list_description'),
            items: cards,
            seeAllLink: getContentLink(item, 'field_link[0]'),
            seeAllLinkText: getContentLinkTitle(item, 'field_link[0]'),
            cardDefaults: {isDimmed: true},
            colorScheme: getColorScheme(item),
          });
        break;
      case ParagraphTypes.BIG_CARD_LIST:
        const bigCards = getContentCards(item, 'field_big_card_list');
        if (bigCards.length)
          fields.push({
            type: ParagraphTypes.BIG_CARD_LIST,
            items: bigCards,
          });
        break;
      case ParagraphTypes.GRID_CARD_LIST:
        const showAsGrid = true;
        const items = getContentCards(
          item,
          'field_grid_card_list',
          ImageStyles.CARD_275,
          null,
          showAsGrid,
        );
        if (items.length)
          fields.push({
            type: ParagraphTypes.GRID_CARD_LIST,
            title: get(item, 'field_title'),
            description: get(item, 'field_card_list_description'),
            links: getContentLinks(item, 'field_link'),
            items: items,
            showAsGrid: showAsGrid,
            colorScheme: getColorScheme(item),
            cardDefaults: {isDimmed: true},
          });
        break;
      case ParagraphTypes.LEAD_TEXT:
        const leadText = get(item, 'field_lead_text');
        if (leadText) {
          fields.push({
            type: ParagraphTypes.LEAD_TEXT,
            value: leadText,
            colorScheme: getColorScheme(item),
          });
        }
        break;
      case ParagraphTypes.LIFTUP_COLLECTION:
        const liftups = getContentLiftUpCollectionItems(item);
        fields.push({
          type: ParagraphTypes.LIFTUP_COLLECTION,
          items: liftups,
        });
        break;
      case ParagraphTypes.LOCATION_CAROUSEL:
        const carouselItems = getContentLocationCarouselItems(item);
        if (carouselItems.length)
          fields.push({
            type: ParagraphTypes.LOCATION_CAROUSEL,
            items: carouselItems,
            content: {
              title: get(item, 'field_title'),
              seeAllLink: getContentLink(item, 'field_link[0]'),
              seeAllLinkText: getContentLinkTitle(item, 'field_link[0]'),
            },
          });
        break;
      case ParagraphTypes.QUOTE:
        const quote = getContentSimpleQuote(item, 'field_quote[0]');
        if (quote)
          fields.push({
            type: ParagraphTypes.QUOTE,
            quote: quote,
          });
        break;
      case ParagraphTypes.SIMPLE_LIFTUP:
        const simpleLiftup = getContentSimpleLiftUpProps(item);
        if (simpleLiftup) {
          fields.push({
            type: ParagraphTypes.SIMPLE_LIFTUP,
            title: simpleLiftup.title,
            link: simpleLiftup.link,
            image: simpleLiftup.image,
            backgroundImage: simpleLiftup.backgroundImage,
            colorScheme: getColorScheme(item),
            flip: Number(get(item, 'field_flip')),
          });
        }
        break;
      case ParagraphTypes.TAGS_CONTAINER:
        const tags = getContentTags(content);
        if (tags) {
          fields.push({
            type: ParagraphTypes.TAGS_CONTAINER,
            tags: tags,
          });
        }
        break;
      case ParagraphTypes.VIDEO_CAROUSEL:
        const videoSlides = getVideoCarouselSlides(item);
        let colorScheme = getColorScheme(item);
        if (!get(colorScheme, 'background')) {
          colorScheme.background = Colors.HEL_ENGEL;
        }
        if (videoSlides.length)
          fields.push({
            type: ParagraphTypes.VIDEO_CAROUSEL,
            slides: videoSlides,
            background: Colors.HEL_ENGEL,
            colorScheme: colorScheme,
          });
        break;
      case ParagraphTypes.SQUARE_IMAGE_LIFTUP:
        fields.push(getSquareImageData(item));
        break;
      case ParagraphTypes.BANNER:
        fields.push(getBannerData(item));
        break;
      case ParagraphTypes.TEXT:
        fields.push(getTextData(item));
        break;
      case ParagraphTypes.HSL_WIDGET:
        fields.push({type: 'hsl_widget'});
        break;
      case ParagraphTypes.PORTRAIT:
        fields.push(getPortraitData(item));
        break;
      case ParagraphTypes.QUESTIONNAIRE:
        fields.push(getQuestionnaireData(item));
        break;
      case ParagraphTypes.CONTENT_SLIDESHOW:
        fields.push({
          type: ParagraphTypes.CONTENT_SLIDESHOW,
          slides: getContentSlideshowItems(item),
        });
        break;
      case ParagraphTypes.LISTING:
        console.log('item', item);
        fields.push({
          type: ParagraphTypes.LISTING,
          categoryFilters: get(item, 'field_listing_category_filter'),
          showDateFilters: get(item, 'field_listing_show_date_filters') === '1',
        })
        break;
      default:
        console.error(`getContentGenericSubPage: unknown element type: ${getContentType(item)}`);
    }
  });

  return fields;
};

/**
 * Get colour scheme.
 *
 * Returns a color scheme definition which includes CSS values for background,
 * text color, and button color. Background can be a 'linear-gradient()' or a
 * hexadecimal color code. Text color and button color are hexadecimal color
 * codes.
 *
 * @param content
 * @returns {{background: String, text: String, button: String}}
 */
export const getColorScheme = content => {
  const colorNameBg1 = get(content, 'field_color_background[0]'),
    colorNameBg2 = get(content, 'field_color_background_2[0]'),
    colorNameText = get(content, 'field_color_text[0]'),
    colorNameButton = get(content, 'field_color_button[0]');

  let colorCodeBg1 = get(ColorNameMapping, colorNameBg1, null),
    colorCodeBg2 = get(ColorNameMapping, colorNameBg2, null),
    colorCodeText = get(ColorNameMapping, colorNameText, null),
    colorCodeButton = get(ColorNameMapping, colorNameButton, null);

  let colorScheme = {
    background: null,
    text: null,
    button: null,
  };

  // Background.
  if (colorCodeBg1) {
    colorScheme.background = colorCodeBg1;
  }
  if (colorCodeBg1 && colorCodeBg2) {
    colorScheme.background = `linear-gradient(to right, ${colorCodeBg1} 50%, ${colorCodeBg2} 50% 100%)`;
  }

  // Text color: Explicit, or based on background.
  if (colorCodeText) {
    colorScheme.text = colorCodeText;
  } else {
    const textColorBasedOnBackground = get(TextColorMap, colorCodeBg1, null);
    if (textColorBasedOnBackground === TextColors.LIGHT) {
      colorScheme.text = 'white';
    }
  }

  // Button.
  if (colorCodeButton) {
    colorScheme.button = colorCodeButton;
  }

  return colorScheme;
};

export const useBlackTextForHeroBackground = heroBackground => {
  // No background is transparent or white
  if (!heroBackground) return true;

  if (typeof heroBackground !== 'string') {
    return false;
  }

  const lowerCaseHeroBackground = typeof heroBackground === 'string' ? heroBackground.toLowerCase() : heroBackground;
  return HeroBlackTextBackgroundColors.includes(lowerCaseHeroBackground);
}

/**
 *
 * @param content
 * @param imageStyle
 * @returns {{name: *, mail: *, image: *}}
 */
export const getContentAuthor = (content, imageStyle = ImageStyles.SQUARE_150) => {
  const authorData = get(content, 'uid[0]'),
    name = get(authorData, 'field_name');

  return {
    name: name ? name : get(authorData, 'name'),
    title: get(authorData, 'field_title', null),
    image: get(authorData, `user_picture[0].styles.${imageStyle}`),
  };
};

/**
 *
 * @param content
 * @param path
 * @param imageStyle
 * @returns {*}
 */
export const getContentQuote = (
  content,
  path = 'field_quote[0]',
  imageStyle = ImageStyles.SQUARE_150,
) => {
  const quoteData = get(content, path);

  if (!quoteData) {
    return null;
  }

  const title = get(quoteData, 'field_title');
  const text = get(quoteData, 'field_source');
  const sourceImage = get(quoteData, `field_source_image[0].field_image[0].styles.${imageStyle}`);

  return {
    body: get(quoteData, 'body[0].value'),
    sourceTitle: title,
    sourceText: text,
    sourceImage: sourceImage ? sourceImage : null,
  };
};

/**
 *
 * @param content
 * @param path
 * @returns {*}
 *
 * @todo Refactor code to use getContentQuote() and then remove this function.
 */
export const getContentSimpleQuote = (content, path = 'field_simple_quote[0]') => {
  const quoteData = get(content, path);

  if (!quoteData) {
    return null;
  }

  const title = get(quoteData, 'field_title');
  const text = get(quoteData, 'field_source');
  const imageStyle =
    title || text ? ImageStyles.SQUARE_150 : ImageStyles.THUMBNAIL_ASPECT_PRESERVED;
  const sourceImage = get(quoteData, `field_source_image[0].field_image[0].styles.${imageStyle}`);

  return {
    body: get(quoteData, 'body[0].value'),
    sourceTitle: title,
    sourceText: text,
    sourceImage: sourceImage ? sourceImage : null,
  };
};

export const getContentTwitterId = content => {
  const uri = get(content, 'field_twitter[0].field_url[0].uri');

  if (!uri) {
    return null;
  }

  const split = String(uri).split('/');
  return split[split.length - 1];
};

export const getContentTwitterQuote = content => {
  const twitterQuoteData = get(content, 'twitterData.tweets'),
    twitterQuote = {};

  if (!twitterQuoteData) {
    return null;
  }

  const html = get(twitterQuoteData, 'html'),
    authorUrl = get(twitterQuoteData, 'author_url'),
    tweetUrl = get(twitterQuoteData, 'url');
  if (html) {
    // Parse Tweet content from the html
    let twitterText = html
      .match(/<p(.*?)<\/p>/g)[0]
      .replace(/<p(.*?)>/, '')
      .replace(/<\/p>/, '');
    const textAnchors = twitterText.match(/<a(.*?)<\/a>/g);
    if (textAnchors && textAnchors[textAnchors.length - 1].includes('pic.twitter.com')) {
      twitterText = twitterText.replace(textAnchors[textAnchors.length - 1], '');
    }
    twitterQuote.text = helpers.addTargetBlankToAnchors(twitterText);

    // Parse Tweet author from the html
    const twitterAuthorTemp = html
      .match(/&mdash(.*?)<a/g)[0]
      .replace(/&mdash;/g, '')
      .replace('<a', '');
    const twitterAuthor = twitterAuthorTemp
      .match(/\((.*?)\)/)[0]
      .replace(/\(/g, '')
      .replace(/\)/g, '');
    twitterQuote.author = twitterAuthor;
  }
  twitterQuote.authorUrl = authorUrl;
  twitterQuote.tweetUrl = tweetUrl;

  return twitterQuote;
};

/**
 *
 * @param content
 * @param imageStyle
 * @returns {*}
 */
export const getContentCTAProps = (content, imageStyle = ImageStyles.SQUARE_275) => {
  const data = get(content, 'field_call_to_action[0]'),
    linkData = get(data, 'field_link[0]');

  if (!data) {
    return null;
  }

  // TODO: Make this logic more solid and generic, in other words improve it :).
  // This logic should probably be inside a some kind of generic getter function,
  // so it can be used everywhere where we are getting image urls.
  const image = get(data, `field_media[0].field_image[0]`);

  let imageUrl = null;
  if (image) {
    imageUrl =
      image.filemime === 'image/gif'
        ? getDrupalUrl(get(image, 'url'))
        : get(image, `styles.${imageStyle}`);
  }

  let link = null;
  if (linkData) {
    const linkText = get(linkData, 'title'),
      linkLink = getContentLink(data, 'field_link[0]');

    if (linkText && linkLink) {
      link = {
        text: get(linkData, 'title'),
        link: getContentLink(data, 'field_link[0]'),
      };
    }
  }

  const text = get(data, 'field_plain', '');

  if (!imageUrl && !text) {
    return null;
  }

  return {
    image: imageUrl,
    color: get(data, 'field_background_colour', '#7FEBD3'),
    text: text,
    link: link,
  };
};

/**
 * @param content
 * @param path
 * @returns {*}
 */
export const getContentCTABlockProps = (content, path = 'field_cta_box[0]') => {
  const data = get(content, path),
    linkData = get(data, 'field_link[0]');

  if (!data) {
    return null;
  }

  let link = null;
  if (linkData) {
    const linkText = get(linkData, 'title'),
      linkLink = getContentLink(data, 'field_link[0]');

    if (linkText && linkLink) {
      link = {
        text: get(linkData, 'title'),
        link: getContentLink(data, 'field_link[0]'),
      };
    }
  }

  return {
    color: get(data, 'field_background_colour', '#7FEBD3'),
    text: get(data, 'field_title', ''),
    link: link,
  };
};

/**
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentRichBlocks = (content, path = 'field_rich_block') => {
  const richBlockData = get(content, path),
    richBlocks = [];

  forEach(richBlockData, item => {
    const richBlock = {
      title: getContentTitle(item),
      body: getContentRichBlockBody(item, false),
      link: getContentPath(item),
    };

    // @todo Consider using another image-style. Needs a 575x355 image.
    const image = getContentCoverImage(item, ImageStyles.SQUARE_600);
    if (image) {
      richBlock.image = image;
    }

    const summary = getContentRichBlockBody(item, true);
    if (summary) {
      richBlock.summary = summary;
    }

    const placeholder = getContentCardPlaceholder(item);
    if (placeholder) {
      richBlock.placeholder = createElement(placeholder, {type: 'rich-block'});
    }

    if (myHelsinkiHelpers.isContentAllowedListItem(item)) {
      richBlock.showLike = true;
      richBlock.onLike = () => {
        helpers.showAddToListModal(getContentId(item));
      };
    }
    const color = getContentColor(item);
    if (color) {
      richBlock.color = color;
    }

    const sustainabilityStatus = get(item, 'field_sustainability_info.sustainability_status');
    if (sustainabilityStatus) {
      richBlock.sustainabilityStatus = sustainabilityStatus;
    }

    richBlocks.push(richBlock);
  });

  return richBlocks;
};

/**
 * @param content
 * @param summary
 * @returns {*}
 */
export const getContentRichBlockBody = (content, summary = false) => {
  const paths = [
    'body[0]',
    'field_text_with_summary[0]',
    'field_teaser_text',
    'field_description',
    'field_formatted_description[0]',
  ];

  let body = null;
  forEach(paths, path => {
    const tmpBody = get(content, path);

    if (tmpBody) {
      if (isString(tmpBody)) {
        body = tmpBody;
      } else {
        const value = get(tmpBody, 'value');
        body = summary ? get(tmpBody, 'summary', value) : value;
      }

      return false;
    }
  });

  return body;
};

/**
 * @param content
 * @returns {*}
 */
export const getContentCoordinates = content => {
  const geolocationData = get(content, 'field_geolocation[0]');

  return geolocationData
    ? {
      lat: Number(geolocationData.lat),
      lng: Number(geolocationData.lng),
    }
    : DefaultCoordinates;
};

/**
 * @param content
 * @returns {Array}
 */
export const getContentLocationCarouselItems = content => {
  const paths = ['field_location_carousel_comments', 'field_location_carousel'],
    items = [];

  // @todo Consider using another image-style. Needs a 375x225 image.
  const imageStyle = ImageStyles.SQUARE_600;

  forEach(paths, path => {
    const locationCarouselData = get(content, path);

    if (locationCarouselData) {
      let i = 0;
      forEach(locationCarouselData, item => {
        const location =
          path === 'field_location_carousel_comments' ? get(item, 'field_location[0]') : item;

        if (location) {
          const card = {
            id: location.nid,
            image: getContentCoverImage(location, imageStyle),
            title: `${++i}. ${getContentTitle(location)}`,
            description: getContentDescription(item),
            coordinates: getContentCoordinates(location),
            link: getContentPath(location),
            linkText: getContentLocationCarouselItemLinkText(location),
            sustainabilityStatus: getSustainabilityStatus(location),
          };

          const placeholder = getContentCardPlaceholder(location);
          if (placeholder) {
            card.placeholder = createElement(placeholder, {type: 'location-carousel-card'});
          }

          if (myHelsinkiHelpers.isContentAllowedListItem(location)) {
            card.showLike = true;
            card.onLike = () => {
              helpers.showAddToListModal(getContentId(location));
            };
          }
          items.push(card);
        }
      });

      return false;
    }
  });

  return items;
};

/**
 * @param content
 */
export const getContentLocationCarouselItemLinkText = content => {
  const type = getContentType(content);
  switch (type) {
    case ContentTypes.EVENT:
      return i18n.t('locationCarousel:eventLinkText');
    case ContentTypes.ACTIVITY:
      return i18n.t('locationCarousel:activityLinkText');
    case ContentTypes.PLACE:
      return i18n.t('locationCarousel:placeLinkText', {
        placeType: getContentPlaceTypeName(content),
      });
    default:
      return i18n.t('locationCarousel:defaultLinkText');
  }
};

/**
 * @param coordinates
 * @returns {{lat: number, lng: number}}
 */
export const getCenterFromCoordinates = coordinates => {
  const count = coordinates.length;
  let lat = 0,
    lng = 0;

  forEach(coordinates, coordinate => {
    lat += Number(coordinate.lat);
    lng += Number(coordinate.lng);
  });

  return {
    lat: lat / count,
    lng: lng / count,
  };
};

/**
 * @param coordinates
 * @returns {number}
 */
export const getMaxDistanceFromCoordinates = coordinates => {
  let maxDistance = 0;

  const toRadians = degrees => {
    return degrees * (Math.PI / 180);
  };

  forEach(coordinates, coordinate => {
    forEach(coordinates, coordinate2 => {
      const R = 6371e3; // metres
      const φ1 = toRadians(coordinate.lat);
      const φ2 = toRadians(coordinate2.lat);
      const Δφ = toRadians(coordinate2.lat - coordinate.lat);
      const Δλ = toRadians(coordinate2.lng - coordinate.lng);
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.asin(Math.sqrt(a));

      const d = R * c;
      if (d > maxDistance) {
        maxDistance = d;
      }
    });
  });
  return maxDistance;
};

/**
 * @param content
 * @returns {Array}
 */
export const getVideoCarouselSlides = (
  content,
  path: string = 'field_video_carousel',
  descriptionPath: string = 'field_video_description[0].value',
) => {
  const videoCarouselData = get(content, path),
    slides = [];

  forEach(videoCarouselData, item => {
    slides.push({
      video: getContentVideo(item),
      title: get(item, 'title'),
      description: get(item, descriptionPath),
    });
  });

  return slides;
};

export const getContentLinkListItems = (content, path = 'field_link_list') => {
  const linkListData = get(content, path, []),
    items = [];

  forEach(linkListData, categoryItem => {
    const category = {
      title: get(categoryItem, 'field_title'),
      links: [],
    };

    forEach(get(categoryItem, 'field_link', []), (linkItem, linkIndex) => {
      category.links.push({
        title: get(linkItem, 'title'),
        link: getContentLink(categoryItem, `field_link[${linkIndex}]`),
      });
    });

    items.push(category);
  });

  return items;
};

export const getContentSlideshowItems = item => {
  const slidesData = get(item, 'field_slides');
  if (!slidesData) {
    return [];
  }

  const imageStyle = ImageStyles.CONTENT_SLIDESHOW_ITEM;
  const slides = slidesData.map(slide => {
    return {
      actionLink: get(slide, 'field_action_link[0]'),
      image: get(slide, `field_image[0].styles.${imageStyle}`),
      text: get(slide, 'field_text[0].value'),
      title: get(slide, 'field_title'),
      flipImageSide: get(slide, 'field_flip') === '1',
    };
  });
  return slides;
};

export const getContentTextCarouselItems = (content, path = 'field_text_carousel') => {
  const textCarouselData = get(content, path, []),
    items = [];

  forEach(textCarouselData, itemData => {
    const title = get(itemData, 'field_title'),
      bigText = get(itemData, 'field_big_text_highlight'),
      source = get(itemData, 'field_source');
    if (title || bigText || source) {
      items.push({
        title: title,
        bigText: bigText,
        source: source,
      });
    }
  });

  return items;
};

/**
 *
 * @param content
 * @param path
 * @param imageStyle
 * @returns {Array}
 */
export const getContentImageCarouselItems = (
  content,
  path = 'field_image_carousel',
  imageStyle = ImageStyles.SQUARE_600,
) => {
  const imageCarouselData = get(content, path, []),
    items = [];

  forEach(imageCarouselData, itemData => {
    items.push({
      title: get(itemData, 'field_title'),
      image: get(itemData, `field_media[0].field_image[0].styles.${imageStyle}`),
    });
  });

  return items;
};

/**
 *
 * @param content
 * @returns {Array}
 */
export const getAccordionGroups = content => {
  const paragraphData = get(content, 'field_paragraphs'),
    accordionGroups = [];

  const getAccordionGroupTitle = accordionData => {
    let title = '';

    forEach(accordionData, item => {
      const fieldPlain = get(item, 'field_plain', '');
      if (fieldPlain) {
        title = fieldPlain;
      }
    });

    return title;
  };

  const getAccordions = accordionData => {
    const accordions = [];

    forEach(accordionData, item => {
      const isGroupTitle = get(item, 'field_plain', undefined) !== undefined;
      if (isGroupTitle) {
        return;
      }

      const accordion = {
        title: get(item, 'field_accordion_title', ''),
        body: get(item, 'field_text[0].value', ''),
      };

      const icon = get(item, 'field_media[0].field_image[0].styles.square_150');

      if (icon) {
        accordion.icon = icon;
      }

      const sourceIcon = get(item, 'field_source_icon[0].field_image[0].styles.square_150');
      if (sourceIcon) {
        accordion.sourceIcon = sourceIcon;
      }
      const sourceText = get(item, 'field_source_text');
      const sourceTitle = get(item, 'field_source_title');
      accordion.sourceText = sourceText ? sourceText : '';
      accordion.sourceTitle = sourceTitle ? sourceTitle : '';
      accordions.push(accordion);
    });

    return accordions;
  };

  forEach(paragraphData, paragraph => {
    const accordionData = get(paragraph, 'field_accordion');
    if (accordionData) {
      accordionGroups.push({
        title: getAccordionGroupTitle(accordionData),
        accordions: getAccordions(accordionData),
      });
    }
  });

  return accordionGroups;
};

/**
 *
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContentQuoteCarouselItems = (content, path = 'field_quote_carousel') => {
  const quoteCarouselData = get(content, path, []);

  return quoteCarouselData
    ? quoteCarouselData.map(itemData => {
      return {
        title: getContentTitle(itemData),
        fieldTitle: get(itemData, 'field_title'),
        body: get(itemData, 'body[0].value'),
        source: get(itemData, 'field_source'),
      };
    })
    : [];
};

/**
 *
 * @param content
 * @param path
 * @returns {Array}
 */
export const getStaffUnits = (content, path = 'field_staff_units') => {
  const staffUnitData = get(content, path, []),
    units = [];

  if (!staffUnitData) {
    return null;
  }

  forEach(staffUnitData, singleUnit => {
    const singleUnitData = get(singleUnit, 'field_staff_member', []),
      members = [];

    forEach(singleUnitData, member => {
      members.push({
        title: get(member, 'field_job_title'),
        name: get(member, 'field_name'),
        phone: get(member, 'field_telephone'),
        email: get(member, 'field_email'),
      });
    });

    units.push({
      title: get(singleUnit, 'field_title'),
      details: get(singleUnit, 'field_details[0].value'),
      items: members,
    });
  });

  return units;
};

export const getContentSectionPageItems = (content, path = 'pages') => {
  const pagesData = get(content, path, []),
    items = [];

  forEach(pagesData, page => {
    const coverImage = getContentCoverImage(page, ImageStyles.SQUARE_600);

    items.push({
      title: getContentTitle(page),
      link: getContentPath(page),
      background: coverImage ? `url("${coverImage}") ${Colors.HEL_SILVER}` : Colors.HEL_SILVER,
    });
  });

  return items;
};

/**
 *
 * @param content
 * @param path
 * @returns {Array}
 */
export const getContactCards = (content, path = 'field_contact_cards') => {
  const cardListData = get(content, path, []),
    cards = [],
    imageStyle = ImageStyles.SQUARE_150;

  if (!cardListData) {
    return null;
  }

  forEach(cardListData, item => {
    const card = {
      image: getContentCoverImage(item, imageStyle),
      title: get(item, 'field_job_title'),
      name: get(item, 'field_name'),
      phone: get(item, 'field_telephone'),
      email: get(item, 'field_email'),
    };

    cards.push(card);
  });

  return cards;
};

/**
 * Checks if content is published.
 * @param content
 * @returns {boolean}
 */
export const isContentPublished = content => {
  const status = get(content, 'status', '0');

  return Boolean(Number(status));
};

export const isContentAuthorVisible = content => {
  return Boolean(Number(get(content, 'field_show_author_name', '0')));
};

export const getContentUserId = content => {
  return Number(get(content, 'uid[0].uid'));
};

export const getThemePageCoverColor = (content, defaultTo = '#ffffff') => {
  return get(content, 'field_hero_colour[0].field_hexadecimal_value') || defaultTo;
};

/**
 * @param content
 * @param imageStyle
 * @param defaultTo
 * @returns {string}
 */
export const getThemePageCoverBackground = (
  content,
  imageStyle = ImageStyles.HERO_IMAGE,
  defaultTo = '#ffffff',
) => {
  const cover = getContentCoverImage(content, imageStyle),
    heroColor = getThemePageCoverColor(content, defaultTo);

  if (cover) {
    return `url("${cover}")`;
  }

  return heroColor;
};

/**
 * @param content
 * @returns {string}
 */
export const getThemePageCoverTextColor = content => {
  const cover = getContentCoverImage(content),
    heroColor = getThemePageCoverColor(content, null);

  if (!cover && !heroColor) {
    return Colors.HEL_BLACK;
  }

  return '#ffffff';
};

/**
 * @param content
 * @returns {string}
 */
export const stripHtml = content => {
  const strippedContent = content ? content.replace(/(<([^>]+)>)/gi, '') : '';

  return strippedContent;
};

export const getFrontendUrl = () => {
  return `${PROTOCOL}:${FRONTEND_URL}`;
};

export const getCanonicalUrl = content => {
  if (content) {
    const contentPath = getContentPath(content);
    if (contentPath) {
      return `${getFrontendUrl()}${contentPath}`;
    }
  }
  return false;
};

/**
 * Get sustainability status.
 *
 * @param content
 * @returns {boolean}
 */
export const getSustainabilityStatus = content => {
  return get(content, 'field_sustainability_info.sustainability_status');
};
