import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import {LazyBackground, LazyImage} from '../lazyImage/LazyImage';
import get from 'lodash/get';

type Props = {
  t: any,
  className: String,
  image: String,
  text: String,
  alt: String,
  copyright: String,
  flip: Boolean,
  colorScheme: Object,
};

class Portrait extends Component {
  props: Props;

  static defaultProps = {
    flip: false,
  }

  render() {
    const {t, className, text, image, alt, copyright, flip, colorScheme} = this.props;
    const style = {
      background: get(colorScheme, 'background'),
      color: get(colorScheme, 'text'),
    };

    return (
      <div
        className={classNames('myhki-portrait', className, {
          'myhki-portrait--flipped': flip,
          'myhki-portrait--has-text-color': style.color,
        })}
        style={style}
      >
        <div className="myhki-portrait__image">
          <LazyImage src={image} alt={alt} />
          <div className="myhki-portrait__copyright">
            {`${t('hero:copyrights')} ${copyright}`}
          </div>
        </div>
        <div className="myhki-portrait__text" dangerouslySetInnerHTML={{__html: text}} />
      </div>
    );
  }
}

export default flowRight(
  translate(['common']),
  withRouter,
)(Portrait);
