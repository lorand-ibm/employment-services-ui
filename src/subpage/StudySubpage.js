import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

import {Colors, KoroTypes} from '../constants';
import {
  getContentHeroCarouselSlides,
  getContentSimpleQuote,
  getContentLiftUpCarouselTitle,
  getContentLiftUpCarouselSlides,
  getContentLinkListItems,
  getContentCards,
  getContentProgramCards,
  getAccordionGroups,
  getContentTextCarouselItems,
  getContentQuoteCarouselItems,
  getContentBreadcrumbs,
  getContentVideo,
  getContentTitle,
  getGridCardListProps,
} from '../content/helpers';

import i18n from '../root/i18n';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import CardList from '../cardList/CardList';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';
import Accordion from '../accordion/Accordion';
import LinkList from '../linkList/LinkList';
import TextCarousel from '../textCarousel/TextCarousel';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import QuoteCarousel from '../quoteCarousel/QuoteCarousel';
import Koro from '../koro/Koro';
import GridCardList from '../gridCardList/GridCardList';

type Props = {
  content: Object,
  t: Function,
};

class StudySubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Study subpage: %o', this.props.content);
    }
  }

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

  getRelatedArticlesCardListProps = () => {
    const {t, content} = this.props,
      items = getContentCards(content, 'field_related_articles');

    if (!items.length) {
      return null;
    }

    return {
      title: t('relatedArticlesLabel'),
      items: items,
      seeAllLink: `/${i18n.language}/search?category=other&keywords=${t('study')}`,
    };
  };

  getFeaturedProgramsCardListProps = () => {
    const {content} = this.props,
      items = getContentProgramCards(content, 'field_programme_cards');

    if (!items.length) {
      return null;
    }

    return {
      title: get(content, 'field_programme_cards_title'),
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

  getVideoCarouselSlides = () => {
    const {content} = this.props,
      videos = [];

    forEach(get(content, 'field_video_carousel', []), item => {
      videos.push({
        video: getContentVideo(item),
        description: getContentTitle(item),
      });
    });

    return videos;
  };

  getSimpleQuoteProps = () => {
    const {content} = this.props,
      quote = getContentSimpleQuote(content);

    if (!quote) {
      return null;
    }

    const {body, sourceText, sourceImage, sourceTitle} = quote;

    return {
      body,
      sourceText,
      sourceImage,
      sourceTitle,
    };
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
      featuredProgramsCardListProps = this.getFeaturedProgramsCardListProps(content),
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      liftUpCarouselSlides = getContentLiftUpCarouselSlides(content),
      linkListProps = this.getLinkListProps(),
      quoteProps = this.getSimpleQuoteProps(),
      relatedArticlesCardListProps = this.getRelatedArticlesCardListProps(),
      textCarouselProps = this.getTextCarouselProps(),
      videoCarouselSlides = this.getVideoCarouselSlides(),
      quoteCarouselProps = this.getQuoteCarouselProps(),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div className="subpage subpage--study">
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!!quoteProps}>
          <Row>
            <Column>
              <SimpleQuote centered={true} {...quoteProps}>
                <div dangerouslySetInnerHTML={{__html: !!quoteProps && get(quoteProps, 'body')}} />
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

        <DisplayThisSection when={!!videoCarouselSlides.length}>
          <VideoCarousel slides={videoCarouselSlides} />
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
            <Koro color={Colors.HEL_SILVER} type={KoroTypes.BASIC_WAVE} flip />
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
            <Koro color={Colors.HEL_SILVER} type={KoroTypes.BASIC_WAVE} />
          </div>
        </DisplayThisSection>

        <DisplayThisSection
          when={!!featuredProgramsCardListProps && !isEmpty(featuredProgramsCardListProps.items)}
        >
          <Row>
            <Column>
              <CardList
                className="featured-programs-card-list"
                {...featuredProgramsCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!textCarouselProps && !isEmpty(textCarouselProps.items)}>
          <Row>
            <Column>
              <TextCarousel className="subpage--study__text-carousel" {...textCarouselProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={getAccordionGroups(content).length}>
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

export default flowRight(translate(['common', 'study']))(StudySubpage);
