import Cookies from 'universal-cookie';
import i18n from '../root/i18n';

const cookies = new Cookies();

const infoPopupAvailable = () => {
  return i18n.exists('infoPopup:title')
}

const isInfoPopupShown = () => {
  return cookies.get('MyHelsinki-infoPopupShown') === 'true';
}

export const setInfoPopupShown = () => {
  cookies.set(
    'MyHelsinki-infoPopupShown',
    'true',
    {
      maxAge: 60 * 60 * 24 * 120,
    },
  );
}

export const showInfoPopup = () => {
  if (!isInfoPopupShown() && infoPopupAvailable()) {
    return true;
  }

  return false;
}
