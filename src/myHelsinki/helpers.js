import get from 'lodash/get';
import forEach from 'lodash/forEach';
import indexOf from 'lodash/indexOf';

import {
  MyHelsinkiListAllowedContentTypes,
  MyHelsinkiHeartColors,
  Colors,
  ImageStyles,
  ContentTypes,
} from '../constants';
import * as contentHelpers from '../content/helpers';

/**
 * @param number
 * @param color
 * @returns {*}
 */
export const getHeartIcon = (number, color = MyHelsinkiHeartColors.WHITE) => {
  if (!number) {
    return null;
  }

  const icon = require(`../../assets/images/heart-icons/${color}/heart-${number}.svg`).default;
  const protocol = global.IS_CLIENT ? window.location.protocol : global.PROTOCOL;

  if (icon.search('http:') === 0 || icon.search('https:') === 0) {
    return icon;
  }

  return `${protocol}${icon.search('//') === 0 ? '' : '//'}${icon}`;
};

/**
 * @returns {*}
 */
export const getBlueThinkSustainablyIcon = () => {
  const icon = require('../../assets/images/ts-heart-animated-blue-outline.gif');
  return icon.default;
};

/**
 * @returns {*}
 */
export const getBlackThinkSustainablyIcon = () => {
  const icon = require('../../assets/images/ts-heart-animated-black-outline.gif');
  return icon.default;
};

/**
 * @param content
 * @returns {*}
 */
export const getListHeartNumber = content => {
  const number = Number(get(content, 'field_heart_icon') || 1);
  return number ? number : null;
};

export const getListCoverImage = (content, style = ImageStyles.HERO_IMAGE) => {
  const items = get(content, 'field_location_carousel', []);

  if (!items || (!items.length && !Object.keys(items).length)) {
    return getListPlaceholderImage(style === ImageStyles.HERO_IMAGE);
  }

  let image = null;
  forEach(items, item => {
    image = contentHelpers.getContentCoverImage(item, style);

    if (image) {
      return false;
    }
  });

  if (!image) {
    image = getListPlaceholderImage(style === ImageStyles.HERO_IMAGE);
  }

  return image;
};

/**
 * @param content
 * @returns {string}
 */
export const getListHeroBackground = content => {
  const number = getListHeartNumber(content),
    cover = getListCoverImage(content, ImageStyles.HERO_IMAGE),
    background = [];

  if (number) {
    background.push(`url(${getHeartIcon(number)}) no-repeat`);
  }

  if (cover) {
    background.push(`url(${cover}) no-repeat`);
  }

  background.push(Colors.HEL_SUOMENLINNA);
  return background.join(', ');
};

/**
 * @param content
 * @param style
 * @returns {string}
 */
export const getListCardBackground = (content, style = ImageStyles.CARD_275) => {
  const number = getListHeartNumber(content),
    cover = contentHelpers.getContentCoverImage(content, style),
    background = [];

  if (number) {
    background.push(`url(${getHeartIcon(number)}) no-repeat`);
  }

  if (cover) {
    background.push(`url(${cover}) no-repeat`);
  }

  background.push(Colors.HEL_SUOMENLINNA);

  return background.join(', ');
};

/**
 * @param content
 * @param style
 * @returns {string}
 */
export const getLocalGuideCardBackground = (content, style = ImageStyles.CARD_275) => {
  const cover = contentHelpers.getContentCoverImage(content, style),
    background = [];

  if (cover) {
    background.push(`url(${cover}) no-repeat`);
  }

  background.push(Colors.HEL_SUOMENLINNA);

  return background.join(', ');
};

/**
 * @param content
 * @returns {Number}
 */
export const getListItemCount = content => {
  const items = get(content, 'field_location_carousel', []) || [];
  return items.length;
};

/**
 * @param content
 * @returns {boolean}
 */
export const isListPrivate = content => {
  return !!Number(get(content, 'field_privacy'));
};

/**
 * @param content
 * @returns {Array}
 */
export const getListItems = content => {
  const itemData = get(content, 'field_location_carousel'),
    items = [];

  forEach(itemData, item => {
    items.push({
      nid: contentHelpers.getContentId(item),
      title: contentHelpers.getContentTitle(item),
      subtitle: contentHelpers.getContentCardSubtitle(item),
    });
  });

  return items;
};

/**
 * @param content
 * @returns {{nid: number, title, subtitle: *}}
 */
export const getListFromContent = content => {
  return {
    nid: contentHelpers.getContentId(content),
    title: contentHelpers.getContentTitle(content),
    description: contentHelpers.getContentDescription(content),
    privacy: isListPrivate(content),
    items: getListItems(content),
  };
};

/**
 * @param content
 * @returns {boolean}
 */
export const isContentAllowedListItem = content => {
  const type = contentHelpers.getContentType(content);
  return indexOf(MyHelsinkiListAllowedContentTypes, type) > -1;
};

/**
 * @param content
 * @param path
 * @returns {{title, color: string, link: *, image: (String|null)}}
 */
export const getContentLiftUpProps = (content, path) => {
  if (path) {
    content = get(content, path);
  }

  if (!content && contentHelpers.getContentType(content) !== ContentTypes.MY_HELSINKI_LOCAL_GUIDE) {
    return null;
  }

  return {
    title: contentHelpers.getContentTitle(content),
    color: Colors.HEL_MY_HELSINKI,
    link: contentHelpers.getContentPath(content),
    image: contentHelpers.getContentCoverImage(content, ImageStyles.SQUARE_600),
  };
};

/**
 * @param landscape
 * @returns {*}
 */
export const getListPlaceholderImage = (landscape = false) => {
  const placeholder = landscape
      ? require('../../assets/images/list-hero-placeholder.jpg').default
      : require('../../assets/images/list-share-placeholder.jpg').default,
    protocol = global.IS_CLIENT ? window.location.protocol : global.PROTOCOL;

  if (placeholder.search('http:') === 0 || placeholder.search('https:') === 0) {
    return placeholder;
  }

  return `${protocol}${placeholder.search('//') === 0 ? '' : '//'}${placeholder}`;
};
