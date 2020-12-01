import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isExternal from 'is-url-external';
import isEmpty from 'lodash/isEmpty';

import {Colors, KoroTypes, ImageStyles} from '../constants';
import {
  getContentHeroCarouselSlides,
  getContentSimpleQuote,
  getContentLiftUpCarouselTitle,
  getContentLiftUpCarouselSlides,
  getContentLinkListItems,
  getContentCards,
  getAccordionGroups,
  getContentTextCarouselItems,
  getContentQuoteCarouselItems,
  getContentBreadcrumbs,
  getGridCardListProps,
} from '../content/helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import CardList from '../cardList/CardList';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';
import Accordion from '../accordion/Accordion';
import LinkList from '../linkList/LinkList';
import TextCarousel from '../textCarousel/TextCarousel';
import QuoteCarousel from '../quoteCarousel/QuoteCarousel';
import Koro from '../koro/Koro';
import GridCardList from '../gridCardList/GridCardList';

type Props = {
  content: Object,
};

class WorkSubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Work subpage: %o', this.props.content);
    }
  }

  getLinkListProps = () => {
    const {content} = this.props;

    return {
      title: get(content, 'field_link_list_title'),
      items: getContentLinkListItems(content),
    };
  };

  getRelatedArticlesCardListProps = () => {
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

  getStartupEventsCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'field_card_list');

    if (!items.length) {
      return null;
    }
    let seeAllLink = '';
    const alias = get(content, 'field_card_list_link[0].alias');
    const langcode = get(content, 'field_card_list_link[0].langcode');
    if (alias && langcode) {
      if (global.IS_CLIENT) {
        if (isExternal(alias)) {
          seeAllLink = alias;
        } else {
          seeAllLink = `/${langcode}${alias}`;
        }
      } else {
        seeAllLink = `/${langcode}${alias}`;
      }
    }

    return {
      title: get(content, 'field_card_list_title'),
      seeAllLink: seeAllLink,
      seeAllLinkText: get(content, 'field_card_list_link[0].title'),
      items: items,
    };
  };

  getFeaturedCompaniesCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'field_company_cards', ImageStyles.CARD_275);

    if (!items.length) {
      return null;
    }

    return {
      title: get(content, 'field_company_cards_title'),
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

  getQuoteCarouselProps = () => {
    const {content} = this.props,
      items = getContentQuoteCarouselItems(content);

    return {
      title: get(content, 'field_quote_carousel_title'),
      items: items,
    };
  };

  render() {
    const {content} = this.props,
      startupEventsCardListProps = this.getStartupEventsCardListProps(content),
      featuredCompaniesCardListProps = this.getFeaturedCompaniesCardListProps(content),
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      liftUpCarouselSlides = getContentLiftUpCarouselSlides(content),
      liftUpCarouselSlides2 = getContentLiftUpCarouselSlides(content, 'field_carousel_2'),
      linkListProps = this.getLinkListProps(),
      quote = getContentSimpleQuote(content),
      relatedArticlesCardListProps = this.getRelatedArticlesCardListProps(),
      textCarouselProps = this.getTextCarouselProps(),
      quoteCarouselProps = this.getQuoteCarouselProps(),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div className="subpage subpage--work">
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!!quote}>
          <Row>
            <Column>
              <SimpleQuote
                centered={true}
                sourceText={get(quote, 'sourceText')}
                sourceTitle={get(quote, 'sourceTitle')}
                sourceImage={get(quote, 'sourceImage')}
              >
                <div dangerouslySetInnerHTML={{__html: get(quote, 'body')}} />
              </SimpleQuote>
            </Column>
          </Row>
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
          <div className="lift-up-carousel">
            <Koro
              type={KoroTypes.BASIC_WAVE}
              color={Colors.LIGHT_BLUE}
              className="koro-1"
              flip={true}
            />
            <div className="lift-up-carousel__wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content)}
                    slides={liftUpCarouselSlides}
                  />
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.LIGHT_BLUE} className="koro-2" />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!quoteCarouselProps && !isEmpty(quoteCarouselProps.items)}>
          <Row>
            <Column>
              <QuoteCarousel type="title-first" {...quoteCarouselProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection
          when={!!relatedArticlesCardListProps && !isEmpty(relatedArticlesCardListProps.items)}
        >
          <div className="related-articles">
            <Koro color={Colors.LIGHT_SILVER} type={KoroTypes.BASIC_WAVE} flip />
            <div className="related-articles__wrapper">
              <Row>
                <Column>
                  <CardList
                    className="related-articles__card-list"
                    {...relatedArticlesCardListProps}
                  />
                </Column>
              </Row>
            </div>
            <Koro color={Colors.LIGHT_SILVER} type={KoroTypes.BASIC_WAVE} />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!liftUpCarouselSlides2.length}>
          <div className="lift-up-carousel">
            <Koro
              type={KoroTypes.BASIC_WAVE}
              color={Colors.LIGHT_BLUE}
              className="koro-1"
              flip={true}
            />
            <div className="lift-up-carousel__wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content, 'field_carousel_title_2')}
                    slides={liftUpCarouselSlides2}
                  />
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.LIGHT_BLUE} className="koro-2" />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!textCarouselProps && !isEmpty(textCarouselProps.items)}>
          <Row>
            <Column>
              <TextCarousel className="subpage--work__text-carousel" {...textCarouselProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection
          when={!!featuredCompaniesCardListProps && !isEmpty(featuredCompaniesCardListProps.items)}
        >
          <Row>
            <Column>
              <CardList
                className="startup-events-card-list"
                cardDefaults={{isDimmed: true}}
                {...featuredCompaniesCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection
          when={!!startupEventsCardListProps && !isEmpty(startupEventsCardListProps.items)}
        >
          <Row>
            <Column>
              <CardList
                cardDefaults={{isDimmed: true, showLike: true}}
                className="startup-events-card-list"
                {...startupEventsCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!getAccordionGroups(content).length}>
          <div className="accordion">
            <div className="accordion__wrapper">
              <Row>
                <Column>
                  {getAccordionGroups(content).map((accordionGroup, i) => (
                    <div key={i}>
                      {!!accordionGroup.title && (
                        <h2 className="myhki-accordion-group__title">{accordionGroup.title}</h2>
                      )}
                      {/* TODO: AccordionGroup.title is not and editable field in Drupal */}
                      {accordionGroup.accordions.map((accordion, i) => (
                        <Accordion
                          title={accordion.title}
                          icon={accordion.icon}
                          sourceIcon={accordion.sourceIcon}
                          sourceTitle={accordion.sourceTitle}
                          sourceText={accordion.sourceText}
                          key={`accordion-${i}`}
                          children={{}}
                        >
                          <div dangerouslySetInnerHTML={{__html: accordion.body}} />
                          {/* TODO: Needs field in Drupal for:
                           - source image (e.g. face shot)
                           - source title (e.g. Julie Williams)
                           - source body (e.g. Lives in Helsinki since 2010) */}
                        </Accordion>
                      ))}
                    </div>
                  ))}
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.HEL_FOG} />
          </div>
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

export default WorkSubpage;
