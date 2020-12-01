// @flow

import React from 'react';
import classNames from 'classnames';

type Props = {
  type?: 'button' | 'submit',
  onClick?: Function,
  color?: 'white' | 'blue' | 'red' | 'black',
  expand?: Boolean,
  className?: String,
  wide?: Boolean,
  children?: Object,
  disabled?: Boolean,
  borderless?: Boolean,
  loading?: Boolean,
};

// @todo Refactor our code to use the actual Foundation Button component instead
//   of this weird custom thingy that has Foundation css button classes.
const Button = ({
  type = 'button',
  color = 'black',
  expand = false,
  wide = false,
  className,
  onClick = () => {},
  children,
  disabled,
  borderless,
  loading,
}: Props) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={classNames(
      className,
      color,
      'button hollow',
      {
        'button--expand': expand,
        'button--wide': wide,
        'button--borderless': borderless,
        'button--loading': loading,
      },
    )}
  >
    {loading && (
      <span className="button__loader-container">
        <i className={classNames(
          'button__loader',
          'fa fa-circle-o-notch fa-spin fa-fw',
        )} />
      </span>
    )}
    {children}
  </button>
);

export default Button;
