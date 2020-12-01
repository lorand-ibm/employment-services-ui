import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import chunk from 'lodash/chunk';

import Carousel from '../carousel/Carousel';
import SimpleQuote from '../simpleQuote/SimpleQuote';
import {getFoundationBreakpoint} from '../helpers.js';

type Props = {
  className: String,
  pageSize: Number,
  pageSizeMobile: Number,
  items: Array,
  title: String,
  type: String,
};

class QuoteCarousel extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    items: [],
    pageSize: 2,
    pageSizeMobile: 1,
    type: 'basic',
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
    const {type} = this.props;
    const divided = this.getDividedItems();

    return divided.map((quotes, slideIndex) => (
      <div className="myhki-quote-carousel__slide" key={slideIndex}>
        {quotes.map((quote, quoteIndex) => (
          <SimpleQuote
            sourceTitle={quote.title}
            sourceText={quote.source}
            type={type}
            key={quoteIndex}
            {...quote}
          >
            <div dangerouslySetInnerHTML={{__html: quote.body}} />
          </SimpleQuote>
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
          'myhki-quote-carousel',
          className,
          `myhki-quote-carousel--slides-${divided.length}`,
        )}
      >
        {!!title && <h3 className="myhki-quote-carousel__title">{title}</h3>}
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

export default withRouter(QuoteCarousel);
