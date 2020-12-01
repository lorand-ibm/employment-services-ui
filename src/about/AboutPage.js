import React, {Component} from 'react';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import {Colors} from '../constants';

import {
  getContentTitle,
  getContentCoverImage,
  getContentBody,
  getVideoCarouselSlides,
  getContentLinkListItems,
  getContentLiftUpCarouselTitle,
  getContentLiftUpCarouselSlides,
  getContentBreadcrumbs,
} from '../content/helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import Hero from '../hero/Hero';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import ReadMore from '../readMore/ReadMore';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import LinkList from '../linkList/LinkList';
import LiftUpCarousel from '../liftUps/LiftUpCarousel';

type Props = {
  content: Object,
  t: Function,
};

class AboutPage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('About page: %o', this.props.content);
    }
  }

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageData = getContentCoverImage(content);

    return heroImageData ? `url("${heroImageData}")` : null;
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

  render() {
    const {content} = this.props,
      heroBackground = this.getHeroBackground(),
      summary = getContentBody(content, true),
      body = getContentBody(content, false),
      videoCarouselSlides = getVideoCarouselSlides(content),
      linkListProps = this.getLinkListProps(),
      liftUpCarouselSlides = getContentLiftUpCarouselSlides(content);

    return (
      <div className={classNames('about-page')}>
        <DisplayThisSection when={heroBackground}>
          <Hero background={heroBackground} koroColor="#ffffff" title={getContentTitle(content)} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
            <ReadMore className="about-page__body" summary={summary}>
              <div dangerouslySetInnerHTML={{__html: body}} />
            </ReadMore>
          </Column>
        </Row>

        <DisplayThisSection when={videoCarouselSlides.length}>
          <VideoCarousel slides={videoCarouselSlides} colorScheme={{background: Colors.HEL_ENGEL}} />
        </DisplayThisSection>

        <DisplayThisSection when={liftUpCarouselSlides.length || linkListProps}>
          <Row>
            <Column>
              <LiftUpCarousel
                title={getContentLiftUpCarouselTitle(content, 'field_carousel_title')}
                slides={liftUpCarouselSlides}
              />
              <LinkList {...linkListProps} />
            </Column>
          </Row>
        </DisplayThisSection>
      </div>
    );
  }
}

export default flowRight(translate(['about']))(AboutPage);
