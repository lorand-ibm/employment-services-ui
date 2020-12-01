import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';

import Hero from '../hero/Hero';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import ReadMore from '../readMore/ReadMore';
import CardList from '../cardList/CardList';
import LocationCarousel from '../locationCarousel/LocationCarousel';
import Koro from '../koro/Koro';

import {Colors, KoroTypes} from '../constants';
import * as contentHelpers from '../content/helpers';

type Props = {
  content: Object,
};

class LocalGuidePage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Local guide page: %o', this.props.content);
    }
  }

  getFirstCardListProps = () => {
    const {content} = this.props,
      items = contentHelpers.getContentCards(content, 'field_card_list'),
      seeAll = contentHelpers.getContentSeeAllLink(content, 'field_card_list_link');

    return items.length
      ? {
        title: get(content, 'field_card_list_title'),
        items: items,
        seeAllLink: seeAll && seeAll.link,
        seeAllLinkText: seeAll && seeAll.text,
        pageSize: 4,
        pageSizeMobile: 1,
      }
      : null;
  };

  getSecondCardListProps = () => {
    const {content} = this.props,
      items = contentHelpers.getContentCards(content, 'field_card_list_2'),
      ctaProps = contentHelpers.getContentCTAProps(content),
      seeAll = contentHelpers.getContentSeeAllLink(content, 'field_card_list_link_2');

    if (ctaProps) {
      items.splice(3, 0, {
        cardType: 'cta',
        ...ctaProps,
      });
    }

    return items.length
      ? {
        title: get(content, 'field_card_list_title_2'),
        items: items,
        seeAllLink: seeAll && seeAll.link,
        seeAllLinkText: seeAll && seeAll.text,
        pageSize: 4,
        pageSizeMobile: 1,
      }
      : null;
  };

  getQuote = () => {
    const quoteData = get(this.props.content, 'field_simple_quote[0]');

    if (!quoteData) {
      return null;
    }

    return {
      body: get(quoteData, 'body[0].value'),
    };
  };

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageData = contentHelpers.getContentCoverImage(content);

    return heroImageData ? `url("${heroImageData}")` : null;
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
    const {content} = this.props,
      heroBackground = this.getHeroBackground(),
      firstCardListProps = this.getFirstCardListProps(),
      secondCardListProps = this.getSecondCardListProps(),
      locationCarouselItems = contentHelpers.getContentLocationCarouselItems(content),
      quote = this.getQuote(),
      locationCarouselContent = this.getLocationCarouselContent();

    return (
      <div className="local-guide-page">
        <div className="local-guide-page__upper-wrapper">
          <DisplayThisSection when={heroBackground}>
            <Hero
              background={heroBackground}
              koroType={KoroTypes.PYRAMID}
              koroColor={Colors.HEL_MY_HELSINKI}
            />
          </DisplayThisSection>
          <Row>
            <Column medium={10} offsetOnMedium={1}>
              <h1 className="local-guide-page__title">{contentHelpers.getContentTitle(content)}</h1>
              <DisplayThisSection when={quote && quote.body}>
                <h2 className="local-guide-page__quote">
                  &#8220;
                  <div dangerouslySetInnerHTML={{__html: quote.body}} />
                  &#8221;
                </h2>
              </DisplayThisSection>
              <ReadMore
                className="local-guide-page__body"
                summary={contentHelpers.getContentBody(content, true)}
                html={true}
              >
                <div
                  dangerouslySetInnerHTML={{__html: contentHelpers.getContentBody(content, false)}}
                />
              </ReadMore>
            </Column>
          </Row>
          <DisplayThisSection when={locationCarouselItems.length}>
            <LocationCarousel items={locationCarouselItems} content={locationCarouselContent} />
          </DisplayThisSection>
        </div>
        <div className="local-guide-page__lower-wrapper">
          <Koro color="#ffffff" flip />
          <DisplayThisSection when={firstCardListProps}>
            <Row>
              <Column medium={12}>
                <CardList
                  className="first-card-list"
                  {...firstCardListProps}
                  cardDefaults={{isDimmed: true}}
                />
              </Column>
            </Row>
          </DisplayThisSection>
          <DisplayThisSection when={secondCardListProps}>
            <Row>
              <Column medium={12}>
                <CardList
                  className="second-card-list"
                  {...secondCardListProps}
                  cardDefaults={{isDimmed: true}}
                />
              </Column>
            </Row>
          </DisplayThisSection>
        </div>
      </div>
    );
  }
}

export default LocalGuidePage;
