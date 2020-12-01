import forEach from 'lodash/forEach';

import {SectionKeys, SectionColors, SectionSubnavigationKoros} from '../../constants';

export const getSectionKeyForIndex = index => {
  switch (index) {
    case 0:
      return SectionKeys.SEE_AND_DO;
    /*case 1:
      return SectionKeys.EAT_AND_DRINK;
    case 2:
      return SectionKeys.WORK_AND_STUDY;
    case 3:
      return SectionKeys.BUSINESS_AND_INVEST;
    case 4:
      return SectionKeys.INFO;*/
  }

  return null;
};

export const buildTopNavigationLinks = (menu = [], root = '') => {
  const links = [];

  forEach(menu, item => {
    const link = {...item},
      key = item.menu_key;

    link.key = key;

    if (SectionColors[key]) {
      link.color = SectionColors[key];
    }

    if (SectionSubnavigationKoros[key]) {
      link.koro = root + SectionSubnavigationKoros[key];
    }

    links.push(link);
    console.log(link);
    return links;
  });

  return links;
};
