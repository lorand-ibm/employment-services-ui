import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import isEmpty from 'lodash/isEmpty';
import i18n from '../root/i18n';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import {Helmet} from 'react-helmet';

import {homePageSelector} from '../search/selectors';
import {fetchSearchByFilters} from '../search/actions';

import {HeroCarouselTypes, Colors, ImageStyles, Orientations, SimpleQuoteTypes} from '../constants';
import * as helpers from '../helpers';

import {
  getContentCards,
  getContentCTAProps,
  getContentLinks,
  getContentVideo,
  getContentTitle,
  getContentSpecialHeroCarouselSlides,
  getContentPhotogridData,
  getContentSimpleQuote,
  getContentTwitterQuote,
  getGridCardListProps,
} from '../content/helpers';

import * as searchHelpers from '../search/helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import GridCardList from '../gridCardList/GridCardList';
import PhotoGrid from '../photoGrid/PhotoGrid';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import TwitterQuote from '../twitter/TwitterQuote';
import Koro from '../koro/Koro';
import CardList from '../cardList/CardList';
import Banner from '../banner/Banner';

import type {Search} from '../search/types';

export type Props = {
  content: Object,
  fetchSearchByFilters: typeof fetchSearchByFilters,
  location: Object,
  search: Search,
};

const cardDefaults = {
  isDimmed: true,
};

type State = {
  orientation: string,
  photoGrid: object,
};

class Homepage extends Component<Props, State> {
  props: Props;

  state: State = {
    orientation: Orientations.PORTRAID,
    photoGrid: {},
  };

