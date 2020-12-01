import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

import {Colors} from '../constants';
import {LazyLink} from '../lazyImage/LazyImage';
import LikeMarker from '../likeMarker/LikeMarker';
import LikeMarkerButton from '../likeMarker/LikeMarkerButton';

type Props = {
  className: String,
  link: String,
  heart: String,
  image: String,
  header: String,
  title: String,
  description: String,
  color: String,
  tags: [],
  onHeartClick: Function,
  placeholder: Object,
  sustainabilityStatus: Boolean,
  focus: Boolean,
};

class SearchItem extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    if (props.focus) {
      this.focusRef = React.createRef();
    }
  }

  componentDidMount() {
    if (this.props.focus) {
      this.focusRef.setAttribute('tabindex', '-1');
      this.focusRef.style.outline = 'none';
      this.focusRef.focus();

      // On blur, remove tabindex, just to avoid capturing focus again
      this.focusRef.addEventListener('blur', function removeTabIndex() {
        if (this.focusRef) {
          this.focusRef.removeAttribute('tabindex');
          this.focusRef.removeEventListener('blur', removeTabIndex);
        }
      });
    }
  }


  render() {
    const {
      className,
      link,
      heart,
      image,
      header,
      title,
      description,
      tags = [],
      onHeartClick,
      placeholder,
      color,
      sustainabilityStatus,
      focus,
    } = this.props;

    return (
      <div
        className={classNames('myhki-search-item', className, {
          'myhki-search-item--no-image': !image,
        })}
        ref={(node) => {if (focus) { this.focusRef = node; return this.focusRef}}}
      >
        <div className="save-to-myhelsinki-button-wrapper">
        <LazyLink
          className={heart ? 'myhki-search-item__heart' : 'myhki-search-item__image'}
          to={link}
          background={heart ? heart : `${image ? image : ''} ${color ? color : Colors.HEL_SILVER}`}
          aria-label={title}
        >
          {!!placeholder && placeholder}
            {!!onHeartClick &&
            <LikeMarker
              showSustainabilityMarker={!!sustainabilityStatus}
              small={true}
            />
          }
        </LazyLink>
        {!!onHeartClick && (
          <LikeMarkerButton
            onLike={e => {
              e.preventDefault();
              onHeartClick();
            }}
            title={title}
            small={true}
            showSustainabilityMarker={!!sustainabilityStatus}
          />  
        )}
        </div>
        <div className="myhki-search-item__wrapper">
          <div className="myhki-search-item__header">{header}</div>
          <h3 className="myhki-search-item__title">
            <Link to={link}>{title}</Link>
          </h3>
          <div className="myhki-search-item__description">{description}</div>
          <div className="myhki-search-item__footer">
            <div className="myhki-search-item__tags">
              {tags.map((tag, i) => (
                <Link
                  key={i}
                  to={tag.link}
                  className="myhki-search-item__tag"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

// Skeleton item used for skeleton loading.
export const SkeletonSearchItem = () => (
  <div
    className='myhki-search-item myhki-search-item--no-image'
  >
    <a
      className='myhki-search-item__heart'
      style={{ backgroundColor: 'rgb(222, 223, 225)' }}
    >
    </a>
    <div className="myhki-search-item__wrapper">
      <div className="myhki-search-item__header--skeleton"></div>
      <h3 className="myhki-search-item__title--skeleton">
      </h3>
      <div className="myhki-search-item__description--skeleton"></div>
      <div className="myhki-search-item__footer--skeleton">
      </div>
    </div>
  </div>
)

export default SearchItem;
