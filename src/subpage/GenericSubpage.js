import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import {
  getColorScheme,
  getContentHeroCarouselSlides,
  getContentBreadcrumbs,
  getContentLiftUpCollectionItems,
  getContentTags,
  getContentSimpleQuote,
  getContentCards,
  getContentLink,
  getContentLinkTitle,
  getVideoCarouselSlides,
  getContentPhotogridData,
  getContentLocationCarouselItems,
  getContentGenericSubPage,
  getGridCardListProps,
} from '../content/helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import HeroCarousel from '../heroCarousel/HeroCarousel';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LiftUpCollection from '../liftUps/LiftUpCollection';
import Tags from '../tags/Tags';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import CardList from '../cardList/CardList';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import BigCardList from '../bigCardList/BigCardList';
import LocationCarousel from '../locationCarousel/LocationCarousel';
import PhotoGrid from '../photoGrid/PhotoGrid';
import GridCardList from '../gridCardList/GridCardList';
import LeadText from '../leadText/LeadText';
import LiftUpSimple from '../liftUps/LiftUpSimple';
import LiftUpSquareImageList from '../liftUps/LiftUpSquareImageList';
import Banner from '../banner/Banner';
import TextParagraph from '../paragraphs/paragraph/Text';
import DirectionsBlockParagraph from '../paragraphs/paragraph/DirectionsBlock';
import Portrait from '../portrait/Portrait';
import ContentSlideshowParagraph from '../paragraphs/paragraph/ContentSlideshow';
import ListingParagraph from '../paragraphs/paragraph/Listing';

import {
  Colors,
  ParagraphTypes,
  HeroCarouselTypes,
  ImageStyles,
  KoroTypes,
} from '../constants';
import Questionnaire from '../questionnaire/Questionnaire';

type Props = {
  content: Object,
  t: Function,
};

type State = {
  photoGrid: Object,
};

