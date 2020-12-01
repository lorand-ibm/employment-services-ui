import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import i18n from '../root/i18n';

import classNames from 'classnames';
import chunk from 'lodash/chunk';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

import LinkDuo from '../linkduo/LinkDuo';
import {getFoundationBreakpoint} from '../helpers.js';
import {CarouselSwipeTolerance} from '../constants';

import Carousel from '../carousel/Carousel';
import Card from './Card';
import CTACard from '../ctaCard/CTACard';
import get from 'lodash/get';

type Props = {
  className: String,
  title: String,
  seeAllLink: String,
  seeAllLinkText: String,
  items: [],
  pageSize: Number,
  pageSizeMobile: Number,
  cardDefaults: Object,
  cardOverrides: Object,
  description: String,
  collapseMargins: Boolean,
  colorScheme: Object,
  t: Function,
};

class CardList extends Component {
  props: Props;

  static defaultProps = {
    items: [],
    pageSize: 4,
    pageSizeMobile: 2,
    cardDefaults: {},
    cardOverrides: {},
    collapseMargins: false,
    colorScheme: {},
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

  getSlides = (divided) => {
    const cardDefaults = this.props.cardDefaults,
      cardOverrides = this.props.cardOverrides,
      itemSize =
        this.state.breakpoint === 'small' ? this.props.pageSizeMobile : this.props.pageSize, // 640px is foundation breakpoint for medium
      cardWidth = 100 / itemSize;

    return divided.map((cards, slideIndex) => (
      <div className="myhki-card-list__slide" key={slideIndex}>
        {cards.map((card, cardIndex) => {
          switch (card.cardType) {
            case 'cta':
              return <CTACard key={cardIndex} {...card} width={`${cardWidth}%`} />;
            case 'card':
            default:
              return (
                <Card
                  key={cardIndex}
                  {...cardDefaults}
                  {...card}
                  {...cardOverrides}
                  width={`${cardWidth}%`}
                  slideIndex={slideIndex}
                />
              );
          }
        })}
      </div>
    ));
  };

  render() {
    const {
      t,
      className,
      title,
      description,
      seeAllLink,
      seeAllLinkText,
      items,
      pageSizeMobile,
      pageSize,
      collapseMargins,
      colorScheme,
    } = this.props;
    const itemsSize = this.state.breakpoint === 'small' ? pageSizeMobile : pageSize, // 640px is foundation breakpoint for medium
      divided = chunk(items, itemsSize);
    const style = {
      background: get(colorScheme, 'background'),
      color: get(colorScheme, 'text'),
    };

    return (
      <div
        className={classNames(
          className,
          'myhki-card-list',
          `myhki-card-list--slides-${divided.length}`, {
            'myhki-card-list--collapse-margins': collapseMargins,
            'myhki-card-list--has-background': get(colorScheme, 'background'),
            'myhki-card-list--has-text-color': get(colorScheme, 'text'),
          }
        )}
        style={style}
      >
        {!!title && <h2 className="myhki-card-list__title">{title}</h2>}
        {!!description && <p className="myhki-card-list__description">{description}</p>}
        {!!seeAllLink && (
          <div className="myhki-card-list__see-all-container">
            <LinkDuo className="myhki-card-list__see-all-link" to={seeAllLink}>
              {seeAllLinkText || t('seeAllLabel')}
            </LinkDuo>
          </div>
        )}
        {!!items.length && (
          <Carousel
            baseClassName="myhki-card-list"
            itemsLength={divided.length}
          >
            {this.getSlides(divided)}
          </Carousel>
        )}
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['common']),
)(CardList);
