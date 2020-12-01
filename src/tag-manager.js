/*eslint no-undef: 0*/

export const GoogleTagManagerEventTypes = {
  VIRTUAL_PAGE_VIEW: 'virtualPageView',
  PERFORM_SEARCH: 'performSearch',
};

/**
 * Returns the markup for registering Google Tag Manager noscript
 * @param id
 * @returns {string}
 */
export function getGoogleTagManagerNoScript(id) {
  return `<iframe src="//www.googletagmanager.com/ns.html?id=${id}"
                     height="0" width="0"
                     style="display:none;visibility:hidden"></iframe>`;
}

/**
 * Returns the markup for registering Google Tag Manager.
 * @param id
 * @returns {string}
 */
export function getGoogleTagManagerScript(id) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`;
}

/**
 *
 * @param {string} title
 * @param {string} url
 */
export function registerPageView(title, url) {
  pushEvent({event: GoogleTagManagerEventTypes.VIRTUAL_PAGE_VIEW, page: {title, url}});
}

/**
 *
 * @param {Object} query
 */
export function registerSearch(query) {
  pushEvent({event: GoogleTagManagerEventTypes.PERFORM_SEARCH, query});
}

/**
 *
 * @param {Object} event
 */
function pushEvent(event) {
  if (process.env.NODE_ENV === 'production' && typeof dataLayer !== 'undefined') {
    dataLayer.push(event);
  }
}
