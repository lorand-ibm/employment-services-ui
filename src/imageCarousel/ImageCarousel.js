import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import chunk from 'lodash/chunk';

import {Carousel} from 'react-responsive-carousel';
import ImageCarouselSlide from './ImageCarouselSlide';
import {getFoundationBreakpoint} from '../helpers.js';
import {CarouselSwipeTolerance} from '../constants';

type Props = {
  className: String,
  items: Array,
  itemsToDisplay: Number,
  itemsToDisplayMobile: Number,
  title: String,
  type: String,
};

class ImageCarousel extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    items: [],
    itemsToDisplay: 2,
    itemsToDisplayMobile: 1,
    type: 'basic',
  };

  static contextTypes = {
    router: PropTypes.object,
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

  getDividedItems = () => {
    const {items, itemsToDisplay, itemsToDisplayMobile} = this.props;
    const itemsSize = getFoundationBreakpoint() === 'small' ? itemsToDisplayMobile : itemsToDisplay; // 640px is foundation breakpoint for medium
    return chunk(items, itemsSize);
  };

  getSlides = () => {
    const divided = this.getDividedItems();
    return divided.map((slides, slideIndex) => (
      <div className="myhki-image-carousel__slide" key={slideIndex}>
        {slides.map((dividedSlide, quoteIndex) => (
          <ImageCarouselSlide
            title={dividedSlide.title}
            image={dividedSlide.image}
            key={quoteIndex}
          />
        ))}
      </div>
    ));
  };

  render() {
    const {className, title} = this.props,
      {selected} = this.state,
      divided = this.getDividedItems();

    return (
      <div
        className={classNames(
          'myhki-image-carousel',
          className,
          `myhki-image-carousel--slides-${divided.length}`,
        )}
      >
        {!!title && <h3 className="myhki-image-carousel__title">{title}</h3>}
        <div className="myhki-image-carousel__carousel">
          <Carousel
            selectedItem={selected}
            showThumbs={false}
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            onChange={this.onCarouselChange}
            infiniteLoop
            axis="horizontal"
            swipeScrollTolerance={CarouselSwipeTolerance}
          >
            {this.getSlides()}
          </Carousel>
        </div>
        <div className="myhki-image-carousel__controls">
          {divided.map((item, i) => {
            return (
              <a
                key={i}
                onClick={() => {
                  this.onControlClick(i);
                }}
                className={classNames('myhki-image-carousel__control', {
                  'myhki-image-carousel__control--active': selected === i,
                })}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(ImageCarousel);
