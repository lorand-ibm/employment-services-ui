import React from 'react';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import {getHeartIcon, getBlueThinkSustainablyIcon, getBlackThinkSustainablyIcon} from '../myHelsinki/helpers';
import {LinkDuo} from '../linkduo/LinkDuo';
import {MyHelsinkiHeartColors, Colors} from '../constants';

type Props = {
  iconType: string,
  title: string,
  link: string,
  linkText: string,
  linkTextMobile: string,
  colorScheme: Object,
};

const getIcon = (iconType, bgColor) => {
  if (iconType === 'ts-heart') {
    return getTSIcon(bgColor);
  }
  return getRandomIcon();
};

const getTSIcon = (bgColor) => {
  const icon = bgColor === Colors.HEL_BUS_1
    ? getBlueThinkSustainablyIcon()
    : getBlackThinkSustainablyIcon();
  return `url("${icon}")`;
};

const getRandomIcon = () => {
  const heartCount = 55,
    icon = getHeartIcon(
      Math.round(heartCount * Math.random()),
      MyHelsinkiHeartColors.BLACK,
    );

  return `url("${icon}")`;
};

const getIconSpan = (iconType, colorScheme) => {
  if (!iconType) {
    return "";
  }
  return <span className="my-helsinki-banner__icon" style={{backgroundImage: getIcon(iconType, colorScheme.background)}} />;
};

const getMobileClasses = (iconType) => {
  if (!iconType) {
    return "banner-mobile-no-icon-centered ";
  }
  return "";
};

const Banner = ({iconType, title, link, linkText, linkTextMobile, colorScheme}: Props) => (
  <div className={'my-helsinki-banner ' + getMobileClasses(iconType)} style={{backgroundColor: colorScheme.background}}>
    {getIconSpan(iconType, colorScheme)}
    <p className="my-helsinki-banner__text" style={{color: colorScheme.text}}>{title}</p>

    <LinkDuo
      className="my-helsinki-banner__link"
      style={{border: `solid 3px ${colorScheme.button}`}}
      to={link}
    >
      <div className="show-for-medium my-helsinki-banner__linktext" style={{color: colorScheme.button}}>{linkText}</div>
      <div className="hide-for-medium my-helsinki-banner__linktext" style={{color: colorScheme.button}}>{linkTextMobile}</div>
    </LinkDuo>
  </div>
);

export default flowRight(translate(['common']))(Banner);
