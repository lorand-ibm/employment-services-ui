// @flow

import React, {PureComponent} from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import i18n from '../root/i18n';
import {Row, Column, ButtonGroup, Link} from 'react-foundation';
import {Helmet} from 'react-helmet';
import {HeroCarouselTypes} from '../constants';
import * as helpers from '../helpers';
import * as contentHelpers from '../content/helpers';

import earthIcon from '../../assets/images/ico-earth.svg';
import ticketIcon from '../../assets/images/ico-ticket.svg';

import HeroCarousel from '../heroCarousel/HeroCarousel';
import HeroCopyright from '../hero/HeroCopyright';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CardList from '../cardList/CardList';
import PhotoGrid from '../photoGrid/PhotoGrid';
import Tags from '../tags/Tags';
import DirectionsBlock from '../directionsBlock/DirectionsBlock';
import ReadMore from '../readMore/ReadMore';
import ShareLinks from '../shareLinks/ShareLinks';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import {getContentPhotogridData, getContentAddressObj} from '../content/helpers';

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
};

class ActivityPage extends PureComponent<Props, State> {
  props: Props;
  state: State = {
    selected: 0,
    photoGrid: {},
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Activity page: %o', this.props.content);

      getContentPhotogridData(this.props.content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      });
    }
  }

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

  getRelatedActivitiesCardListProps = () => {
    const {content} = this.props,
      items = contentHelpers.getContentCards(content, 'related_entities.items');

    return items.length
      ? {
        title: get(content, 'related_entities.title'),
        items: items,
        seeAllLink: get(content, 'related_entities.see_all_link_path'),
      }
      : null;
  };

  getPageTitle(): string {
    const title = contentHelpers.getContentTitle(this.props.content);
    if (title) {
      return helpers.composePageTitle(title);
    } else {
      return helpers.composePageTitle('');
    }
  }

  getCarouselCopyright = () => {
    const {content} = this.props;
    const {selected} = this.state;

    return contentHelpers.getContentCarouselImageCopyright(content, selected);
  };

  render() {
    const {content} = this.props,
      heroCarouselSlides = contentHelpers.getContentHeroCarouselSlides(content),
      ticketUrl = contentHelpers.getContentLink(content, 'field_tickets_url[0]'),
      websiteUrl = contentHelpers.getContentLink(content, 'field_website_url[0]'),
      organiserUrl = contentHelpers.getContentLink(content, 'field_location_url[0]'),
      tags = contentHelpers.getContentTags(content),
      relatedActivitiesCardListProps = this.getRelatedActivitiesCardListProps(),
      photoGridData = this.state.photoGrid;

    const onSaveToMyHelsinkiClick = () => {
      helpers.showAddToListModal(contentHelpers.getContentId(content));
    };

    const addressObj = getContentAddressObj(
      content,
      'field_location_street_address',
      'field_location_postal_code',
      'field_locality',
    );

    return (
      <div className={classNames('activity-page')}>
        <Helmet>
          <title>{this.getPageTitle()}</title>
          <meta property="og:title" content={this.getPageTitle()} />
        </Helmet>
        {!!heroCarouselSlides.length && (
          <HeroCarousel
            slides={heroCarouselSlides}
            type={HeroCarouselTypes.SIMPLE}
            onSelectionChange={selected => this.setState({selected})}
          />
        )}
        <Row>
          <Column>
            <HeroCopyright credits={this.getCarouselCopyright()} />
            <Breadcrumbs items={contentHelpers.getContentBreadcrumbs(content)} />
            <h1>{contentHelpers.getContentTitle(content)}</h1>

            <div className="activity-page__details">
              <Row>
                <Column>
                  {content.field_organiser && (
                    <div className="activity-page__organiser">by: {content.field_organiser}</div>
                  )}
                  {content.field_where_and_when && (
                    <div className="activity-page__where-and-when">
                      {content.field_where_and_when}
                    </div>
                  )}
                  {content.field_duration && (
                    <div className="activity-page__duration">{content.field_duration}</div>
                  )}
                  {content.field_price && (
                    <div className="activity-page__price">{content.field_price}</div>
                  )}
                </Column>
                <Column>
                  <div className="activity-page__my-helsinki-actions">
                    <a
                      href="javascript:void(0);"
                      className="activity-page__save-to-my-helsinki"
                      onClick={onSaveToMyHelsinkiClick}
                    >
                      <span className="activity-page__save-to-my-helsinki-icon" />
                      <span className="activity-page__save-to-my-helsinki-label">
                        {i18n.t('common:saveToMyHelsinki')}
                      </span>
                    </a>
                  </div>
                </Column>
              </Row>
            </div>

            <div className="activity-page__info">
              <Row>
                <Column className="desktop-body-column">
                  <div className="activity-page__body">
                    <ReadMore
                      className="local-guide-page__body"
                      summary={contentHelpers.getContentBody(
                        content,
                        true,
                        'field_formatted_description[0]',
                      )}
                      html={true}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: contentHelpers.getContentBody(
                            content,
                            false,
                            'field_formatted_description[0]',
                          ),
                        }}
                      />
                    </ReadMore>
                  </div>
                </Column>
                <Column>
                  <ButtonGroup className="activity-page__cta-buttons">
                    {!!ticketUrl && (
                      <Link className="tickets-button"
                        href={ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        isHollow
                      >
                        <img src={ticketIcon} alt="" />
                        {i18n.t('activity:book')}
                        <span className="visually-hidden">{i18n.t('common:linkWarning')}</span>
                      </Link>
                    )}
                    {!!websiteUrl && (
                      <Link className="website-button"
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        isHollow
                      >
                        <img src={earthIcon} alt="" />
                        {i18n.t('event:website')}
                        <span className="visually-hidden">{i18n.t('common:linkWarning')}</span>
                      </Link>
                    )}
                  </ButtonGroup>
                  <div className="activity-page__body__mobile">
                    <ReadMore
                      className="local-guide-page__body"
                      summary={contentHelpers.getContentBody(
                        content,
                        true,
                        'field_formatted_description[0]',
                      )}
                      html={true}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: contentHelpers.getContentBody(
                            content,
                            false,
                            'field_formatted_description[0]',
                          ),
                        }}
                      />
                    </ReadMore>
                  </div>
                  {!!tags && <Tags tags={tags} />}
                  <ShareLinks />
                </Column>
              </Row>
            </div>
            <DirectionsBlock
              coordinates={this.getCoordinates()}
              addressObj={addressObj}
            />
            {relatedActivitiesCardListProps && (
              <CardList
                className="related-events-card-list"
                cardDefaults={cardDefaults}
                {...relatedActivitiesCardListProps}
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

export default ActivityPage;
