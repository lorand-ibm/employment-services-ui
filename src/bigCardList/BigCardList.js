import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import chunk from 'lodash/chunk';
import {Row, Column} from 'react-foundation';

import {Colors} from '../constants';

import Carousel from '../carousel/Carousel';
import BigCard from './BigCard';
import Koro from '../koro/Koro';

import {getFoundationBreakpoint} from '../helpers.js';

type Props = {
  className: String,
  title: String,
  seeAllLink: String,
  items: [],
  pageSize: Number,
  pageSizeMobile: Number,
  cardDefaults: Object,
  koro: String,
  background: String,
  noCarousel: Boolean,
};

class BigCardList extends Component {
  props: Props;

  static defaultProps = {
    items: [],
    pageSize: 3,
    pageSizeMobile: 1,
    cardDefaults: {},
    background: Colors.HEL_FOG,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      breakpoint: getFoundationBreakpoint(),
    };
  }

  onCarouselChange = selected => {
    if (selected !== this.state.selected) {
      this.setState({
        selected: selected,
        breakpoint: getFoundationBreakpoint(),
      });
    }
  };

  updateBreakpoint = () => {
    this.setState({
      breakpoint: getFoundationBreakpoint(),
    });
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      window.addEventListener('resize', this.updateBreakpoint);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      window.removeEventListener('resize', this.updateBreakpoint);
    }
  }

  getSlides = () => {
    const items = this.props.items,
      cardDefaults = this.props.cardDefaults,
      pageSize =
        this.state.breakpoint === 'small' ? this.props.pageSizeMobile : this.props.pageSize, // 640px is foundation breakpoint for medium
      divided = chunk(items, pageSize),
      cardWidth = 100 / pageSize;

    return divided.map((cards, cardsIndex) => (
      <div className="myhki-big-card-list__slide" key={cardsIndex}>
        {cards.map((card, cardIndex) => (
          <BigCard key={cardIndex} {...cardDefaults} {...card} width={`${cardWidth}%`} />
        ))}
      </div>
    ));
  };

  render() {
    const {className, items, koro, background, noCarousel} = this.props;
    const {selected} = this.state;

    const slides = this.getSlides()

    return (
      <div className={classNames('myhki-big-card-list', className, {'no-carousel': noCarousel})}>
        <div className="myhki-big-card-list__wrapper">
          <div className="myhki-big-card-list__background" style={{background: background}} />
          <Row>
            <Column>
              {!!items.length && (
                <div className="myhki-big-card-list__carousel-wrapper">
                  {noCarousel ? (
                    slides
                  ) : (
                    <Carousel
                      baseClassName="myhki-big-card-list"
                      itemsLength={slides.length}
                    >
                      {slides}
                    </Carousel>
                  )}
                </div>
              )}
            </Column>
          </Row>
        </div>
        {!!koro && <Koro type={koro} color={background} />}
      </div>
    );
  }
}

export default withRouter(BigCardList);
