//@flow

export const showActionLinks = (currentLanguage: string, type?: Array<string>) => {
  if (currentLanguage === 'en' || currentLanguage === 'fi') {
    if (type && type.includes('event')) {
      return false;
    }
    return true;
  }
  return false;
};
