import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import get from 'lodash/get';

import Carousel from '../carousel/Carousel';
import LiftUpCarouselSlide from './LiftUpCarouselSlide';

type Props = {
  className: String,
  title: String,
  slides: Array,
};

class LiftUpCarousel extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    slides: [],
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  onClickItem = (index, item) => {
    const link = get(item, 'props.slide.link');
    if (link) {
      this.context.router.push(link);
    }
  };

  render() {
    const {className, title, slides} = this.props;

    return (
      <div
        className={classNames(
          'myhki-lift-up-carousel',
          className,
          `myhki-lift-up-carousel--slides-${slides.length}`,
        )}
      >
        <Carousel
          baseClassName="myhki-lift-up-carousel"
          itemsLength={slides.length}
          showDots={true}
          onClickItem={this.onClickItem.bind(this)}
        >
          {slides.map((slide, i) => {
            return <LiftUpCarouselSlide key={i} subtitle={title} slide={slide} />;
          })}
        </Carousel>
      </div>
    );
  }
}

export default withRouter(LiftUpCarousel);
