import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import chunk from 'lodash/chunk';

import Carousel from '../carousel/Carousel';
import TextCarouseItem from './TextCarouseItem';
import {getFoundationBreakpoint} from '../helpers.js';

type Props = {
  className: String,
  pageSize: Number,
  pageSizeMobile: Number,
  title: String,
  items: Array,
};

class TextCarousel extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    pageSize: 2,
    pageSizeMobile: 1,
    items: [],
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  getDividedItems = () => {
    const pageSize =
      getFoundationBreakpoint() === 'small' ? this.props.pageSizeMobile : this.props.pageSize; // 640px is foundation breakpoint for medium
    return chunk(this.props.items, pageSize);
  };

  getSlides = () => {
    const divided = this.getDividedItems();

    return divided.map((items, slideIndex) => (
      <div className="myhki-text-carousel__slide" key={slideIndex}>
        {items.map((item, itemIndex) => (
          <TextCarouseItem key={itemIndex} {...item} />
        ))}
      </div>
    ));
  };

  render() {
    const {className, title} = this.props,
      divided = this.getDividedItems();

    return (
      <div
        className={classNames(
          'myhki-text-carousel',
          className,
          `myhki-text-carousel--slides-${divided.length}`,
        )}
      >
        {!!title && <h3 className="myhki-text-carousel__title">{title}</h3>}
        <Carousel
          baseClassName="myhki-text-carousel"
          showDots={true}
          itemsLength={divided.length}
        >
          {this.getSlides()}
        </Carousel>
      </div>
    );
  }
}

export default withRouter(TextCarousel);
