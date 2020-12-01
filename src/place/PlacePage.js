// @flow

import React, {PureComponent, Fragment} from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import i18n from '../root/i18n';
import classNames from 'classnames';
import {Row, Column, Link, ButtonGroup} from 'react-foundation';

import {PlaceTypes, PlaceTypeNames, HeroCarouselTypes} from '../constants';
import * as contentHelpers from '../content/helpers';
import * as helpers from '../helpers';

import ticketIcon from '../../assets/images/ico-ticket.svg';
import earthIcon from '../../assets/images/ico-earth.svg';

import HeroCarousel from '../heroCarousel/HeroCarousel';
import HeroCopyright from '../hero/HeroCopyright';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CardList from '../cardList/CardList';
import PhotoGrid from '../photoGrid/PhotoGrid';
import PageDetails from '../pageDetails/PageDetails';
import DirectionsBlock from '../directionsBlock/DirectionsBlock';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
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
};

type State = {
  selected: number,
  photoGrid: Object,
  hslMarker: Object,
};

class PlacePage extends PureComponent<Props, State> {
  props: Props;
  state: State = {
    selected: 0,
    photoGrid: {},
    hslMarker: null,
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Place page: %o', this.props.content);

      contentHelpers.getContentPhotogridData(this.props.content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      });
    }
  }

  getPlaceType = () => {
    const {content} = this.props;
    return Number(get(content, 'field_place_type[0].tid', null));
  };

  getWebsiteUrl = () => {
    return get(this.props.content, 'field_link[0].uri');
  };

  getRating = () => {
    const {content} = this.props,
      ratingData = get(content, 'field_rating');

    if (ratingData === null) {
      return null;
    }

    return (
      <div
        className={classNames('place-page__rating', `place-page__rating--${Number(ratingData)}`)}
      />
    );
  };

  getPriceRange = () => {
    const {content} = this.props,
      priceRangeData = get(content, 'field_price_range');

    if (priceRangeData === null) {
      return null;
    }

    return (
      <div className="place-page__price-range">{new Array(Number(priceRangeData)).join('€')}</div>
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

  getEmailLink = () => {
    const email = get(this.props.content, 'field_email');
    return email ? email : null;
  };

  getBodySummary = () => {
    return get(this.props.content, 'body[0].summary');
  };

  getRelatedPlacesCardListProps = () => {
    const {content} = this.props,
      items = contentHelpers.getContentCards(content, 'related_entities.items');

    if (!items.length) {
      return null;
    }

    return {
      title: get(content, 'related_entities.title'),
      items: items,
      seeAllLink: get(content, 'related_entities.see_all_link_path'),
    };
  };

  getRelatedListProps = () => {
    const {content} = this.props,
      items = contentHelpers.getContentCards(content, 'related_lists.items');

    return items.length
      ? {
        title: get(content, 'related_lists.title'),
        items: items,
        seeAllLink: get(content, 'related_lists.see_all_link_path'),
        pageSize: 4,
        pageSizeMobile: 1,
      }
      : null;
  };

  getCarouselCopyright = () => {
    const {content} = this.props;
    const {selected} = this.state;

    return contentHelpers.getContentCarouselImageCopyright(content, selected);
  };

  getMeta() {
    return this.getPriceRange();
  }

  getCtaButtons() {
    const placeType = this.getPlaceType(),
      emailLink = this.getEmailLink();

    return (
      <Fragment>
        {placeType === PlaceTypes.RESTAURANT && emailLink && (
          <ButtonGroup className="page-details__cta-buttons">
            <div>
              <Link className="book-a-table-button"
                href={`mailto:${emailLink}`}
                isHollow
              >
                <img src={ticketIcon} alt=""/>
                {i18n.t('place:bookTableButton')}
                <span className="visually-hidden">{i18n.t('common:sendEmail', {address: emailLink})}</span>
              </Link>
            </div>
          </ButtonGroup>
        )}
        <ButtonGroup className="page-details__cta-buttons">
          <div>
            <Link className="website-button"
              href={this.getWebsiteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              isHollow
            >
              <img src={earthIcon} alt=""/>
              {i18n.t('place:websiteButton')}
              <span className="visually-hidden">{i18n.t('common:linkWarning')}</span>
            </Link>
          </div>
        </ButtonGroup>
      </Fragment>
    );
  }

  setRouteFromCoordinates(/*lat, lon*/) {}

  hslMarker(lat, lon) {
    this.setState({hslMarker: {lat, lon}});
  }

  render() {
    const {content} = this.props,
      relatedPlacesCardListProps = this.getRelatedPlacesCardListProps(),
      relatedListsProps = this.getRelatedListProps(),
      tags = contentHelpers.getContentTags(content),
      photoGridData = this.state.photoGrid,
      heroCarouselSlides = contentHelpers.getContentHeroCarouselSlides(content, {
        subpage: this.getPlaceType(),
      }),
      sustainabilityStatus = get(content, 'field_sustainability_info.sustainability_status'),
      sustainabilityDetails = get(content, 'field_sustainability_info.sustainability_details'),
      addressObj = contentHelpers.getContentAddressObj(
        content,
        'field_street_address',
        'field_postal_code',
        'field_locality',
      );

    return (
      <div
        className={classNames('place-page', `place-page--${PlaceTypeNames[this.getPlaceType()]}`)}
      >
        {!!heroCarouselSlides.length && (
          <HeroCarousel
            slides={heroCarouselSlides}
            type={HeroCarouselTypes.SIMPLE}
            onSelectionChange={selected => this.setState({selected})}
          />
        )}
        <Row>
          <Column>
            <Row>
              <Column small={9} large={9}>
                <Breadcrumbs items={contentHelpers.getContentBreadcrumbs(content)} />
              </Column>
              <Column small={3} large={3}>
                <HeroCopyright credits={this.getCarouselCopyright()} />
              </Column>
            </Row>
            <SustainabilityWidget
              className="place-page__sustainability-widget"
              status={sustainabilityStatus}
              details={sustainabilityDetails}
            />
            {this.getRating()}
            <PageDetails
              title={content.title}
              meta={this.getMeta()}
              body={get(content, 'body[0].value')}
              summary={this.getBodySummary()}
              ctaButtons={this.getCtaButtons()}
              contentId={content.field_matko_id}
              onSaveToMyHelsinkiClick={() => {
                helpers.showAddToListModal(contentHelpers.getContentId(content));
              }}
              tags={tags}
              phone={content.field_phone}
              openingHours={{
                structured: content.field_opening_hours,
                exception: content.field_opening_hours_exception,
                text: content.field_opening_hours_text,
              }}
              address={helpers.parseAddressStr(addressObj)}
            />
            <DirectionsBlock
              coordinates={this.getCoordinates()}
              addressObj={addressObj}
            />
            {relatedPlacesCardListProps && (
              <CardList
                className="related-places-card-list"
                cardDefaults={cardDefaults}
                {...relatedPlacesCardListProps}
              />
            )}

            {relatedListsProps && (
              <CardList
                className="related-lists-card-list"
                {...relatedListsProps}
                cardDefaults={{isDimmed: false}}
              />
            )}

            <DisplayThisSection when={photoGridData && !isEmpty(photoGridData.photos)}>
              <PhotoGrid {...photoGridData} />
            </DisplayThisSection>
          </Column>
        </Row>
      </div>
    );
  }
}

export default PlacePage;
