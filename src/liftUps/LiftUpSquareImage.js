import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Column} from 'react-foundation';
import classNames from 'classnames';
import {LazyImage} from '../lazyImage/LazyImage';

type Props = {
  t: any,
  context: String,
  key: String,
  title: String,
  link: String,
  image: String,
  imageLeft: Boolean,
};

class LiftUpSquare extends Component {
  props: Props;

  static defaultProps = {
    imageLeft: false,
  }

  cssBase = 'myhki-lift-up-square-image';

  imagePart = (image) => {
    return <Column small={6} className={classNames(`${this.cssBase}__column`)}>
      <LazyImage className={classNames(`${this.cssBase}__image`)} src={image} alt="" />
    </Column>;
  }

  textPart = (context, title) => {
    const contextWithoutHyphenSeparator = context.split('-').join(' ');
    return <Column small={6} className={classNames(`${this.cssBase}__column`)}>
      <div className={classNames(`${this.cssBase}__text`)}>
        <div className={classNames(`${this.cssBase}__text--context`)}>{contextWithoutHyphenSeparator}</div>
        <div className={classNames(`${this.cssBase}__text--title`)}>{title}</div>
      </div>
    </Column>;
  }

  render() {
    const {context, title, link, image, imageLeft} = this.props;

    const textPart = this.textPart(context, title);
    const imagePart = this.imagePart(image);
    const content = <Row className={classNames(`${this.cssBase}__row`)}>
      {imageLeft ? imagePart : textPart }
      {imageLeft ? textPart : imagePart }
    </Row>;

    return (
      <a className={classNames(`${this.cssBase}`)} href={link}>
        {content}
      </a>
    );
  }
}

export default withRouter(LiftUpSquare);
