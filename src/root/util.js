/**
 * Deconstructs location's pathname into language and first page parts.
 * For example '/fi/valitse-vastuullisemmin' -> langauge: fi, firstPage: 'valitse-vastuullisemmin'
 * @param {String} locationPathname
 */
export const deconstructLocationPathname = locationPathname => {
  const locationPathnameParts = locationPathname.split('/');
  return {language: locationPathnameParts[1], firstPage: locationPathnameParts[2]};
};
