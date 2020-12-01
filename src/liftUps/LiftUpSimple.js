import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import {LazyBackground} from '../lazyImage/LazyImage';
import get from 'lodash/get';

type Props = {
  t: any,
  className: String,
  title: String,
  link: String,
  color: String,
  backgroundImage: String,
  flip: Boolean,
  colorScheme: Object,
};

class LiftUpSimple extends Component {
  props: Props;

  static defaultProps = {
    flip: false,
    colorScheme: {},
  }

  render() {
    const {t, className, title, link, backgroundImage, flip, colorScheme} = this.props;
    const style = {
      background: get(colorScheme, 'background'),
      color: get(colorScheme, 'text'),
    };

    return (
      <div
        className={classNames('myhki-lift-up-simple', className, {
          'myhki-lift-up-simple--flipped': flip,
          'myhki-lift-up-simple--has-text-color': style.color,
        })}
        style={style}
      >
        <div className="myhki-lift-up-simple__info">
          <h2 className="myhki-lift-up-simple__title">{title}</h2>
          <div className="myhki-lift-up-simple__see-more-wrapper">
            <Link className="myhki-lift-up-simple__see-more" to={link} onlyActiveOnIndex={true}>
              {t('seeMoreLabel')}
            </Link>
          </div>
        </div>
        <LazyBackground className="myhki-lift-up-simple__background" background={backgroundImage} />
      </div>
    );
  }
}

export default flowRight(
  translate(['common']),
  withRouter,
)(LiftUpSimple);
