import React, {Component} from 'react';
import classNames from 'classnames';

import Accordion from "../accordion/Accordion";
import TextParagraph from './paragraph/Text';
import MediaParagraph from './paragraph/Media';
import QuoteParagraph from './paragraph/Quote';
import TwitterParagraph from './paragraph/Twitter';
import InstagramParagraph from './paragraph/Instagram';
import RichBlocksParagraph from './paragraph/RichBlocks';
import CardListParagraph from './paragraph/CardList';
import LocationCarouselParagraph from './paragraph/LocationCarousel';
import LiftUpSquareImageList from '../liftUps/LiftUpSquareImageList';
import Banner from '../banner/Banner';
import Portrait from '../portrait/Portrait';
import VideoCarousel from '../videoCarousel/VideoCarousel';
import SmallCard from './paragraph/SmallCard';
import LeadTextParagraph from './paragraph/LeadText';
import LiftUpSimpleParagraph from './paragraph/LiftUpSimple';
import VideoCarouselParagraph from './paragraph/VideoCarousel';
import SustainabilityServiceLiftupParagraph from './paragraph/SustainabilityServiceLiftup';
import DirectionsBlockParagraph from './paragraph/DirectionsBlock';
import EmbeddedVideo from './paragraph/EmbeddedVideo';
import ContentSlideshowParagraph from './paragraph/ContentSlideshow';

import {getContentParagraphs} from '../content/helpers';
import Questionnaire from '../questionnaire/Questionnaire';
import InfoNotification from '../infoNotification/InfoNotification';

type Props = {
  className?: String,
  content: Object,
  themeColor?: String,
};

class Paragraphs extends Component {
  props: Props;

  /**
   *
   * @param paragraph
   * @param i
   * @returns {XML}
   */
  getParagraph = (paragraph, i) => {
    const paragraphProps = {
      paragraph,
      key: i,
    };
    console.log('paragraph:' + paragraph.type);
    switch (paragraph.type) {
      case 'accordion':
        //console.log('Accordion!'+paragraphProps.paragraph + ' ' + paragraphProps.i);
        return <Accordion {...paragraphProps} key={i}/>;
      case 'accordion_group':
        return <Accordion  {...paragraphProps} />;
      case 'text':
        return <TextParagraph {...paragraphProps} />;
      case 'notification':
        console.log(paragraphProps);
        return <InfoNotification {...paragraphProps.paragraph} key={paragraphProps.key}
        className='myhki-paragraph myhki-paragraph--notification'>
        </InfoNotification>;
      case 'media':
        return <MediaParagraph {...paragraphProps} />;
      case 'video':
        return <VideoCarousel key={i} slides={paragraph.content} />;
      case 'video_carousel':
        return <VideoCarouselParagraph {...paragraphProps} />;
      case 'quote':
        return <QuoteParagraph {...paragraphProps} />;
      case 'small_card':
        return <SmallCard {...paragraphProps} />;
      case 'instagram':
        return <InstagramParagraph {...paragraphProps} />;
      case 'twitter':
        return <TwitterParagraph {...paragraphProps} />;
      case 'card_list':
        return <CardListParagraph {...paragraphProps} />;
      case 'rich_card_list':
        return <RichBlocksParagraph {...paragraphProps} />;
      case 'location_carousel':
        return <LocationCarouselParagraph {...paragraphProps} />;
      case 'lead_text':
        return <LeadTextParagraph {...paragraphProps} key={paragraphProps.key} />;
      case 'simple_liftup':
        return <LiftUpSimpleParagraph {...paragraphProps} />;
      case 'sustainability_service_liftup':
        return <SustainabilityServiceLiftupParagraph {...paragraphProps} />;
      case 'square_image_liftup':
        return <LiftUpSquareImageList {...paragraphProps.paragraph.content} key={paragraphProps.key} />;
      case 'banner':
        return <Banner {...paragraphProps.paragraph.content} key={paragraphProps.key}/>;
      case 'hsl_widget':
        return <DirectionsBlockParagraph key={paragraphProps.key}/>
      case 'portrait':
        return <Portrait {...paragraphProps.paragraph} key={paragraphProps.key}/>;
      case 'questionnaire':
        return <Questionnaire {...paragraphProps.paragraph} key={paragraphProps.key}/>;
      case 'embedded_video':
        return <EmbeddedVideo {...paragraphProps.paragraph} key={paragraphProps.key} x={i} />
      case 'content_slideshow':
        return <ContentSlideshowParagraph {...paragraphProps.paragraph} key={paragraphProps.key}/>;
      default:
        console.error(`getParagraph: unknown paragraph type: ${paragraph.type}`);
    }
    console.log('not defined paragraph');
  };

  getParagraphs = () => {
    const {content} = this.props,
      paragraphs = getContentParagraphs(content);

    return paragraphs.map((paragraph, i) => this.getParagraph(paragraph, i));
  };

  render() {
    const {className} = this.props;

    return <div className={classNames('myhki-paragraphs', className)}>{this.getParagraphs()}</div>;
  }
}

export default Paragraphs;
