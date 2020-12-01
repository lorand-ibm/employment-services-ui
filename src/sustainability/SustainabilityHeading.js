// @flow

import React, {Component} from 'react';
import classNames from 'classnames';

type Props = {
  className?: String,
  level: Number,
  children?: Object,
  color?: 'blue'
};

class SustainabilityHeading extends Component {
  props: Props;

  static defaultProps = {
    level: 1,
    color: 'green',
  };

  render() {
    const {className, level, color, children} = this.props;
    const HeadingTag = `h${level}`;

    return (
      <HeadingTag
        className={classNames(
          className,
          'sustainability-heading',
          {'sustainability-heading--blue': color === 'blue'}
        )}
      >
        {children}
      </HeadingTag>
    );
  }
}

export default SustainabilityHeading;