class GenericSubpage extends Component<Props, State> {
  props: Props;
  state: State = {
    photoGrid: {},
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Generic subpage: %o', this.props.content);

      getContentPhotogridData(this.props.content)
      .then((photoGrid) => {
        this.setState({ photoGrid });
      });
    }
  }

  getCardListProps = (
    path: string = 'field_card_list',
    titlePath: string = 'field_card_list_title',
    linkPath: string = 'field_card_list_link[0]',
  ) => {
    const {content} = this.props,
      items = getContentCards(content, path);

    if (!items.length) {
      return null;
    }
    return {
      title: get(content, titlePath),
      items: items,
      seeAllLink: getContentLink(content, linkPath),
      seeAllLinkText: getContentLinkTitle(content, linkPath),
    };
  };

  getBigCardListProps = () => {
    const {content} = this.props;
    const imageStyle = ImageStyles.SQUARE_375;

    return {
      items: getContentCards(content, 'field_big_card_list', imageStyle),
    };
  };

  getLocationCarouselContent = (
    titlePath: string = 'field_location_carousel.field_title',
    linkPath: string = 'field_location_carousel.field_link[0]',
  ) => {
    const {content} = this.props;

    return {
      title: get(content, titlePath),
      seeAllLink: getContentLink(content, linkPath),
      seeAllLinkText: getContentLinkTitle(content, linkPath),
    };
  };

  getElement = (field, i) => {
    const fieldProps = field;

    switch (field.type) {
      case ParagraphTypes.GRID_CARD_LIST:
        return (
          <div key={i} className="grid-card-list">
            <Row>
              <Column>
                <GridCardList {...fieldProps} />
              </Column>
            </Row>
          </div>
        );
      case ParagraphTypes.CARD_LIST:
        return (
          <Row key={i}>
            <Column>
              <CardList {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.BIG_CARD_LIST:
        return (
          <BigCardList
            key={i}
            {...fieldProps}
            pageSize="3"
            koro={KoroTypes.MEDIUM_WAVE}
            background={Colors.LIGHT_BLUE}
          />
        );
      case ParagraphTypes.LOCATION_CAROUSEL:
        return <LocationCarousel key={i} {...fieldProps} />;
      case ParagraphTypes.LIFTUP_COLLECTION:
        return (
          <Row key={i}>
            <Column>
              <LiftUpCollection key={i} {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.VIDEO_CAROUSEL:
        return <VideoCarousel key={i} {...fieldProps} />;
      case ParagraphTypes.QUOTE:
        const simpleQuote = fieldProps.quote;
        return (
          <Row key={i}>
            <Column large={6} offsetOnLarge={3}>
              <SimpleQuote {...simpleQuote}>
                <div dangerouslySetInnerHTML={{__html: simpleQuote && simpleQuote.body}} />
              </SimpleQuote>
            </Column>
          </Row>
        );
      case ParagraphTypes.VIDEO:
        return <VideoCarousel key={i} {...fieldProps} />;
      case ParagraphTypes.TAGS_CONTAINER:
        return (
          <Row key={i}>
            <Column>
              <Tags {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.LEAD_TEXT:
        return (
          <Row key={i}>
            <Column>
              <LeadText {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.SIMPLE_LIFTUP:
        return (
          <Row key={i}>
            <Column>
              <LiftUpSimple {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.SQUARE_IMAGE_LIFTUP:
        return (
          <Row key={i}>
            <Column>
              <LiftUpSquareImageList {...fieldProps.content} />
            </Column>
          </Row>
        );
      case ParagraphTypes.BANNER:
        return (
          <Row key={i}>
            <Column small={12}>
              <Banner {...fieldProps.content} />
            </Column>
          </Row>
        );
      case ParagraphTypes.TEXT:
        return (
          <Row key={i}>
            <Column small={12}>
              <TextParagraph {...fieldProps.content} />
            </Column>
          </Row>
        );
      case ParagraphTypes.HSL_WIDGET:
        return (
          <Row key={i}>
            <Column small={12}>
              <DirectionsBlockParagraph />
            </Column>
          </Row>
        );
      case ParagraphTypes.PORTRAIT:
        return (
          <Row key={i}>
            <Column small={12}>
              <Portrait {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.QUESTIONNAIRE:
        return (
          <Row key={i}>
            <Column small={12}>
              <Questionnaire {...fieldProps} />
            </Column>
          </Row>
        );
      case ParagraphTypes.CONTENT_SLIDESHOW:
        return (
          <ContentSlideshowParagraph {...fieldProps} key={i} />
        );
      case ParagraphTypes.LISTING:
        return(
          <ListingParagraph {...fieldProps} key={i} />
        )
      default:
        console.error(`getElement: unknown element type: ${field.type}`);
    }
  };

  getDynamicElements = () => {
    const { content } = this.props,
      fields = getContentGenericSubPage(content);

    return fields.map((field, i) => this.getElement(field, i));
  };

  /**
   * Checks if tags element is in its default position.
   *
   * Tags element has a default position in the markup, but sometimes we don't
   * want to show it in that position. If there is a 'tags_container' dynamic
   * element (aka paragraph), we want to show the tags element inside that
   * element.
   *
   * @return {Boolean}
   */
  isTagsElementDynamicallyPositioned = () => {
    const {content} = this.props;
    let fieldData = get(content, 'field_content', []);

    // The format of fieldData varies. Normally fieldData is an array. But if we're on a translated
    // page and some of the items in fieldData aren't translated, fieldData will be an object.
    if (typeof fieldData === 'object') {
      const fieldDataArray = Object.keys(fieldData).map(key => fieldData[key]);
      fieldData = fieldDataArray;
    }

    return fieldData.some(field => Number(get(field, 'field_tags_container')));
  };

  render() {
    const {content} = this.props,
      {isTagsElementDynamicallyPositioned} = this,
      heroCarouselSlides = getContentHeroCarouselSlides(content),
      liftUpCollectionItems = getContentLiftUpCollectionItems(content),
      tags = getContentTags(content),
      simpleQuote = getContentSimpleQuote(content),
      cardListProps = this.getCardListProps(),
      videoCarouselSlides = getVideoCarouselSlides(content),
      dimmedCardListProps = this.getCardListProps(
        'field_card_list_dimmed',
        'field_card_list_dimmed_title',
        'field_card_list_dimmed_link[0]',
      ),
      framedCardListProps = this.getCardListProps(
        'field_framed_card_list',
        'field_framed_card_list_title',
        'field_framed_card_list_link[0]',
      ),
      bigCardListProps = this.getBigCardListProps(),
      photoGridData = this.state.photoGrid,
      locationCarouselItems = getContentLocationCarouselItems(content),
      locationCarouselContent = this.getLocationCarouselContent(
        'field_location_carousel_title',
        'field_location_carousel_link[0]',
      ),
      gridCardListProps = getGridCardListProps(content);

    const heroCarouselType = get(content, 'field_hero_carousel_type') || HeroCarouselTypes.DEFAULT;
    const colorScheme = getColorScheme(content);

    return (
      <div className="subpage subpage--generic">
        <DisplayThisSection when={!!heroCarouselSlides.length}>
          <HeroCarousel slides={heroCarouselSlides} type={heroCarouselType} colorScheme={colorScheme} />
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

        <DisplayThisSection when={!isEmpty(tags) && !isTagsElementDynamicallyPositioned()}>
          <Row>
            <Column>
              <Tags tags={tags} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={simpleQuote && simpleQuote.body}>
          <Row>
            <Column large={6} offsetOnLarge={3}>
              <SimpleQuote {...simpleQuote}>
                <div dangerouslySetInnerHTML={{__html: simpleQuote && simpleQuote.body}} />
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

        <DisplayThisSection when={!!cardListProps && !isEmpty(cardListProps.items)}>
          <Row>
            <Column>
              <CardList {...cardListProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={videoCarouselSlides.length}>
          <VideoCarousel slides={videoCarouselSlides} colorScheme={{background: Colors.HEL_ENGEL}} />
        </DisplayThisSection>

        <DisplayThisSection when={locationCarouselItems.length}>
          <LocationCarousel items={locationCarouselItems} content={locationCarouselContent} />
        </DisplayThisSection>

        <DisplayThisSection when={!!dimmedCardListProps && !isEmpty(dimmedCardListProps.items)}>
          <Row>
            <Column>
              <CardList {...dimmedCardListProps} cardOverrides={{isDimmed: true}} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!framedCardListProps && !isEmpty(framedCardListProps.items)}>
          <Row>
            <Column>
              <CardList {...framedCardListProps} cardOverrides={{isFramed: true}} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!bigCardListProps && !isEmpty(bigCardListProps.items)}>
          <BigCardList
            {...bigCardListProps}
            pageSize="3"
            koro={KoroTypes.MEDIUM_WAVE}
            background={Colors.LIGHT_BLUE}
          />
        </DisplayThisSection>

        {this.getDynamicElements()}

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

export default GenericSubpage;
