import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import omit from 'lodash/omit';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';
import CardList from '../cardList/CardList';
import LinkList from '../linkList/LinkList';
import Koro from '../koro/Koro';
import TextCarousel from '../textCarousel/TextCarousel';
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
  getContentBreadcrumbs,
  getGridCardListProps,
} from '../content/helpers';

type Props = {
  content: Object,
};

class InvestSubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Invest subpage: %o', this.props.content);
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

  getCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content),
      link = getContentLink(content, 'field_card_list_link[0]');

    return items.length
      ? {
        title: get(content, 'field_card_list_title'),
        items: items,
        seeAllLink: link,
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

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      relatedArticlesProps = this.getRelatedArticlesProps(),
      cardListProps = this.getCardListProps(),
      liftUpCarouselSlides = getContentLiftUpCarouselSlides(content),
      liftUpCarousel2Slides = getContentLiftUpCarouselSlides(content, 'field_carousel_2'),
      liftUpCarousel3Slides = getContentLiftUpCarouselSlides(content, 'field_carousel_3'),
      quote = getContentQuote(content, 'field_simple_quote[0]'),
      linkListProps = this.getLinkListProps(),
      textCarouselProps = this.getTextCarouselProps(),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div className="subpage subpage--invest">
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!isEmpty(quote)}>
          <div className="invest-page__quote">
            <Row>
              <Column large={6} offsetOnLarge={3}>
                <SimpleQuote centered={true} {...omit(quote, ['body'])}>
                  <div dangerouslySetInnerHTML={{__html: quote.body}} />
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

        <DisplayThisSection when={!!liftUpCarouselSlides.length}>
          <div className="invest-page__gray">
            <Koro color="#ebedf1" flip />
            <div className="invest-page__gray-wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content)}
                    slides={liftUpCarouselSlides}
                  />
                </Column>
              </Row>
            </div>
            <Koro color="#ebedf1" />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!textCarouselProps && !isEmpty(textCarouselProps.items)}>
          <Row>
            <Column>
              <TextCarousel className="invest-page__text-carousel" {...textCarouselProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!relatedArticlesProps && !isEmpty(relatedArticlesProps.items)}>
          <div className="invest-page__blue">
            <Koro color="#cfe4f5" flip />
            <div className="invest-page__blue-wrapper">
              <Row>
                <Column>
                  <CardList {...relatedArticlesProps} />
                </Column>
              </Row>
            </div>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!cardListProps && !isEmpty(cardListProps.items)}>
          <div className="invest-page__blue">
            <Koro color="#cfe4f5" flip />
            <div className="invest-page__blue-wrapper">
              <Row>
                <Column>
                  <CardList {...cardListProps} />
                </Column>
              </Row>
            </div>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!liftUpCarouselSlides.length}>
          <div className="invest-page__gray">
            <Koro color="#ebedf1" flip />
            <div className="invest-page__gray-wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content, 'field_carousel_title_2')}
                    slides={liftUpCarousel2Slides}
                  />
                </Column>
              </Row>
            </div>
            <Koro color="#ebedf1" />
          </div>
        </DisplayThisSection>

        <Row>
          <Column>
            <DisplayThisSection when={!!liftUpCarouselSlides.length}>
              <LiftUpCarousel
                title={getContentLiftUpCarouselTitle(content, 'field_carousel_title_3')}
                slides={liftUpCarousel3Slides}
              />
            </DisplayThisSection>

            <DisplayThisSection when={!isEmpty(linkListProps)}>
              <LinkList {...linkListProps} />
            </DisplayThisSection>
          </Column>
        </Row>
      </div>
    );
  }
}

export default InvestSubpage;
