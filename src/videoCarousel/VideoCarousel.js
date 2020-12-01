import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import get from 'lodash/get';

import Carousel from '../carousel/Carousel';
import VideoCarouselSlide from './VideoCarouselSlide';

type Props = {
  className: String,
  slides: Array,
  colorScheme: Object,
};

class VideoCarousel extends Component {
  props: Props;

  static defaultProps = {
    slides: [],
    colorScheme: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
    };
  }

  onCarouselChange = selected => {
    if (selected !== this.state.selected) {
      this.setState({
        selected: selected,
      });
    }
  };

  onControlClick = index => {
    this.setState({
      selected: index,
    });
  };

  render() {
    const {className, slides, colorScheme} = this.props;
    const {selected} = this.state;
    const style = {
      background: get(colorScheme, 'background'),
      color: get(colorScheme, 'text'),
    };

    return (
      <div
        className={classNames(
          'myhki-video-carousel',
          `myhki-video-carousel--slides-${slides.length}`,
          className, {
          'myhki-video-carousel--has-background': get(colorScheme, 'background'),
        }
        )}
        style={style}
      >
        <Carousel
          baseClassName="myhki-video-carousel"
          itemsLength={slides.length}
          showDots={true}
        >
          {slides.map((slide, i) => {
            return <VideoCarouselSlide key={i} slide={slide} hidden={selected !== i} />;
          })}
        </Carousel>
      </div>
    );
  }
}

export default withRouter(VideoCarousel);
