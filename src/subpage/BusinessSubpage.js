import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import get from 'lodash/get';

import HeroCarousel from '../heroCarousel/HeroCarousel';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';
import CardList from '../cardList/CardList';
import LinkList from '../linkList/LinkList';
import Koro from '../koro/Koro';
import TextCarousel from '../textCarousel/TextCarousel';
import QuoteCarousel from '../quoteCarousel/QuoteCarousel';
import ImageCarousel from '../imageCarousel/ImageCarousel';
import CTABlock from '../ctaBlock/CTABlock';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import GridCardList from '../gridCardList/GridCardList';

import {
  getContentHeroCarouselSlides,
  getContentQuote,
  getContentLiftUpCarouselSlides,
  getContentLiftUpCarouselTitle,
  getContentCards,
  getContentLink,
  getContentLinkTitle,
  getContentLinkListItems,
  getContentTextCarouselItems,
  getContentQuoteCarouselItems,
  getContentImageCarouselItems,
  getContentCTABlockProps,
  getContentBreadcrumbs,
  getGridCardListProps,
} from '../content/helpers';
import {ImageStyles} from '../constants';

type Props = {
  content: Object,
};

class BusinessSubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Business subpage: %o', this.props.content);
    }
  }

  getRelatedArticlesProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'field_related_articles'),
      link = getContentLink(content, 'field_related_articles_link[0]'),
      linkText = getContentLinkTitle(content, 'field_related_articles_link[0]');

    return items.length
      ? {
        title: get(content, 'field_related_articles_title'),
        items: items,
        seeAllLink: link,
        seeAllLinkText: linkText,
      }
      : null;
  };

  getCardListProps = (field: string, title_field: string, link_field: ?string) => {
    const {content} = this.props,
      items = getContentCards(content, field, ImageStyles.CARD_275, 'default'),
      link = getContentLink(content, link_field);

    return items.length
      ? {
        title: get(content, title_field),
        items: items,
        seeAllLink: link,
      }
      : null;
  };

  getQuoteCarouselProps = () => {
    const {content} = this.props,
      items = getContentQuoteCarouselItems(content);

    return {
      title: get(content, 'field_quote_carousel_title'),
      items: items,
    };
  };

  getTextCarouselProps = () => {
    const {content} = this.props,
      items = getContentTextCarouselItems(content);

    return items.length
      ? {
        title: get(content, 'field_text_carousel_title'),
        items: items,
      }
      : null;
  };

  getImageCarouselProps = () => {
    const {content} = this.props,
      items = getContentImageCarouselItems(content);

    return items.length
      ? {
        title: get(content, 'field_image_carousel_title'),
        items: items,
      }
      : null;
  };

  getLinkListProps = () => {
    const {content} = this.props,
      items = getContentLinkListItems(content);

    return items.length
      ? {
        title: get(content, 'field_link_list_title'),
        items: items,
      }
      : null;
  };

  getStartupServicesProps = () => {
    const {content} = this.props;

    return {
      title: getContentLiftUpCarouselTitle(content, 'field_carousel_title_2'),
      slides: getContentLiftUpCarouselSlides(content, 'field_carousel_2'),
    };
  };

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      relatedArticlesProps = this.getRelatedArticlesProps(),
      articleCardsProps = this.getCardListProps(
        'field_card_list',
        'field_card_list_title',
        'field_card_list_link[0]',
      ),
      startupCardsProps = this.getCardListProps(
        'field_company_cards',
        'field_company_cards_title',
        null,
      ),
      caseStoriesUpCarouselSlides = getContentLiftUpCarouselSlides(content),
      whyHelsinkiCarouselProps = this.getQuoteCarouselProps(),
      keyIndicatorCarouselProps = this.getImageCarouselProps(),
      startupEventsCardsProps = this.getCardListProps(
        'field_card_list_2',
        'field_card_list_title_2',
        'field_card_list_link_2[0]',
      ),
      businesSetupUpCtaProps = getContentCTABlockProps(content),
      quote = getContentQuote(content, 'field_simple_quote[0]'),
      linkListProps = this.getLinkListProps(),
      factsCarouselProps = this.getTextCarouselProps(),
      startupServicesProps = this.getStartupServicesProps(),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div className="subpage subpage--startup">
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!isEmpty(quote)}>
          <div className="startup-page__quote">
            <Row>
              <Column large={6} offsetOnLarge={3}>
                <SimpleQuote centered={true} {...omit(quote, ['body'])}>
                  <div dangerouslySetInnerHTML={{__html: get(quote, 'body')}} />
                </SimpleQuote>
              </Column>
            </Row>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={gridCardListProps}>
          <div className="grid-card-list">
            <Row>
              <Column>
                <GridCardList {...gridCardListProps} />
              </Column>
            </Row>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!caseStoriesUpCarouselSlides.length}>
          <div className="startup-page__gray">
            <Koro color="#ebedf1" flip />
            <div className="startup-page__gray-wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content)}
                    slides={caseStoriesUpCarouselSlides}
                  />
                </Column>
              </Row>
            </div>
            <Koro color="#ebedf1" />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!whyHelsinkiCarouselProps && !isEmpty(whyHelsinkiCarouselProps)}>
          <Row>
            <Column>
              <QuoteCarousel
                type="title-first"
                // className="startup-page__text-carousel startup-page__text-carousel--why-helsinki"
                {...whyHelsinkiCarouselProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!relatedArticlesProps && !isEmpty(relatedArticlesProps.items)}>
          <div className="startup-page__blue">
            <Koro color="#cfe4f5" flip />
            <div className="startup-page__blue-wrapper">
              <Row>
                <Column>
                  <CardList {...relatedArticlesProps} />
                </Column>
              </Row>
            </div>
            <Koro color="#cfe4f5" />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!articleCardsProps && !isEmpty(articleCardsProps.items)}>
          <Row>
            <Column>
              <CardList {...articleCardsProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!startupCardsProps && !isEmpty(startupCardsProps.items)}>
          <Row>
            <Column>
              <CardList cardDefaults={{isDimmed: true}} {...startupCardsProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!factsCarouselProps && !isEmpty(factsCarouselProps.items)}>
          <Row>
            <Column>
              <TextCarousel className="startup-page__text-carousel" {...factsCarouselProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!startupCardsProps && !isEmpty(startupCardsProps.items)}>
          <Row>
            <Column>
              <CardList {...startupEventsCardsProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection
          when={!!keyIndicatorCarouselProps && !isEmpty(keyIndicatorCarouselProps.items)}
        >
          <Row>
            <Column>
              <ImageCarousel
                className="startup-page__image-carousel startup-page__image-carousel--key-indicators"
                {...keyIndicatorCarouselProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!businesSetupUpCtaProps}>
          <Row>
            <Column>
              <CTABlock className="startup-page__business-setup-cta" {...businesSetupUpCtaProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!startupServicesProps && !isEmpty(startupServicesProps.slides)}>
          <Row>
            <Column>
              <LiftUpCarousel {...startupServicesProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!linkListProps && !isEmpty(linkListProps.items)}>
          <Row>
            <Column>
              <LinkList {...linkListProps} />
            </Column>
          </Row>
        </DisplayThisSection>
      </div>
    );
  }
}

export default BusinessSubpage;
