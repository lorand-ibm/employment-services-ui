import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import CardList from '../cardList/CardList';
import LiftUpCollection from '../liftUps/LiftUpCollection';
import LiftUpSimple from '../liftUps/LiftUpSimple';
import LiftUpMyHelsinki from '../liftUps/LiftUpMyHelsinki';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Tags from '../tags/Tags';
import PhotoGrid from '../photoGrid/PhotoGrid';
import GridCardList from '../gridCardList/GridCardList';

import {Colors} from '../constants';

import {
  getContentCards,
  getContentLink,
  getContentLinkTitle,
  getContentHeroCarouselSlides,
  getContentLiftUpCollectionItems,
  getContentSimpleLiftUpProps,
  getContentTags,
  getContentPhotogridData,
  getContentSeeAllLink,
  getContentBreadcrumbs,
  getGridCardListProps,
} from '../content/helpers';

import * as myHelsinkiHelpers from '../myHelsinki/helpers';

const cardDefaults = {
  isDimmed: true,
  showRating: true,
};

type Props = {
  content: Object,
  t: Function,
  i18n: Object,
};

type State = {
  photoGrid: Object,
};

class EatAndDrinkSubpage extends Component<Props, State> {
  props: Props;
  state: State = {
    photoGrid: {},
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Eat & Drink subpage: %o', this.props.content);

      getContentPhotogridData(this.props.content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      });
    }
  }

  getFirstCardListProps = () => {
    const {content} = this.props;
    return {
      title: get(content, 'field_card_list_title'),
      items: getContentCards(content, 'field_card_list'),
      seeAllLink: getContentLink(content, 'field_card_list_link[0]'),
      seeAllLinkText: getContentLinkTitle(content, 'field_card_list_link[0]'),
    };
  };

  getSecondCardListProps = () => {
    const {content} = this.props;

    return {
      title: get(content, 'field_card_list_title_2'),
      items: getContentCards(content, 'field_card_list_2'),
      seeAllLink: getContentLink(content, 'field_card_list_link_2[0]'),
      seeAllLinkText: getContentLinkTitle(content, 'field_card_list_link_2[0]'),
    };
  };

  getRelatedEntitiesCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'related_entities.items');

    if (!items.length) {
      return null;
    }
    return {
      items: items,
      seeAllLink: get(content, 'related_entities.see_all_link_path'),
      seeAllLinkText: get(content, 'related_entities.title'),
    };
  };

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      liftUpCollectionItems = getContentLiftUpCollectionItems(content),
      simpleLiftUpProps = getContentSimpleLiftUpProps(content),
      tags = getContentTags(content),
      firstCardListProps = this.getFirstCardListProps(),
      secondCardListProps = this.getSecondCardListProps(),
      photoGridData = this.state.photoGrid,
      relatedEntitiesCardListProps = this.getRelatedEntitiesCardListProps(),
      liftUpMyHelsinkiProps = myHelsinkiHelpers.getContentLiftUpProps(content, 'field_simple_liftup_2[0]'),
      seeAllLink = getContentSeeAllLink(content),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div className="subpage subpage--eat-and-drink">
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!!liftUpCollectionItems.length}>
          <Row>
            <Column>
              <LiftUpCollection items={liftUpCollectionItems} />
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

        <DisplayThisSection when={!isEmpty(tags)}>
          <Row>
            <Column>
              <Tags tags={tags} allLink={seeAllLink} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={firstCardListProps && !isEmpty(firstCardListProps.items)}>
          <Row>
            <Column>
              <CardList
                className="first-card-list"
                {...firstCardListProps}
                cardDefaults={cardDefaults}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection
          when={relatedEntitiesCardListProps && !isEmpty(relatedEntitiesCardListProps.items)}
        >
          <Row>
            <Column>
              <CardList
                className="related-entities-card-list"
                cardDefaults={cardDefaults}
                {...relatedEntitiesCardListProps}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={simpleLiftUpProps}>
          <Row>
            <Column>
              <LiftUpSimple colorScheme={{background: Colors.HEL_ENGEL}} {...simpleLiftUpProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={secondCardListProps && !isEmpty(secondCardListProps.items)}>
          <Row>
            <Column>
              <CardList
                className="second-card-list"
                {...secondCardListProps}
                cardDefaults={cardDefaults}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={liftUpMyHelsinkiProps}>
          <Row>
            <Column>
              <LiftUpMyHelsinki {...liftUpMyHelsinkiProps} />
            </Column>
          </Row>
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

export default flowRight(translate(['eatAndDrinkSubpage']))(EatAndDrinkSubpage);
