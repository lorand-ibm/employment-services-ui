import 'wicg-inert/dist/inert';
import React from 'react';
import classNames from 'classnames';
import {CarouselSwipeTolerance} from '../constants';
import i18n from '../root/i18n';
import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import {chunk} from 'lodash';

import {getFoundationBreakpoint} from '../helpers.js';

interface CarouselProps {
  children: any;
  showDots?: boolean;
  itemsLength: number;
  baseClassName: string;
  onClickItem?: (index: number, item: any) => void;
  onCarouselChange?: (index: number) => void;
}

interface CarouselState {
  selectedItemIndex: number;
  breakpoint: string;
}

const CarouselArrow = ({className, onClick, ariaLabel}) => (
  <button onClick={onClick} className={className} aria-label={ariaLabel} />
);

const CarouselControlDots = ({
  itemsLength,
  selectedItemIndex,
  setSelectedItemIndex,
  baseClassName,
}) => {
  const activeClassName = `myhki-carousel__control--active ${baseClassName}__control--active`;

  const dotButtons = new Array(itemsLength).fill(0).map((_, i) => {
    return (
      <button
        key={i}
        onClick={() => {
          setSelectedItemIndex(i);
        }}
        className={classNames(`myhki-carousel__control ${baseClassName}__control`, {
          [activeClassName]: selectedItemIndex === i,
        })}
        aria-label={i18n.t('carousel:goTo') + (i + 1)}
        tabIndex={-1}
      />
    );
  })

  const chunkedButtons = chunk(dotButtons, Math.ceil(itemsLength/2))

  return (
    <div className={`${baseClassName}__controls-dots myhki-carousel__controls-dots`}>
      {chunkedButtons.map((buttonList) => {
        return(
        <div className="myhki-carousel__controls-dots-row-wrapper">
          {buttonList}
        </div>
        )
      })}
    </div>
  );
};

class Carousel extends React.PureComponent<CarouselProps, CarouselState> {
  carouselRef: any;

  constructor(props) {
    super(props);

    this.state = {
      selectedItemIndex: 0,
      breakpoint: getFoundationBreakpoint(),
    };

    this.carouselRef = React.createRef();
  }

  componentDidMount() {
    const slides = this.carouselRef.current.querySelectorAll('.slide');
    const root = this.carouselRef.current.querySelector('.carousel.carousel-slider');

    const options = {
      threshold: 0.9,
      rootMargin: '0px 0px 0px 0px',
      root,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.isIntersecting
          ? entry.target.removeAttribute('inert')
          : entry.target.setAttribute('inert', 'true');
      });
    }, options);

    slides.forEach(slide => {
      observer.observe(slide);
    });

    if (global.IS_CLIENT) {
      window.addEventListener('resize', this.updateBreakpoint);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      window.removeEventListener('resize', this.updateBreakpoint);
    }
  }

  componentDidUpdate(_, prevState: CarouselState) {
    const prevBreakpoint = prevState.breakpoint;
    const breakpoint = this.state.breakpoint;
    if (prevBreakpoint !== breakpoint && (prevBreakpoint === 'small' || breakpoint === 'small')) {
      this.setState({selectedItemIndex: 0});
    }
  }

  updateBreakpoint = () => {
    const breakpoint = getFoundationBreakpoint();
    if (this.state.breakpoint !== breakpoint) {
      this.setState({breakpoint: breakpoint});
    }
  };

  setSelectedItemIndex = (index: number) => {
    const { onCarouselChange } = this.props;
    this.setState({selectedItemIndex: index});
    if (onCarouselChange) {
      onCarouselChange(index)
    }
  };

  next = () => {
    const {itemsLength} = this.props;
    if (this.state.selectedItemIndex >= itemsLength - 1) {
      this.setState({
        selectedItemIndex: 0,
      });
    } else {
      this.setState({
        selectedItemIndex: this.state.selectedItemIndex + 1,
      });
    }
  };

  prev = () => {
    const {itemsLength} = this.props;
    if (this.state.selectedItemIndex <= 0) {
      this.setState({
        selectedItemIndex: itemsLength - 1,
      });
    } else {
      this.setState({
        selectedItemIndex: this.state.selectedItemIndex - 1,
      });
    }
  };

  render() {
    const {selectedItemIndex, breakpoint} = this.state;
    const {itemsLength, baseClassName, showDots} = this.props;

    const multipleItems = itemsLength > 1;

    return (
      <>
        {showDots && multipleItems && (
          <div className={`myhki-carousel__controls ${baseClassName}__controls`}>
            {breakpoint === 'small' && (
              <CarouselArrow
                className={`${baseClassName}__controls-arrow ${baseClassName}__controls-arrow--prev myhki-carousel__controls-arrow myhki-carousel__controls-arrow--prev`}
                onClick={this.prev}
                ariaLabel={i18n.t('carousel:previous')}
              />
            )}
            <CarouselControlDots
              itemsLength={itemsLength}
              selectedItemIndex={selectedItemIndex}
              setSelectedItemIndex={this.setSelectedItemIndex}
              baseClassName={baseClassName}
            />
            {breakpoint === 'small' && (
              <CarouselArrow
                className={`${baseClassName}__controls-arrow ${baseClassName}__controls-arrow--next myhki-carousel__controls-arrow myhki-carousel__controls-arrow--next`}
                onClick={this.next}
                ariaLabel={i18n.t('carousel:next')}
              ></CarouselArrow>
            )}
          </div>
        )}

        <div role="group" className={`${baseClassName}__carousel`} ref={this.carouselRef}>
          {multipleItems && (!showDots || breakpoint !== 'small') && (
            <>
              <CarouselArrow
                className={`${baseClassName}__carousel-arrow ${baseClassName}__carousel-arrow--prev myhki-carousel__carousel-arrow myhki-carousel__carousel-arrow--prev`}
                onClick={this.prev}
                ariaLabel={i18n.t('carousel:previous')}
              />
              <CarouselArrow
                className={`${baseClassName}__carousel-arrow ${baseClassName}__carousel-arrow--next myhki-carousel__carousel-arrow myhki-carousel__carousel-arrow--next`}
                onClick={this.next}
                ariaLabel={i18n.t('carousel:next')}
              ></CarouselArrow>
            </>
          )}
          <ResponsiveCarousel
            selectedItem={selectedItemIndex}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            axis="horizontal"
            swipeScrollTolerance={CarouselSwipeTolerance}
            onChange={this.setSelectedItemIndex}
            infiniteLoop={false}
            onClickItem={this.props.onClickItem}
          >
            {this.props.children}
          </ResponsiveCarousel>
        </div>
      </>
    );
  }
}

export default Carousel;
