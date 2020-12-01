import React, {Component} from 'react';
import {withRouter} from 'react-router';
import flowRight from 'lodash/flowRight';
import classNames from 'classnames';
import {browserHistory} from 'react-router';
import {translate} from 'react-i18next';
import i18n from '../root/i18n';

import ShowMore from '../showMore/ShowMore';
import {LazyBackground} from '../lazyImage/LazyImage';
import LikeMarker from '../likeMarker/LikeMarker';
import LikeMarkerButton from '../likeMarker/LikeMarkerButton';

type Props = {
  className: String,
  title: String,
  image: String,
  color: String,
  link: String,
  placeholder: Object,
  children: Object,
  showLike: Boolean,
  isLiked: Boolean,
  onLike: Function,
  sustainabilityStatus: Boolean,
};

type State = {
  isOpened: Boolean,
};

const onClick = link => {
  if (link) {
    browserHistory.push(link);
  }
};
export class RichBlock extends Component {
  props: Props;

  static defaultProps = {
    color: '#ffffff',
    showLike: false,
    isLiked: false,
    onLike: () => {},
  };

  state: State = {
    isOpened: false,
  };

  render() {
    const {
      className,
      title,
      image,
      color,
      link,
      placeholder,
      children,
      showLike,
      isLiked,
      onLike,
      sustainabilityStatus,
    } = this.props;
    return (
      <div
        className={classNames('myhki-rich-block', className, {
          'myhki-rich-block--has-link': !!link,
          'myhki-rich-block--no-image': !image,
        })}
      >
        {showLike &&
          <LikeMarkerButton
            title={title}
            isLiked={isLiked}
            onLike={(e) => {
              e.stopPropagation();
              onLike();
            }}
            showSustainabilityMarker={!!sustainabilityStatus}
          />
        }
        <LazyBackground
          className="myhki-rich-block__image foobar"
          backgroundImage={`${image ? `url("${image}")` : ''}`}
          backgroundColor={color}
          onClick={() => onClick(link)}
        >
          {showLike &&
            <LikeMarker
              showSustainabilityMarker={!!sustainabilityStatus}
            />
          }
          {placeholder}
        </LazyBackground>
        <div className="myhki-rich-block__wrapper">
          <div className="myhki-rich-block__wrapper-inner">
            <div className="myhki-rich-block__info">
              <a
                className={classNames('myhki-rich-block__title', {
                  'myhki-rich-block__title-opened': this.state.isOpened,
                })}
                href={link}
                onClick={() => onClick(link)}
              >
                {title}
              </a>
              <div className="myhki-rich-block__body">
                <ShowMore
                  lines={5}
                  preserveSpace
                  onReadMoreClick={isOpen => {
                    this.setState({isOpened: isOpen});
                  }}
                >
                  {children}
                </ShowMore>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['common']),
)(RichBlock);
