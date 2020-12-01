import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import {withRouter} from 'react-router';
import {Row, Column} from 'react-foundation';
import {translate, Interpolate} from 'react-i18next';
import classNames from 'classnames';
import {connect} from 'react-redux';
import has from 'lodash/has';
import {Helmet} from 'react-helmet';

import * as myHelsinkiHelpers from './helpers';
import * as contentHelpers from '../content/helpers';
import {ImageStyles} from '../constants';

import type {Content} from '../content/types';
import Hero from '../hero/Hero';
import HeartIconCarousel from './HeartIconCarousel';
import LocationCarousel from '../locationCarousel/LocationCarousel';
import ShareLinks from '../shareLinks/ShareLinks';
import Koro from '../koro/Koro';
import CardList from '../cardList/CardList';
import {getIsAuthenticated, getUser} from '../auth/selectors';
import EditListModal from '../myHelsinki/EditListModal';
import {updateList} from './actions';

/* global DRUPAL_URL */

type Props = {
  content: Content,
  t: Function,
  user: Object,
  isAuthenticated: Boolean,
  location: Object,
  router: Object,
  i18n: Object,
  updateList: Function,
};

type State = {
  heartNumber: number,
};

class MyHelsinkiList extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      heartNumber: props.content.field_heart_icon ? Number(props.content.field_heart_icon) : 1,
    }
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('My Helsinki list page: %o', this.props.content);
    }
  }

  getMyListProps = () => {
    const {t, content} = this.props,
      items = contentHelpers.getContentCards(content, 'users_my_helsinki_lists.items');

    return items.length
      ? {
        title: t('myListsTitle'),
        items: items,
        pageSize: 4,
        pageSizeMobile: 1,
      }
      : null;
  };

  getLocalGuidesProps = () => {
    const {t, content} = this.props,
      items = contentHelpers.getContentCards(content, 'my_helsinki_local_guides.items');

    return items.length
      ? {
        title: t('localGuidesTitle'),
        items: items,
        pageSize: 4,
        pageSizeMobile: 1,
      }
      : null;
  };

  onEditClick = () => {
    const {location, router} = this.props;

    router.push({
      ...location,
      query: {
        ...location.query,
        edit: null,
      },
    });
  };

  canUserEdit = () => {
    const {content, user, isAuthenticated} = this.props;

    return isAuthenticated && Number(user.uid) === contentHelpers.getContentUserId(content);
  };

  browseItemClick = category => {
    const {router, i18n} = this.props;
    router.push(`/${i18n.language}/search?category=${category}`);
  };

  saveHeartIcon = (heartIcon: number) => {
    const {content} = this.props;

    const list = {
      nid: content.nid,
      heart_icon: heartIcon,
    };

    this.setState({heartNumber: heartIcon});
    this.props.updateList(list);
  };

  getHelmet = () => {
    const {content} = this.props;
    const width = 1980;
    const height = 900;
    let image = myHelsinkiHelpers.getListCoverImage(content, ImageStyles.HERO_IMAGE);

    const heart = myHelsinkiHelpers.getHeartIcon(myHelsinkiHelpers.getListHeartNumber(content));
    const shareImage = `${DRUPAL_URL}/watermark.php?imageUrl=${encodeURIComponent(
      image,
    )}&watermarkUrl=${encodeURIComponent(heart)}`;

    const isSecureUrl = shareImage && shareImage.search('https') === 0;

    return (
      <Helmet>
        {!!image && <meta property="og:image" content={shareImage} />}
        {!!image && (
          <meta property={`og:image:${isSecureUrl ? 'secure_url' : 'url'}`} content={shareImage} />
        )}
        {!!image && <meta property="og:image:width" content={width} />}
        {!!image && <meta property="og:image:height" content={height} />}
      </Helmet>
    );
  };

  getLocationCarouselContent = (
    titlePath: string = 'field_location_carousel_title',
    linkPath: string = 'field_location_carousel_link[0]',
  ) => {
    const {content} = this.props;

    return {
      title: get(content, titlePath),
      seeAllLink: contentHelpers.getContentLink(content, linkPath),
      seeAllLinkText: contentHelpers.getContentLinkTitle(content, linkPath),
    };
  };

  render() {
    const {t, content, location} = this.props,
      locationCarouselItems = contentHelpers.getContentLocationCarouselItems(content),
      myListsProps = this.getMyListProps(),
      localGuidesProps = this.getLocalGuidesProps(),
      isPrivate = myHelsinkiHelpers.isListPrivate(content),
      description = contentHelpers.getContentDescription(content),
      locationCarouselContent = this.getLocationCarouselContent();

    const presentationContent = {...content, field_heart_icon: this.state.heartNumber };

    return (
      <div
        className={classNames('my-helsinki-list-page', {
          'my-helsinki-list-page--user-can-edit': this.canUserEdit(),
        })}
      >
        {this.getHelmet()}
        <div className="my-helsinki-list-page__hero">
          <Hero background={myHelsinkiHelpers.getListHeroBackground(presentationContent)} koroColor="#ffffff" />
          {this.canUserEdit() && (
            <HeartIconCarousel
              background={contentHelpers.getContentCoverImage(presentationContent)}
              selectedItem={this.state.heartNumber}
              onSave={this.saveHeartIcon}
            />
          )}
        </div>
        {this.canUserEdit() && (
          <div className="my-helsinki-list-page__edit">
            <Row>
              <Column large={8}>
                <span
                  className={classNames('my-helsinki-list-page__privacy', {
                    'my-helsinki-list-page__privacy--private': isPrivate,
                    'my-helsinki-list-page__privacy--public': !isPrivate,
                  })}
                >
                  {isPrivate ? t('privateListLabel') : t('publicListLabel')}
                </span>
              </Column>
              <Column large={4}>
                <div className="my-helsinki-list-page__edit-links">
                  <button className="my-helsinki-list-page__edit-link" onClick={this.onEditClick}>
                    {t('common:edit')}
                  </button>
                </div>
              </Column>
            </Row>
          </div>
        )}
        <div className="my-helsinki-list-page__info">
          <Row>
            <Column large={8}>
              <h1 className="my-helsinki-list-page__title">
                {contentHelpers.getContentTitle(presentationContent)}
              </h1>
              {!!description && <p className="my-helsinki-list-page__description">{description}</p>}
            </Column>
            <Column large={4}>
              <ShareLinks title={t('locationCarousel:shareLinksTitle')} />
            </Column>
          </Row>
        </div>
        {locationCarouselItems.length > 0 && (
          <LocationCarousel items={locationCarouselItems} content={locationCarouselContent} />
        )}
        {locationCarouselItems.length < 1 && (
          <div className="my-helsinki-list-page__no-items">
            <Row>
              <Column large={8}>
                <p className="my-helsinki-list-page__no-items-text">
                  <Interpolate i18nKey="noItemsText" useDangerouslySetInnerHTML={true} />
                </p>
                <div className="my-helsinki-list-page__no-items-browse">
                  <ul>
                    <li>
                      <span>{t('noItemsBrowseLabel')}</span>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.browseItemClick('sights_and_attractions');
                        }}
                      >
                        {t('noItemsBrowseSightsLabel')}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.browseItemClick('restaurants');
                        }}
                      >
                        {t('noItemsBrowseRestaurantsLabel')}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.browseItemClick('activities');
                        }}
                      >
                        {t('noItemsBrowseActivitiesLabel')}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.browseItemClick('events');
                        }}
                      >
                        {t('noItemsBrowseEventsLabel')}
                      </a>
                    </li>
                  </ul>
                </div>
              </Column>
            </Row>
          </div>
        )}
        <div className="local-guide-page__lower-wrapper">
          <Koro color="#ffffff" flip />
          <Row>
            <Column medium={12}>
              {myListsProps && (
                <CardList
                  className="my-lists-card-list"
                  {...myListsProps}
                  cardDefaults={{isDimmed: false}}
                />
              )}
              {localGuidesProps && (
                <CardList
                  className="local-guides-card-list"
                  {...localGuidesProps}
                  cardDefaults={{isDimmed: true}}
                />
              )}
            </Column>
          </Row>
        </div>
        <EditListModal
          isOpen={has(location, 'query.edit') && this.canUserEdit()}
          list={presentationContent}
          close={() => this.props.router.push({...this.props.location, query: {}})}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  user: getUser(state),
});

export default flowRight(
  withRouter,
  translate(['myHelsinkiList', 'locationCarousel', 'common']),
  connect(
    mapStateToProps,
    {updateList},
  ),
)(MyHelsinkiList);
