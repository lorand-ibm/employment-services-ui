// @flow
import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import {withRouter} from 'react-router';
import {Row, Column, Link, ButtonGroup} from 'react-foundation';

import {HeroCarouselTypes} from '../constants';
import {
  getContentAddressObj,
  getContentTitle,
  getContentTags,
  getContentCards,
  getContentHeroCarouselSlides,
  getContentBreadcrumbs,
  getContentPhotogridData,
  getContentId,
  getContentCarouselImageCopyright,
} from '../content/helpers';
import * as helpers from '../helpers';
import i18n from '../root/i18n';

import ticketIcon from '../../assets/images/ico-ticket.svg';
import earthIcon from '../../assets/images/ico-earth.svg';

import HeroCarousel from '../heroCarousel/HeroCarousel';
import HeroCopyright from '../hero/HeroCopyright';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CardList from '../cardList/CardList';
import PhotoGrid from '../photoGrid/PhotoGrid';
import DirectionsBlock from '../directionsBlock/DirectionsBlock';
import PageDetails from '../pageDetails/PageDetails';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import DateTime from '../dateTime/DateTime';
import SustainabilityWidget from '../sustainability/SustainabilityWidget';

const cardDefaults = {
  isDimmed: true,
  showRating: true,
  rating: 0,
  showLike: true,
  onLike: liked => {
    console.log('LIKE', liked);
  },
};

type Props = {
  content: Object,
  router: PropTypes.object,
  t: Function,
};

type State = {
  selected: number,
  photoGrid: Object,
};

class EventPage extends PureComponent<Props, State> {
  props: Props;
  state: State = {
    selected: 0,
    photoGrid: {},
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Event page: %o', this.props.content);

      getContentPhotogridData(this.props.content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      });
    }
  }

  getLocation = () => {
    const {content, router} = this.props,
      locationName = get(content, 'field_location_name');

    if (!locationName) {
      return null;
    }

    const onClick = () => {
      router.push({
        pathname: `/${i18n.language}/search`,
        query: {
          keywords: locationName,
        },
      });
    };

    return (
      <a className="event-page__location-name" onClick={onClick}>
        {locationName}
      </a>
    );
  };

  getCoordinates = () => {
    const {content} = this.props,
      geolocationData = get(content, 'field_geolocation[0]');

    return geolocationData
      ? {
        lat: Number(geolocationData.lat),
        lng: Number(geolocationData.lng),
      }
      : null;
  };

  getRelatedEventsCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'related_entities.items');

    if (!items.length) {
      return null;
    }

    return {
      title: get(content, 'related_entities.title'),
      items: items,
      seeAllLink: get(content, 'related_entities.see_all_link_path'),
    };
  };

  getCarouselCopyright = () => {
    const {content} = this.props;
    const {selected} = this.state;

    return getContentCarouselImageCopyright(content, selected);
  };

  getMeta() {
    const {content} = this.props,
      startTime = get(content, 'field_start_time'),
      endTime = get(content, 'field_end_time');
    return (
      <div>
        {this.getLocation()}
        <DateTime start={startTime} end={endTime} className="event-page__start-end-date" />
      </div>
    );
  }

  getCtaButtons() {
    const {content, t} = this.props,
      ticketsUrl = get(content, 'field_offers_info_url'),
      websiteUrl = get(content, 'field_info_url');

    return (
      <Fragment>
        {!!ticketsUrl && (
          <ButtonGroup className="page-details__cta-buttons">
            <div>
              <Link
                className="tickets-button"
                href={ticketsUrl}
                target="_blank"
                rel="noopener noreferrer"
                isHollow>
                  <img src={ticketIcon} alt="" />
                  {t('tickets')}
                  <span className="visually-hidden">{t('common:linkWarning')}</span>
              </Link>
            </div>
          </ButtonGroup>
        )}
        {!!websiteUrl && (
          <ButtonGroup className="page-details__cta-buttons">
            <div>
              <Link className="website-button"
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                isHollow>
                  <img src={earthIcon} alt="" />
                  {t('website')}
                  <span className="visually-hidden">{t('common:linkWarning')}</span>
              </Link>
            </div>
          </ButtonGroup>
        )}
      </Fragment>
    );
  }

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      tags = getContentTags(content),
      relatedEventsCardListProps = this.getRelatedEventsCardListProps(),
      photoGridData = this.state.photoGrid,
      coordinates = this.getCoordinates(),
      addressObj = getContentAddressObj(
        content,
        'field_location_street_address',
        'field_location_postal_code',
        'field_location_address_locality',
      ),
      sustainabilityStatus = get(content, 'field_sustainability_info.sustainability_status'),
      sustainabilityDetails = get(content, 'field_sustainability_info.sustainability_details'),
      locationName = get(content, 'field_location_name');

    const isInternetEvent =
      typeof locationName === 'string' &&
      locationName.trim().toLowerCase() === 'internet';

    return (
      <div className={classNames('event-page')}>
        {!!heroCarouselSlides.length && (
          <HeroCarousel
            slides={heroCarouselSlides}
            type={HeroCarouselTypes.SIMPLE}
            onSelectionChange={selected => this.setState({selected})}
          />
        )}
        <Row>
          <Column small={12}>
            <HeroCopyright credits={this.getCarouselCopyright()} />
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
            <SustainabilityWidget
              className="event-page__sustainability-widget"
              status={sustainabilityStatus}
              details={sustainabilityDetails}
            />
            <PageDetails
              title={getContentTitle(content)}
              meta={this.getMeta()}
              body={get(content, 'field_description')}
              summary={get(content, 'field_short_description')}
              ctaButtons={this.getCtaButtons()}
              onSaveToMyHelsinkiClick={() => {
                helpers.showAddToListModal(getContentId(content));
              }}
              tags={tags}
              type={content.type}
              address={helpers.parseAddressStr(addressObj)}
            />
            {!isInternetEvent && 
              <DirectionsBlock
               coordinates={coordinates}
               addressObj={addressObj}
              />
            }
            {relatedEventsCardListProps && (
              <CardList
                className="related-events-card-list"
                cardDefaults={cardDefaults}
                {...relatedEventsCardListProps}
              />
            )}
          </Column>
        </Row>
        <DisplayThisSection when={photoGridData && !isEmpty(photoGridData.photos)}>
          <Row>
            <Column small={12}>
              <PhotoGrid {...photoGridData} />
            </Column>
          </Row>
        </DisplayThisSection>
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['event']),
)(EventPage);
