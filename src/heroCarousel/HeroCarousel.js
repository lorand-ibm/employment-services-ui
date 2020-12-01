import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import forEach from 'lodash/forEach';
import chunk from 'lodash/chunk';

import Carousel from '../carousel/Carousel';
import { getFoundationBreakpointUsingWindowWidth } from '../helpers.js';

import { KoroTypes, HeroCarouselTypes } from '../constants';

import Koro from '../koro/Koro';
import HeroCarouselSlide from './HeroCarouselSlide';
import SpecialHeroCarouselSlide from './SpecialHeroCarouselSlide';
import HeroCarouselSlideRotated from './HeroCarouselSlideRotated';

type Props = {
  className: String,
  slides: Array,
  koroType: String,
  koroColor: String,
  type: String,
  onSelectionChange: Function,
  colorScheme: Object,
};

class HeroCarousel extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    slides: [],
    koroType: KoroTypes.BASIC_WAVE,
    koroColor: '#ffffff',
    type: HeroCarouselTypes.DEFAULT,
    onSelectionChange: () => { },
    colorScheme: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      loaded: false,
    };
  }

  componentDidMount() {
    // Hack to get the video to autoplay when the carousel is loaded on iOS and
    // the first slide contains a video
    setTimeout(
      function () {
        this.setState({ loaded: true });
      }.bind(this),
      0,
    );
  }

  onSelectionChange = selected => {
    if (selected !== this.state.selected) {
      this.setState({ selected });
      this.props.onSelectionChange(selected);
    }
  };

  getSlides = () => {
    const { type, slides, colorScheme } = this.props,
      { selected } = this.state,
      elements = [];

    if (type === HeroCarouselTypes.SPECIAL && getFoundationBreakpointUsingWindowWidth() !== 'small') {
      forEach(chunk(slides, 2), (items, i) => {
        elements.push(
          <SpecialHeroCarouselSlide
            key={`special-slide-${i}`}
            items={items}
            hidden={selected !== i}
            type={type}
          />,
        );
      });
    }

    else if (type === HeroCarouselTypes.ROTATED) {
      forEach(slides, (slide, i) => {
        elements.push(
          <HeroCarouselSlideRotated
            key={`slide-${i}`}
            slide={slide}
            hidden={selected !== i}
            className={this.state.loaded && 'loaded'}
            colorScheme={colorScheme}
          />,
        );
      });
    }

    else {
      forEach(slides, (slide, i) => {
        elements.push(
          <HeroCarouselSlide
            key={`slide-${i}`}
            slide={slide}
            hidden={selected !== i}
            className={this.state.loaded && 'loaded'}
            type={type}
          />,
        );
      });
    }

    return elements;
  };

  render() {
    const { className, koroType, koroColor, type } = this.props,
      slides = this.getSlides();

    return (
      <div
        className={classNames(
          className,
          'myhki-hero-carousel',
          `myhki-hero-carousel--${type}`,
          `myhki-hero-carousel--slides-${slides.length}`,
        )}
      >
        <Carousel
          itemsLength={slides.length}
          showDots={true}
          baseClassName="myhki-hero-carousel"
          onSelectedChange={this.onSelectionChange.bind(this)}
        >
          {slides}
        </Carousel>
        {type !== 'rotated' && (
          <Koro type={koroType} color={koroColor} flip />
        )}
      </div>
    );
  }
}

export default withRouter(HeroCarousel);
