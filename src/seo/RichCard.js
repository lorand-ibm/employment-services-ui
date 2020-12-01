import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import forEachRight from 'lodash/forEachRight';
import i18n from '../root/i18n';
import {
  getFrontendUrl,
  getContentPath,
  getContentTitle,
  getContentDescription,
  getContentCoverImage,
  getContentCoverImageCopyright,
} from '../content/helpers';

const MYHELSINKI_NAME = 'MyHelsinki';
const MYHELSINKI_PROFILES = [
  'https://twitter.com/myhelsinki',
  'https://www.facebook.com/myhelsinki',
  'https://www.youtube.com/user/Visithelsinki',
  'https://www.linkedin.com/company/helsinki-marketing',
  'https://www.instagram.com/myhelsinki',
];

type Props = {
  content: Object,
};

class RichCard extends Component {
  props: Props;

  getLocation = content => {
    const {
      field_location_name,
      field_location_address_locality,
      field_location_postal_code,
      field_location_street_address,
    } = content;

    return {
      '@context': 'http://schema.org',
      '@type': 'Place',
      name: field_location_name,
      address: {
        '@context': 'http://schema.org',
        '@type': 'PostalAddress',
        streetAddress: field_location_street_address,
        addressLocality: field_location_address_locality,
        postalCode: field_location_postal_code,
        addressCountry: 'FI', // TODO: This is hard-coded since backend won't provide it.
      },
    };
  };

  getOffer = content => {
    const {
      field_offers_description,
      field_offers_info_url,
      field_offers_price,
      //field_offers_is_free: offers_is_free,
    } = content;

    if (field_offers_info_url && field_offers_info_url.length) {
      return {
        '@context': 'http://schema.org',
        '@type': 'Offer',
        url: field_offers_info_url,
        price: field_offers_price,
        description: field_offers_description,
        priceCurrency: 'EUR', // TODO: This is hard-coded since backend won't provide it.
        //'availability': 'http://schema.org/InStock',
        //'validFrom': '2017-01-20T16:20-08:00',
      };
    }

    return null;
  };

  getImages = content => {
    const {field_images} = content;

    if (field_images) {
      const images = field_images.map(image => {
        const {field_license, field_photographer_name, field_url} = image;

        return {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          author: field_photographer_name,
          name: field_url[0].title,
          url: field_url[0].uri,
          license: field_license,
        };
      });

      return images;
    }

    return null;
  };

  getPerformer = () => {
    // TODO: Performer isn't provided by backend
    const isValid = false;

    if (isValid) {
      const result = {
        '@context': 'http://schema.org',
        '@type': 'PerformingGroup',
        name: 'Andy Lagunoff',
      };

      return result;
    }

    return null;
  };

  parseEvent = content => {
    const {field_short_description, field_start_time, field_end_time} = content;

    return {
      '@context': 'http://schema.org',
      '@type': 'Event',
      name: getContentTitle(content),
      description: field_short_description,
      startDate: field_start_time,
      endDate: field_end_time,
      image: this.getImages(content),
      location: this.getLocation(content),
      offers: this.getOffer(content),
      performer: this.getPerformer(),
    };
  };

  parseArticle = content => {
    const {created, changed} = content;

    const title = getContentTitle(content);
    const description = getContentDescription(content);
    const createdDate = new Date(created * 1000);
    const modifiedDate = new Date(changed * 1000);
    const contentPath = getContentPath(content);

    return {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      datePublished: createdDate.toISOString(),
      dateModified: modifiedDate.toISOString(),
      headline: title,
      description: description,
      mainEntityOfPage: contentPath,
      author: MYHELSINKI_NAME,
      publisher: {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: MYHELSINKI_NAME,
        logo: {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          url:
            'https://www.hel.fi/wps/CoHTheme/themes/html/RWD_main_theme/img/logo/logo-hki-color-fi.png', // TODO: Fix this
        },
      },
      image: [
        {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          url: getContentCoverImage(content),
          author: getContentCoverImageCopyright(content),
        },
      ],
    };
  };

  getSocialProfiles = () => {
    const result = {
      '@context': 'http://schema.org',
      '@type': 'Person',
      name: MYHELSINKI_NAME,
      url: getFrontendUrl(),
      sameAs: MYHELSINKI_PROFILES,
    };

    return result;
  };

  getSearchAction = () => {
    const frontendUrl = getFrontendUrl();
    const result = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: frontendUrl,
      potentialAction: {
        '@context': 'http://schema.org',
        '@type': 'SearchAction',
        target: `${frontendUrl}/${i18n.language}/search?keywords={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    return result;
  };

  parseContentBreadcrumbs = content => {
    const results = [];
    const {breadcrumbs = []} = content;

    if (breadcrumbs.length) {
      const frontendUrl = getFrontendUrl();
      const createUrl = url => `${frontendUrl}${encodeURI(decodeURI(url))}`;
      const pushBreadcrumb = (name, url) => results.push({name, url: createUrl(url)});

      pushBreadcrumb(MYHELSINKI_NAME, `/${i18n.language}`);
      forEachRight(breadcrumbs, item => pushBreadcrumb(item.title, item.path));
      pushBreadcrumb(getContentTitle(content), getContentPath(content));
    }

    return results;
  };

  getBreadcrumbs = content => {
    const breadcrumbs = this.parseContentBreadcrumbs(content);

    if (breadcrumbs.length) {
      const itemList = breadcrumbs.map((item, idx) => {
        return {
          '@context': 'http://schema.org',
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@id': item.url,
            name: item.name,
          },
        };
      });

      const result = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: itemList,
      };

      return result;
    }

    return null;
  };

  parseContent = content => {
    const {type: contentTypes} = content;
    const items = [];

    const parsers = {
      event: this.parseEvent,
      article: this.parseArticle,
      theme_page: this.parseArticle,
    };

    items.push(this.getSocialProfiles());
    items.push(this.getSearchAction());
    items.push(this.getBreadcrumbs(content));

    if (contentTypes && contentTypes.length) {
      contentTypes.forEach(contentType => {
        const parser = parsers[contentType];

        if (parser) {
          items.push(parser(content));
        }
      });
    }

    const structuredData = items.map(item => JSON.stringify(item)).join(',');
    return <script type="application/ld+json">{`[${structuredData}]`}</script>;
  };

  render() {
    return <Helmet>{this.parseContent(this.props.content)}</Helmet>;
  }
}

export default RichCard;
