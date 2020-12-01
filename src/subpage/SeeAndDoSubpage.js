import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import CardList from '../cardList/CardList';
import BigCardList from '../bigCardList/BigCardList';
import LiftUpCollection from '../liftUps/LiftUpCollection';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import PhotoGrid from '../photoGrid/PhotoGrid';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import Tags from '../tags/Tags';
import GridCardList from '../gridCardList/GridCardList';

import {KoroTypes, Colors, ImageStyles} from '../constants';

import {
  getContentHeroCarouselSlides,
  getContentLiftUpCollectionItems,
  getContentTags,
  getContentLiftUpCarouselTitle,
  getContentLiftUpCarouselSlides,
  getContentCards,
  getVideoCarouselSlides,
  getContentLink,
  getContentBreadcrumbs,
  getContentPhotogridData,
  getContentLinkTitle,
  getContentSeeAllLink,
  getGridCardListProps,
} from '../content/helpers';

type Props = {
  content: Object,
};

type State = {
  photoGrid: Object,
};

class SeeAndDoSubpage extends Component<Props, State> {
  props: Props;
  state: State = {
    photoGrid: {},
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('See & Do subpage: %o', this.props.content);

      getContentPhotogridData(this.props.content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      });
    }
  }

  getFirstCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'field_card_list');

    return {
      title: get(content, 'field_card_list_title'),
      items: items,
      seeAllLink: getContentLink(content, 'field_card_list_link[0]'),
      seeAllLinkText: getContentLinkTitle(content, 'field_card_list_link[0]'),
    };
  };

  getSecondCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'field_card_list_2');

    return {
      title: get(content, 'field_card_list_title_2'),
      items: items,
      seeAllLink: getContentLink(content, 'field_card_list_link_2[0]'),
      seeAllLinkText: getContentLinkTitle(content, 'field_card_list_link_2[0]'),
    };
  };

  getThirdCardListProps = () => {
    const {content} = this.props;
    return {
      title: get(content, 'field_card_list_title_3'),
      items: getContentCards(content, 'field_card_list_3', ImageStyles.CARD_375),
      seeAllLink: getContentLink(content, 'field_card_list_link_3[0]'),
      seeAllLinkText: getContentLinkTitle(content, 'field_card_list_link_3[0]'),
    };
  };

  getBigCardListProps = () => {
    const {content} = this.props;
    const imageStyle = ImageStyles.SQUARE_375;

    return {
      items: getContentCards(content, 'field_big_card_list', imageStyle),
    };
  };

  render() {
    const {content} = this.props,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      liftUpCollectionItems = getContentLiftUpCollectionItems(content),
      tags = getContentTags(content),
      liftUpCarouselSlides = getContentLiftUpCarouselSlides(content),
      firstCardListProps = this.getFirstCardListProps(),
      secondCardListProps = this.getSecondCardListProps(),
      thirdCardListProps = this.getThirdCardListProps(),
      bigCardListProps = this.getBigCardListProps(),
      videoCarouselSlides = getVideoCarouselSlides(content),
      photoGridData = this.state.photoGrid,
      seeAllLink = getContentSeeAllLink(content),
      gridCardListProps = getGridCardListProps(content);

    return (
      <div className="subpage subpage--see-and-do">
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

        <DisplayThisSection when={!!firstCardListProps && !isEmpty(firstCardListProps.items)}>
          <Row>
            <Column>
              <CardList className="first-card-list" {...firstCardListProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!secondCardListProps && !isEmpty(secondCardListProps.items)}>
          <Row>
            <Column>
              <CardList className="second-card-list" {...secondCardListProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!videoCarouselSlides.length}>
          <VideoCarousel slides={videoCarouselSlides} colorScheme={{background: Colors.HEL_ENGEL}} />
        </DisplayThisSection>

        <DisplayThisSection when={thirdCardListProps && !isEmpty(thirdCardListProps.items)}>
          <Row>
            <Column>
              <CardList
                className="third-card-list"
                {...thirdCardListProps}
                pageSize="3"
                pageSizeMobile="1"
                cardDefaults={{isFramed: true}}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={bigCardListProps && !isEmpty(bigCardListProps.items)}>
          <BigCardList
            {...bigCardListProps}
            pageSize="3"
            koro={KoroTypes.MEDIUM_WAVE}
            background={Colors.LIGHT_BLUE}
          />
        </DisplayThisSection>

        <DisplayThisSection when={!!liftUpCarouselSlides.length}>
          <Row>
            <Column>
              <LiftUpCarousel
                title={getContentLiftUpCarouselTitle(content)}
                slides={liftUpCarouselSlides}
              />
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

export default SeeAndDoSubpage;
