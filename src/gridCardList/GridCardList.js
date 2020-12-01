import React, {Component} from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import chunk from 'lodash/chunk';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import {getFoundationBreakpoint} from '../helpers.js';
import {CarouselSwipeTolerance} from '../constants';
import get from 'lodash/get';

import CardList from '../cardList/CardList';
import Card from '../cardList/Card';
import Carousel from '../carousel/Carousel';

type Props = {
  className: String,
  showAsGrid: Boolean,
  title: String,
  description: String,
  links: Array,
  items: Array,
  cardDefaults: Object,
  cardOverrides: Object,
  largeCardDefaults: Object,
  largeCardOverrides: Object,
  pageSizeMobile: Number,
  colorScheme: Object,
};

class GridCardList extends Component {
  props: Props;

  static defaultProps = {
    showAsGrid: true,
    links: [],
    items: [],
    largeCardDefaults: {},
    largeCardOverrides: {},
    cardDefaults: {},
    cardOverrides: {},
    colorScheme: {},
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      breakpoint: getFoundationBreakpoint(),
    };
  }

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

  getSlides = divided => {
    const {cardDefaults, cardOverrides, largeCardDefaults, largeCardOverrides} = this.props;

    return divided.map((cards, slideIndex) => {
      const largeCard = cards.splice(0, 1)[0];
      return (
        <div className="myhki-grid-card-list__slide" key={slideIndex}>
          {
            <Card
              {...largeCardDefaults}
              {...largeCard}
              {...largeCardOverrides}
              type={[largeCard.type, 'grid-large']}
              slideIndex={slideIndex}
            />
          }
          <div className="myhki-grid-card-list__slide-wrapper">
            {cards.map((card, cardIndex) => (
              <Card
                key={cardIndex}
                {...cardDefaults}
                {...card}
                {...cardOverrides}
                type={[card.type, 'grid']}
                slideIndex={slideIndex}
              />
            ))}
          </div>
        </div>
      );
    });
  };

  getMobileSlides = divided => {
    const {cardDefaults, cardOverrides} = this.props;

    return divided.map((cards, slideIndex) => (
      <div className="myhki-grid-card-list__slide" key={slideIndex}>
        <div className="myhki-grid-card-list__slide-wrapper">
          {cards.map((card, cardIndex) => (
            <Card
              key={cardIndex}
              {...cardDefaults}
              {...card}
              {...cardOverrides}
              type={[card.type, 'grid']}
              mobile={true}
            />
          ))}
        </div>
      </div>
    ));
  };

  getItems = () => {
    const {
        showAsGrid,
        items,
        cardDefaults,
        largeCardDefaults,
        pageSizeMobile,
        largeCardOverrides,
      } = this.props,
      {breakpoint} = this.state;

    if (!items.length) {
      return null;
    }

    if (!showAsGrid) {
      return (
      <div className="myhki-grid-card-list__items">
        <CardList pageSizeMobile={pageSizeMobile} items={items} cardDefaults={cardDefaults} />
      </div>
      );
    }

    if (breakpoint === 'small') {
      const first = items.slice(0, 1)[0],
        rest = items.slice(1);

      const divided = chunk(rest, 2);

      return (
        <div className="myhki-grid-card-list__items">
          <div className="myhki-grid-card-list-mobile">
            <Card
              className="myhki-grid-card-list__liftup"
              {...largeCardDefaults}
              {...first}
              {...largeCardOverrides}
              type={[first.type, 'grid-large']}
              mobile={true}
            />
            {!!rest.length && (
              <Carousel
                baseClassName="myhki-grid-card-list"
                itemsLength={divided.length}
              >
                {this.getMobileSlides(divided)}
              </Carousel>
            )}
          </div>
        </div>
      );
    } else {
      const divided = chunk(items, 5)
      return (
        <div className="myhki-grid-card-list__items">
          <Carousel
            baseClassName="myhki-grid-card-list"
            itemsLength={divided.length}
          >
            {this.getSlides(divided)}
          </Carousel>
        </div>
      );
    }
  };

  render() {
    const {className, title, description, links, showAsGrid, colorScheme} = this.props;
    const style = {
      background: get(colorScheme, 'background'),
      color: get(colorScheme, 'text'),
    };

    return (
      <div
        className={classNames('myhki-grid-card-list', className, {
          'myhki-grid-card-list--show-as-grid': showAsGrid,
          'myhki-grid-card-list--has-background': get(colorScheme, 'background'),
        })}
        style={style}
      >
        <div className="myhki-grid-card-list__header">
          {!!title && <h2 className="myhki-grid-card-list__title">{title}</h2>}
          {!!description && <p className="myhki-grid-card-list__description">{description}</p>}
          {!!links.length && (
            <div className="myhki-grid-card-list__links">
              {links.map((link, i) => (
                <a href={link.link} key={i} className="myhki-grid-card-list__link">
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </div>
        {this.getItems()}
      </div>
    );
  }
}

export default flowRight(withRouter)(GridCardList);
