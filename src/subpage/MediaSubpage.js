import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import {Colors, KoroTypes, ImageStyles} from '../constants';
import {
  getContentTitle,
  getContentCoverImage,
  getContentSimpleQuote,
  getContentLinkListItems,
  getContentCards,
  getAccordionGroups,
  getContactCards,
  getContentBreadcrumbs,
} from '../content/helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import Hero from '../hero/Hero';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import BigCardList from '../bigCardList/BigCardList';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Accordion from '../accordion/Accordion';
import LinkList from '../linkList/LinkList';
import Koro from '../koro/Koro';
import ContactCards from '../contactCards/ContactCards';

type Props = {
  content: Object,
};

class MediaSubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Media subpage: %o', this.props.content);
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

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageData = getContentCoverImage(content);

    return heroImageData ? `url("${heroImageData}")` : null;
  };

  getBigCardListProps = () => {
    const {content} = this.props;
    const imageStyle = ImageStyles.SQUARE_375;

    return {
      items: getContentCards(content, 'field_media_cards', imageStyle),
      noCarousel: true,
    };
  };

  getContactCardsProps = () => {
    const {content} = this.props,
      items = getContactCards(content);

    return {
      title: get(content, 'field_contact_cards_title'),
      items: items,
    };
  };

  render() {
    const {content} = this.props,
      heroBackground = this.getHeroBackground(),
      linkListProps = this.getLinkListProps(),
      quote = getContentSimpleQuote(content),
      bigCardListProps = this.getBigCardListProps(),
      contactCardsProps = this.getContactCardsProps();

    return (
      <div className="subpage subpage--media">
        <DisplayThisSection when={!isEmpty(heroBackground)}>
          <Hero
            background={heroBackground}
            koroColor="#ffffff"
            title={getContentTitle(content)}
            showVaakuna={false}
          />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!isEmpty(quote)}>
          <Row>
            <Column>
              <SimpleQuote
                centered={true}
                sourceText={quote.sourceText}
                sourceTitle={quote.sourceTitle}
                sourceImage={quote.sourceImage}
              >
                <div dangerouslySetInnerHTML={{__html: quote.body}} />
              </SimpleQuote>
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!isEmpty(bigCardListProps)}>
          <BigCardList {...bigCardListProps} pageSize="3" koro={KoroTypes.MEDIUM_WAVE} />
        </DisplayThisSection>

        <DisplayThisSection when={!isEmpty(contactCardsProps)}>
          <ContactCards {...contactCardsProps} />
        </DisplayThisSection>

        <DisplayThisSection when={getAccordionGroups(content).length}>
          <div className="accordion">
            <div className="accordion__wrapper">
              <Row>
                <Column>
                  {getAccordionGroups(content).map((accordionGroup, i) => (
                    <div key={i}>
                      {!!accordionGroup.title && (
                        <h3 className="myhki-accordion-group__title">{accordionGroup.title}</h3>
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

        <DisplayThisSection when={!isEmpty(linkListProps)}>
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

export default MediaSubpage;
