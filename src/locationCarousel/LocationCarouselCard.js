import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';

import {Colors} from '../constants';
import ShowMore from '../showMore/ShowMore';
import {LazyBackground} from "../lazyImage/LazyImage";
import LikeMarker from '../likeMarker/LikeMarker';
import LikeMarkerButton from '../likeMarker/LikeMarkerButton';

type Props = {
  className: String,
  item: Object,
  router: PropTypes.object,
  showLike: Boolean,
  isLiked: Boolean,
  onLike: Function,
  sustainabilityStatus: Boolean,
};

type State = {
  isOpened: boolean,
};

const itemClick = (item, router) => {
  if (item.link) {
    router.push(item.link);
  }
};

export class LocationCarouselCard extends Component {
  props: Props;

  state: State = {
    isOpened: false,
  };

  static defaultProps = {
    showLike: false,
    isLiked: false,
    onLike: () => {},
  };

  render() {
    const {className, item, router, showLike, isLiked, onLike, sustainabilityStatus} = this.props;

    return (
      <div
        className={classNames('myhki-location-carousel-card', className, {
          'myhki-location-carousel-card--no-image': !item.image,
        })}
      >
        <div className="myhki-location-carousel-card__wrapper">
          <div
            className={classNames('myhki-location-carousel-card__content', {
              'myhki-location-carousel-card__content--open': this.state.isOpened,
            })}
          >
            <div className="myhki-location-carousel-card__info">
              <a
                href={item.link || '#0'}
                className="myhki-location-carousel-card__title"
              >
                {item.title}
              </a>
              <div className="myhki-location-carousel-card__description">
                <ShowMore
                  onReadMoreClick={isOpened => {
                    this.setState({isOpened: isOpened});
                  }}
                >
                  <div dangerouslySetInnerHTML={{__html: item.description}} />
                </ShowMore>
              </div>
            </div>
            <div
              className="myhki-location-carousel-card__image"
              onClick={() => itemClick(item, router)}
            >
              <LazyBackground
                className="myhki-location-carousel-card__image__background"
                backgroundImage={item.image ? `url("${item.image}")` : null}
                backgroundColor={Colors.HEL_SILVER}
              />
              {!!item.placeholder && item.placeholder}
              {showLike &&
              <>
                <LikeMarker
                  showSustainabilityMarker={!!sustainabilityStatus}
                />
                <LikeMarkerButton
                  title={item.title}
                  isLiked={isLiked}
                  onLike={(e) => {
                    e.stopPropagation();
                    onLike();
                  }}
                  showSustainabilityMarker={!!sustainabilityStatus}
                />
                </>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default flowRight(withRouter)(LocationCarouselCard);
