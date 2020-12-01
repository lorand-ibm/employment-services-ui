import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import {Colors, KoroTypes, ImageStyles} from '../constants';
import {
  getContentSeeAllLink,
  getContentHeroCarouselSlides,
  getContentLiftUpCarouselTitle,
  getContentLiftUpCarouselSlides,
  getVideoCarouselSlides,
  getContentLinkListItems,
  getContentCards,
  getAccordionGroups,
  getContentTextCarouselItems,
  getContentQuoteCarouselItems,
  getContactCards,
  getContentBreadcrumbs,
  getContentTwitterQuote,
  stripHtml,
} from '../content/helpers';
import {getFoundationBreakpoint} from '../helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import CardList from '../cardList/CardList';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import MeetingsPackageSnippet from '../meetingsPackage/MeetingsPackageSnippet';
import BigCardList from '../bigCardList/BigCardList';
import Accordion from '../accordion/Accordion';
import LinkList from '../linkList/LinkList';
import TextCarousel from '../textCarousel/TextCarousel';
import QuoteCarousel from '../quoteCarousel/QuoteCarousel';
import ContactCards from '../contactCards/ContactCards';
import Koro from '../koro/Koro';
import TwitterQuote from '../twitter/TwitterQuote';

type Props = {
  content: Object,
};

class TravelIndustrySubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Travel Industry subpage: %o', this.props.content);
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

  /**
   *
   * @param path
   * @param titlePath
   * @returns {*}
   */
  getLatestNewsCardListProps = (
    path: string = 'field_card_list',
    titlePath: string = 'field_card_list_title',
    linkPath: string = 'field_card_list_link_3',
  ) => {
    const {content} = this.props,
      items = getContentCards(content, path);

    if (!items.length) {
      return null;
    }

    const seeAllLink = getContentSeeAllLink(content, linkPath);

    return {
      title: get(content, titlePath),
      items: items,
      seeAllLink: get(seeAllLink, 'link'),
      seeAllLinkText: get(seeAllLink, 'text'),
    };
  };

  getFeaturedCompaniesCardListProps = (
    path: string = 'field_card_list_2',
    titlePath: string = 'field_card_list_title_2',
  ) => {
    const {content} = this.props,
      items = getContentCards(content, path);

    if (!items.length) {
      return null;
    }

    return {
      title: get(content, titlePath),
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

  getQuoteCarouselProps = (
    path: string = 'field_quote_carousel',
    titlePath: string = 'field_quote_carousel_title',
  ) => {
    const {content} = this.props,
      items = getContentQuoteCarouselItems(content, path);

    return {
      title: get(content, titlePath),
      items: items,
    };
  };

  getBigCardListProps = (path: string = 'field_info_cards') => {
    const {content} = this.props;
    const imageStyle = ImageStyles.SQUARE_375;

    return {
      items: getContentCards(content, path, imageStyle),
      noCarousel: true,
    };
  };

  getContactCardsProps = () => {
    const {content} = this.props,
      items = getContactCards(content);
    const subtitle = get(content, 'field_contact_cards_info[0].value');
    return {
      title: get(content, 'field_contact_cards_title'),
      subtitle: subtitle ? stripHtml(subtitle) : '',
      items: items,
    };
  };

  isSnippetHorizontal = () => {
    return getFoundationBreakpoint() !== 'small';
  };

  isFinnishMeetingAndEventsPage = () => {
    const {content} = this.props,
      langcode = get(content, 'langcode'),
      nid = get(content, 'nid');

    return langcode === 'fi' && Number(nid) === 6662;
  };

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentHeroCarouselSlides(content), // field_hero_carousel
      twitterQuote = getContentTwitterQuote(content), // field_twitter
      liftUpCarouselSlides = getContentLiftUpCarouselSlides(content), // field_carousel
      videoCarouselSlides = getVideoCarouselSlides(content), // field_video_carousel
      quoteCarouselProps = this.getQuoteCarouselProps(), // field_quote_carousel
      liftUpCarouselSlides2 = getContentLiftUpCarouselSlides(content, 'field_carousel_2'), // field_carousel_2
      bigCardListProps3 = this.getBigCardListProps('field_info_cards_3'), // field_info_cards_3
      quoteCarouselProps2 = this.getQuoteCarouselProps(
        'field_quote_carousel_2',
        'field_quote_carousel_title_2',
      ), // field_quote_carousel_2
      videoCarouselSlides2 = getVideoCarouselSlides(
        content,
        'field_video_carousel_2',
        'field_video_description_2[0].value',
      ), // field_video_carousel_2
      bigCardListProps = this.getBigCardListProps(), //field_info_cards
      textCarouselProps = this.getTextCarouselProps(), // field_text_carousel
      latestNewsCardListProps = this.getLatestNewsCardListProps(), // field_card_list
      featuredCongressesCardListProps = this.getFeaturedCompaniesCardListProps(), // field_card_list_2
      featuredCompaniesCardListProps = this.getFeaturedCompaniesCardListProps(
        'field_company_cards',
        'field_company_cards_title',
      ), // field_company_cards
      bigCardListProps2 = this.getBigCardListProps('field_info_cards_2'), // field_info_cards_2
      liftUpCarouselSlides4 = getContentLiftUpCarouselSlides(content, 'field_carousel_4'), // field_carousel_4
      cardListProps3 = this.getLatestNewsCardListProps(
        'field_card_list_3',
        'field_card_list_title_3',
        'field_card_list_link_3',
      ), //field_card_list_3
      featuredCompaniesCardListProps2 = this.getFeaturedCompaniesCardListProps(
        'field_company_cards_2',
        'field_company_cards_title_2',
      ), // field_company_cards_2
      latestNewsCardListProps2 = this.getLatestNewsCardListProps(
        'field_card_list_4',
        'field_card_list_title_4',
        'field_card_list_link_4',
      ), //field_card_list_4
      featuredCompaniesCardListProps3 = this.getFeaturedCompaniesCardListProps(
        'field_company_cards_3',
        'field_company_cards_title_3',
      ), // field_company_cards_3
      featuredOrganizersCardListProps = this.getFeaturedCompaniesCardListProps(
        'field_card_list_5',
        'field_card_list_title_5',
      ), // field_card_list_5
      contactCardsProps = this.getContactCardsProps(), // field_contact_cards
      linkListProps = this.getLinkListProps(); // field_link_list
    const isFinnishMeetingPage = this.isFinnishMeetingAndEventsPage();
    const isSnippetHorizontal = this.isSnippetHorizontal();

    return (
      <div className="subpage subpage--travel-industry">
        {/* field_hero_carousel */}
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>
        {/* field_twitter */}
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

        {/* field_carousel */}
        <DisplayThisSection when={!!liftUpCarouselSlides.length && !isFinnishMeetingPage}>
          <div className="lift-up-carousel">
            <div className="lift-up-carousel__wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content, 'field_carousel_title')}
                    slides={liftUpCarouselSlides}
                  />
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.HEL_SILVER} className="koro-2" />
          </div>
        </DisplayThisSection>

        {/* field_video_carousel */}
        <DisplayThisSection when={!!videoCarouselSlides.length && !isFinnishMeetingPage}>
          <VideoCarousel slides={videoCarouselSlides} colorScheme={{background: Colors.HEL_ENGEL}} />
        </DisplayThisSection>
        {/* field_quote_carousel */}
        <DisplayThisSection when={!!quoteCarouselProps.items.length && !isFinnishMeetingPage}>
          <Row>
            <Column>
              <QuoteCarousel type="title-first" {...quoteCarouselProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        {/* field_carousel_2 */}
        <DisplayThisSection when={!!liftUpCarouselSlides2.length}>
          <div className="lift-up-carousel-2 consecutive-below">
            <Koro
              type={KoroTypes.BASIC_WAVE}
              color={Colors.HEL_SILVER}
              className="koro-1"
              flip={true}
            />
            <div className="lift-up-carousel-2__wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content, 'field_carousel_title_2')}
                    slides={liftUpCarouselSlides2}
                  />
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.HEL_SILVER} className="koro-2" />
          </div>
        </DisplayThisSection>

        {/* field_info_cards_3 */}
        <DisplayThisSection when={!!bigCardListProps3.items.length && isFinnishMeetingPage}>
          <div
            className={classNames('big-card-list-2', {
              'consecutive-below': !!getAccordionGroups(content).length,
            })}
          >
            <BigCardList
              {...bigCardListProps3}
              koro={KoroTypes.BASIC_WAVE}
              pageSize="3"
              background={Colors.HEL_SILVER}
            />
          </div>
        </DisplayThisSection>
        {/* field_quote_carousel_2 */}
        <DisplayThisSection when={!!quoteCarouselProps2.items.length && isFinnishMeetingPage}>
          <Row>
            <Column>
              <QuoteCarousel type="title-first" {...quoteCarouselProps2} />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_video_carousel_2 */}
        <DisplayThisSection when={!!videoCarouselSlides2.length && isFinnishMeetingPage}>
          <VideoCarousel slides={videoCarouselSlides2} colorScheme={{background: Colors.HEL_ENGEL}} />
        </DisplayThisSection>

        {/* field_info_cards */}
        <DisplayThisSection when={!!bigCardListProps.items.length}>
          <div className="big-card-list consecutive-above">
            <Koro
              type={KoroTypes.BASIC_WAVE}
              color={Colors.HEL_FOG}
              className="koro-3"
              flip={true}
            />
            <BigCardList
              {...bigCardListProps}
              pageSize="3"
              koro={KoroTypes.BASIC_WAVE}
              background={Colors.HEL_FOG}
            />
          </div>
        </DisplayThisSection>
        {/* field_text_carousel */}
        <DisplayThisSection when={!!textCarouselProps}>
          <Row>
            <Column>
              <TextCarousel
                className="subpage--travel-industry__text-carousel"
                {...textCarouselProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <MeetingsPackageSnippet isHorizontal={isSnippetHorizontal} />

        {/* field_card_list */}
        <DisplayThisSection when={!!latestNewsCardListProps}>
          <div className="latest-news">
            <Koro color={Colors.LIGHT_BLUE} type={KoroTypes.BASIC_WAVE} flip />
            <div className="latest-news__wrapper">
              <Row>
                <Column>
                  <CardList className="latest-news-card-list" {...latestNewsCardListProps} />
                </Column>
              </Row>
            </div>
            <Koro color={Colors.LIGHT_BLUE} type={KoroTypes.BASIC_WAVE} />
          </div>
        </DisplayThisSection>
        {/* field_card_list_2 */}
        <DisplayThisSection when={!!featuredCongressesCardListProps}>
          <Row>
            <Column>
              <CardList
                className="featured-companies-card-list"
                cardOverrides={{type: 'default', isDimmed: true}}
                {...featuredCongressesCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_company_cards */}
        <DisplayThisSection when={!!featuredCompaniesCardListProps}>
          <Row>
            <Column>
              <CardList
                className="featured-companies-card-list"
                cardOverrides={{type: 'default', isDimmed: true}}
                {...featuredCompaniesCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_info_cards_2 */}
        <DisplayThisSection when={!!bigCardListProps2.items.length}>
          <div
            className={classNames('big-card-list-2', {
              'consecutive-below': !!getAccordionGroups(content).length,
            })}
          >
            <BigCardList
              {...bigCardListProps2}
              koro={!!liftUpCarouselSlides4.length && KoroTypes.BASIC_WAVE}
              pageSize="3"
              background={Colors.HEL_SILVER}
            />
          </div>
        </DisplayThisSection>
        <DisplayThisSection when={!!getAccordionGroups(content).length}>
          <div className="accordion consecutive-above">
            <Koro type={KoroTypes.BASIC_WAVE} flip={true} color={Colors.HEL_FOG} />
            <div className="accordion__wrapper">
              <Row>
                <Column>
                  {getAccordionGroups(content).map((accordionGroup, i) => (
                    <div className="myhki-accordion-group" key={i}>
                      {!!accordionGroup.title && (
                        <h3 className="myhki-accordion-group__title">{accordionGroup.title}</h3>
                      )}
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
        {/* field_carousel_4 */}
        <DisplayThisSection when={!!liftUpCarouselSlides4.length}>
          <div className="lift-up-carousel-4">
            <Koro
              type={KoroTypes.BASIC_WAVE}
              color={Colors.HEL_SILVER}
              className="koro-1"
              flip={true}
            />
            <div className="lift-up-carousel-4__wrapper">
              <Row>
                <Column>
                  <LiftUpCarousel
                    title={getContentLiftUpCarouselTitle(content, 'field_carousel_title_4')}
                    slides={liftUpCarouselSlides4}
                  />
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.HEL_SILVER} className="koro-2" />
          </div>
        </DisplayThisSection>
        {/* field_card_list_3 */}
        <DisplayThisSection when={!!cardListProps3 && isFinnishMeetingPage}>
          <Row>
            <Column>
              <CardList
                className="featured-companies-card-list"
                cardOverrides={{type: 'default', isDimmed: true}}
                {...cardListProps3}
              />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_company_cards_2 */}
        <DisplayThisSection when={!!featuredCompaniesCardListProps2}>
          <Row>
            <Column>
              <CardList
                className="featured-companies-card-list"
                cardOverrides={{type: 'default', isDimmed: true}}
                {...featuredCompaniesCardListProps2}
              />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_card_list_4 */}
        <DisplayThisSection when={!!latestNewsCardListProps2}>
          <div className="latest-news">
            <Koro color={Colors.LIGHT_BLUE} type={KoroTypes.BASIC_WAVE} flip />
            <div className="latest-news__wrapper">
              <Row>
                <Column>
                  <CardList className="latest-news-card-list" {...latestNewsCardListProps2} />
                </Column>
              </Row>
            </div>
            <Koro color={Colors.LIGHT_BLUE} type={KoroTypes.BASIC_WAVE} />
          </div>
        </DisplayThisSection>
        {/* field_company_cards_3 */}
        <DisplayThisSection when={!!featuredCompaniesCardListProps3}>
          <Row>
            <Column>
              <CardList
                className="featured-companies-card-list"
                cardOverrides={{type: 'default', isDimmed: true}}
                {...featuredCompaniesCardListProps3}
              />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_card_list_5 */}
        <DisplayThisSection when={!!featuredOrganizersCardListProps}>
          <Row>
            <Column>
              <CardList
                className="featured-companies-card-list"
                {...featuredOrganizersCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>
        {/* field_contact_cards */}
        <DisplayThisSection when={!!contactCardsProps}>
          <ContactCards {...contactCardsProps} />
        </DisplayThisSection>
        {/* field_link_list */}
        <DisplayThisSection when={!!linkListProps}>
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

export default TravelIndustrySubpage;
