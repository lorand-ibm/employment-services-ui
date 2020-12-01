import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import LinkDuo from '../linkduo/LinkDuo';
import LikeMarker from '../likeMarker/LikeMarker';
import LikeMarkerButton from '../likeMarker/LikeMarkerButton';

import {ContentTypes} from '../constants';
import {LazyBackground} from '../lazyImage/LazyImage';

type Props = {
  className: String,
  type: String | Array,
  subtitle: String,
  headline: String,
  background: String,
  image: String,
  detailsBackground: String,
  detailsColor: String,
  width: String,
  isDimmed: Boolean,
  isFramed: Boolean,
  cornerText: String,
  showRating: Boolean,
  rating: Number,
  showLike: Boolean,
  isLiked: Boolean,
  onLike: Function,
  showPlaceholder: Boolean,
  placeholder: Object,
  link: String,
  extLink: String,
  extLinkTitle: String,
  sustainabilityStatus: Boolean,
};

export class Card extends Component {
  props: Props;

  static defaultProps = {
    type: 'default',
    width: '25%',
    showPlaceholder: true,
    onLike: () => {},
  };

  render() {
    const {
      className,
      type,
      subtitle,
      headline,
      background,
      image,
      detailsBackground,
      detailsColor,
      width,
      isFramed,
      cornerText,
      showRating,
      rating,
      showLike,
      isLiked,
      onLike,
      showPlaceholder,
      placeholder,
      link,
      extLink,
      extLinkTitle,
      sustainabilityStatus,
      teaserVideoUrl,
      teaserVideoMobileUrl,
      mobile,
    } = this.props;

    let {isDimmed} = this.props;
    if (Array.isArray(type) && type.length > 0 && type[0] === ContentTypes.ARTICLE) {
      isDimmed = false;
    }

    const hasDetailsBackground =
      !isDimmed && !isFramed && !(showPlaceholder && (!background && !image))
        ? detailsBackground
        : false;
    const hasDetailsColor =
      !isDimmed && !isFramed && !(showPlaceholder && (!background && !image))
        ? detailsColor
        : false;

    const backgroundClassName = background && background.includes('svg') ? 'myhki-card__background2' : 'myhki-card__background';

    const cardContent = () => {
      const cardContentBackgroundMedia = () => {
        const video = mobile ? teaserVideoMobileUrl : teaserVideoUrl;
        if (!!teaserVideoUrl) {
          /* Show teaser video as card background. The video element has an image background as a fallback
          is the users browser blocks autoplaying videos. */
          return (
            <div className="myhki-card__background" style={!!image ? {background:`url("${image}")`} : {}}>
              <div className="myhki-card__video">
                <video className="lazyload" muted autoPlay loop playsinline="" width="100%" src={video} type="video/mp4"/>
              </div>
            </div>
          );
        } else if (!!image) {
          return (
            <LazyBackground className="myhki-card__image" backgroundImage={`url("${image}")`} />
          );
        }
        return null;
      };
      return (
        <LazyBackground background={background} className={backgroundClassName}>
          {cardContentBackgroundMedia()}
          <div className="myhki-card__corner-text">{cornerText}</div>
          {showLike && (
            <LikeMarker
              showSustainabilityMarker={!!sustainabilityStatus}
            />
          )}
          <div className="myhki-card__frame"> </div>
          <div
            className={classNames('myhki-card__details', {
              'dark-text': hasDetailsBackground && !hasDetailsColor,
            })}
            style={{
              background: hasDetailsBackground,
              color: hasDetailsColor,
            }}
          >
            <span
              title={subtitle}
              className="myhki-card__subtitle"
              style={{background: hasDetailsBackground, color: hasDetailsColor}}
            >
              {isString(subtitle) ? subtitle : ''}
            </span>
            <span className="myhki-card__headline">{isString(headline) ? headline : ''}</span>
            {!link && extLink && extLinkTitle && (
              <span className="myhki-card__link">
                {isString(extLinkTitle) ? extLinkTitle : ''}
              </span>
            )}
            {showRating && (
              <span
                className={classNames(
                  'myhki-card__rating',
                  rating ? 'myhki-card__rating--' + rating : '',
                )}
              >
                <span className="myhki-card__rating-background" />
                <span className="myhki-card__rating-foreground" />
              </span>
            )}
          </div>
        </LazyBackground>
      );
    };

    const typeClasses = [];
    if (type) {
      const types = isArray(type) ? type : [type];

      forEach(types, item => {
        typeClasses.push(`myhki-card--type-${item}`);
      });
    }

    return (
      <div
        className={classNames('myhki-card', typeClasses, className, {
          'myhki-card--dimmed': isDimmed,
          'myhki-card--framed': isFramed,
          'myhki-card--no-image': !background && !image,
        })}
        style={{width: width}}
      >
        {link || extLink ? (
          <>
            <LinkDuo className="myhki-card__wrapper" to={link ? link : extLink}>
              {showPlaceholder && placeholder}
              {cardContent()}
            </LinkDuo>
            {showLike &&
              <LikeMarkerButton
                showSustainabilityMarker={!!sustainabilityStatus}
                isLiked={isLiked}
                onLike={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
                title={' '}
              />
            }
          </>
        )
          : (
            <div className="myhki-card__wrapper">
              {showPlaceholder && placeholder}
              {cardContent()}
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(Card);