  componentDidMount() {
    const {content, fetchSearchByFilters} = this.props,
      filters = searchHelpers.getHomepageSearchFilters(content);

    if (helpers.isClient()) {
      console.log('Homepage: %o', content);

      this.setState({orientation: helpers.getOrientation()});
      window.addEventListener('resize', this.setOrientation);

      fetchSearchByFilters(filters);

      getContentPhotogridData(content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      })
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('resize', this.setOrientation);
    }
  }

  setOrientation = () => {
    if (global.IS_CLIENT) {
      this.setState({orientation: helpers.getOrientation()});
    } else {
      this.setState({orientation: Orientations.PORTRAID});
    }
  };

  getLocalGuideCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'field_card_list_2', ImageStyles.CARD_375),
      ctaProps = getContentCTAProps(content);

    if (ctaProps) {
      items.splice(2, 0, {
        cardType: 'cta',
        ...ctaProps,
      });
    }

    return items.length
      ? {
        title: get(content, 'field_card_list_title_2'),
        items: items,
        description: get(content, `field_card_list_description_2`),
        links: getContentLinks(content, `field_card_list_link_2`),
        showAsGrid: false,
        cardDefaults: cardDefaults,
        pageSizeMobile: 1,
      }
      : null;
  };

  /**
   * Homepage uses non-standard field-names for grid-card-lists. Those
   * field-names need to be mapped to the standard field-names so that we can
   * use the generic getGridCardListProps() helper function.
   *
   * @todo Change the field-names in the backend so that we don't need this
   *   mapping anymore
   *
   * @param content
   * @param suffix
   * @returns {*}
   */
  getHomepageCardListProps = (content, suffix) => {
    suffix = suffix ? `_${suffix}` : '';

    const fakeContent = {
      field_show_as_grid: content[`field_show_as_grid${suffix}`],
      field_grid_card_list: content[`field_card_list${suffix}`],
      field_grid_card_list_title: content[`field_card_list_title${suffix}`],
      field_grid_card_list_description: content[`field_card_list_description${suffix}`],
      field_card_list_links: content[`field_card_list_links${suffix}`],
      langcode: content['langcode'],
    };

    return getGridCardListProps(fakeContent);
  };

  getVideoCarouselSlides = () => {
    const {content} = this.props;

    return [
      {
        video: getContentVideo(content),
        description: get(content, 'field_video_caption'),
      },
    ];
  };

  getEventsCardListProps = () => {
    const {content, search} = this.props,
      items = searchHelpers.getSearchItems(search),
      seeAll = getContentLinks(content, `field_events_list_link`);

    let cards = [];

    if (items.length) {
      cards = items.map(item => ({
        cardType: 'card',
        headline: item.title,
        background: item.image,
        subtitle: item.header,
        showLike: true,
        onLike: item.onHeartClick,
        sustainabilityStatus: item.sustainabilityStatus,
        ...item,
      }));
    }

    return items.length
      ? {
        title: get(content, 'field_events_list_title'),
        description: get(content, 'field_events_list_description'),
        items: cards,
        pageSize: 4,
        pageSizeMobile: 2,
        seeAllLinkText: get(seeAll, ['0', 'title']),
        seeAllLink: get(seeAll, ['0', 'link']),
      }
      : null;
  };

  getPageTitle = () => {
    const title = getContentTitle(this.props.content);
    if (title) {
      return helpers.composePageTitle(title);
    } else {
      return helpers.composePageTitle('');
    }
  };

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentSpecialHeroCarouselSlides(content),
      firstGridCardListProps = this.getHomepageCardListProps(content),
      secondGridCardListProps = this.getHomepageCardListProps(content, 3),
      thirdGridCardListProps = this.getLocalGuideCardListProps(),
      fourthGridCardListProps = this.getHomepageCardListProps(content, 4),
      fifthGridCardListProps = this.getHomepageCardListProps(content, 5),
      videoCarouselSlides = this.getVideoCarouselSlides(),
      photoGridData = this.state.photoGrid,
      eventsCardListProps = this.getEventsCardListProps(),
      simpleQuote = getContentSimpleQuote(content),
      twitterQuote = getContentTwitterQuote(content);

    const banner = {
      iconType: undefined,
      title: i18n.t('myHelsinkiBanner:text'),
      link: i18n.t('myHelsinkiBanner:buttonLink'),
      linkText: i18n.t('myHelsinkiBanner:buttonText'),
      linkTextMobile: i18n.t('myHelsinkiBanner:buttonTextMobile'),
      colorScheme: {
        background: Colors.HEL_BUS_1,
        text: 'white',
        button: 'white',
      },
    };

    return (
      <div className="homepage">
        <Helmet>
          <title>{this.getPageTitle()}</title>
          <meta property="og:title" content={this.getPageTitle()} />
        </Helmet>
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel type={HeroCarouselTypes.SPECIAL} slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Banner {...banner} />
          </Column>
        </Row>

        <DisplayThisSection when={firstGridCardListProps}>
          <div className="grid-card-list grid-card-list--first">
            <Row>
              <Column>
                <GridCardList
                  className="first-grid-card-list"
                  {...firstGridCardListProps}
                  cardOverrides={{
                    detailsBackground: Colors.HEL_COPPER_2,
                  }}
                  largeCardOverrides={{
                    detailsBackground: Colors.HEL_COPPER_2,
                  }}
                />
              </Column>
            </Row>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={eventsCardListProps}>
          <div className="events-card-list">
            <Row>
              <Column>
                <CardList {...eventsCardListProps} cardDefaults={{isDimmed: true}} />
              </Column>
            </Row>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={secondGridCardListProps}>
          <div className="grid-card-list grid-card-list--second">
            <Koro color={Colors.HEL_ENGEL} flip />
            <div className="grid-card-list-wrapper">
              <Row>
                <Column>
                  <GridCardList
                    {...secondGridCardListProps}
                    cardOverrides={{
                      detailsBackground: Colors.WHITE,
                    }}
                    largeCardOverrides={{
                      detailsBackground: Colors.WHITE,
                    }}
                  />
                </Column>
              </Row>
            </div>
            <Koro color={Colors.HEL_ENGEL} />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={videoCarouselSlides.length}>
          <VideoCarousel slides={videoCarouselSlides} />
        </DisplayThisSection>

        <DisplayThisSection when={thirdGridCardListProps}>
          <div className="grid-card-list grid-card-list--third">
            <Koro color={Colors.HEL_SUOMENLINNA} flip />
            <div className="grid-card-list-wrapper">
              <Row>
                <Column>
                  <GridCardList {...thirdGridCardListProps} />
                </Column>
              </Row>
            </div>
            <Koro color={Colors.HEL_SUOMENLINNA} />
          </div>
        </DisplayThisSection>

        {/* TODO: Remove simple quote support when Twitter quote backend has been deployed */}
        <DisplayThisSection when={simpleQuote && simpleQuote.body}>
          <Row>
            <Column large={6} offsetOnLarge={3}>
              <SimpleQuote {...simpleQuote} sourceText={SimpleQuoteTypes.TWITTER}>
                <div dangerouslySetInnerHTML={{__html: simpleQuote && simpleQuote.body}} />
              </SimpleQuote>
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!isEmpty(twitterQuote)}>
          <Row>
            <Column large={6} offsetOnLarge={3}>
              <TwitterQuote
                author={get(twitterQuote, 'author')}
                authorUrl={get(twitterQuote, 'authorUrl')}
                tweetUrl={get(twitterQuote, 'tweetUrl')}
                text={get(twitterQuote, 'text')}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={fourthGridCardListProps}>
          <div className="grid-card-list grid-card-list--fourth">
            <Koro color={Colors.LIGHT_BLUE} flip />
            <div className="grid-card-list-wrapper">
              <Row>
                <Column>
                  <GridCardList {...fourthGridCardListProps} />
                </Column>
              </Row>
            </div>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={fifthGridCardListProps}>
          <div className="grid-card-list grid-card-list--fifth">
            <Koro color={Colors.LIGHT_SILVER} flip />
            <div className="grid-card-list-wrapper">
              <Row>
                <Column>
                  <GridCardList {...fifthGridCardListProps} />
                </Column>
              </Row>
            </div>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={photoGridData && !isEmpty(photoGridData.photos)}>
          <Row>
            <Column>
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
  translate(['myHelsinkiBanner']),
  connect(
    homePageSelector,
    {fetchSearchByFilters},
  ),
)(Homepage);
