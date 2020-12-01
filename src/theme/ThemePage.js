import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Hero from '../hero/Hero';
import HeroCopyright from '../hero/HeroCopyright';
import Author from '../author/Author';
import ShareLinks from '../shareLinks/ShareLinks';
import Tags from '../tags/Tags';
import Paragraphs from '../paragraphs/Paragraphs';
import CardList from '../cardList/CardList';
import RichBlocks from '../richBlocks/RichBlocks';
import Koro from '../koro/Koro';
import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import LiftUpSimple from '../liftUps/LiftUpSimple';
import LocationCarousel from '../locationCarousel/LocationCarousel';
import {Colors, ImageStyles} from '../constants';

import * as contentHelpers from '../content/helpers';
import {formatArticleDate} from '../content/dateHelpers';

type Props = {
  content: Object,
};

class ThemePage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Theme page: %o', this.props.content);
    }
  }

  getHeaderImage = () => {
    const {content} = this.props,
      heroImageData = contentHelpers.getContentCoverImage(content, ImageStyles.HERO_IMAGE, false);

    return heroImageData ? `url("${heroImageData}")` : null;
  };

  getHeroCopyright = () => {
    const {content} = this.props,
      heroCopyright = contentHelpers.getContentCoverImageCopyright(content);
    return heroCopyright ? heroCopyright : '';
  };

  getShowDate = () => {
    return !!Number(get(this.props.content, 'field_show_created_updated'));
  };

  getCardListProps = () => {
    const {content} = this.props;
    const seeAllLink = contentHelpers.getContentLink(content, 'field_card_list_link[0]');

    return {
      title: get(content, 'field_card_list_title'),
      seeAllLink: seeAllLink,
      seeAllLinkText: get(content, 'field_card_list_link[0].title'),
      items: contentHelpers.getContentCards(content, 'field_card_list'),
    };
  };

  getThemeColor = () => {
    return "#d0e6f7";
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
      tags = contentHelpers.getContentTags(content),
      author = contentHelpers.getContentAuthor(this.props.content),
      themeColor = this.getThemeColor(),
      cardListProps = this.getCardListProps(),
      richBlocks = contentHelpers.getContentRichBlocks(content, 'field_big_card_list'),
      simpleLiftUpProps = contentHelpers.getContentSimpleLiftUpProps(content),
      headerImage = this.getHeaderImage(),
      showAuthor = contentHelpers.isContentAuthorVisible(content),
      locationCarouselItems = contentHelpers.getContentLocationCarouselItems(content),
      locationCarouselContent = this.getLocationCarouselContent();

    let blackTextForBackground = contentHelpers.useBlackTextForHeroBackground(themeColor);
    blackTextForBackground = true;

    return (
      <div
        className={classNames('theme-page', {
          'theme-page--has-header-image': !!headerImage,
          'theme-page--black-text': blackTextForBackground,
        })}
      >
        <div className="theme-page__header" >

              <Hero
                background={themeColor}
                headerImage={headerImage}
                subtitle={<Breadcrumbs items={contentHelpers.getContentBreadcrumbs(content)} />}
                title={contentHelpers.getContentTitle(content)}
                koroColor={themeColor}
                video={contentHelpers.getContentHeroVideo(content)}
                color={themeColor}
              />

        </div>
        <Row>
          <Column>
            <div className="theme-page__date-wrapper">
              {this.getShowDate() && (
                <div className="theme-page__date">{formatArticleDate(content)}</div>
              )}
              <HeroCopyright credits={this.getHeroCopyright()} />
            </div>

            <div className="paragraphs">
              <Paragraphs content={content} />
            </div>
          </Column>
        </Row>

        <DisplayThisSection when={richBlocks && !isEmpty(richBlocks)}>
          <div className="theme-page__rich-blocks">
            <RichBlocks items={richBlocks} background={themeColor} />
            <Koro color={themeColor} />
          </div>
        </DisplayThisSection>

        <Row>
          <Column>
            <div className="theme-page__footer">
              <Row>
                <DisplayThisSection when={showAuthor && !!author}>
                  <Column small={12} large={6}>
                    <Author author={author} />
                  </Column>
                </DisplayThisSection>


              </Row>
            </div>
          </Column>
        </Row>

        <DisplayThisSection when={locationCarouselItems.length}>
          <LocationCarousel items={locationCarouselItems} content={locationCarouselContent} />
        </DisplayThisSection>

        <DisplayThisSection when={!!cardListProps && !isEmpty(cardListProps.items)}>
          <Row>
            <Column>
              <CardList className="related-card-list" {...cardListProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={simpleLiftUpProps}>
          <Row>
            <Column>
              <div className="theme-page__simple-lift-up">
                <LiftUpSimple colorScheme={{background: Colors.HEL_ENGEL}} {...simpleLiftUpProps} flip />
              </div>
            </Column>
          </Row>
        </DisplayThisSection>
      </div>
    );
  }
}

export default ThemePage;
