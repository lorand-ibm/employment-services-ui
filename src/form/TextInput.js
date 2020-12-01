// @flow

import React, {Component} from 'react';
import classNames from 'classnames';
import Textarea from 'react-textarea-autosize';

import {Colors} from '../constants';

import type {Style} from '../types';

type Props = {
  className: string,
  type: string,
  input: Object,
  meta: Object,
  label: string,
  placeholder: string,
  styles: {
    label?: Style,
    input?: Style,
  },
  collapseMargins?: Boolean,
};

class TextInput extends Component {
  props: Props;
  input: any;

  static defaultProps = {
    type: 'text',
    styles: {},
    collapseMargins: false,
  };

  render() {
    const {
      className,
      type,
      input: {value, name, onChange},
      meta: {submitFailed, error},
      label,
      errorLabel,
      placeholder,
      styles,
      collapseMargins,
    } = this.props;

    return (
      <div
        className={classNames(className, 'text-input', `text-input--type-${type}`, {
          'text-input--error': submitFailed && error,
          'text-input--collapse-margins': collapseMargins,
        })}
      >
        <label
          htmlFor={name}
          className={'text-input__label'}
          style={{...defaultStyles.label, ...styles.label}}
        >
          {label}
          {errorLabel && <div className="text-input__label-error"><div className="visually-hidden">Error:</div>{errorLabel}</div>}
        </label>
        {type !== 'textarea' && (
          <input
            id={name}
            type={type}
            className={'text-input__input'}
            style={{...defaultStyles.input, ...styles.input}}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        {type === 'textarea' && (
          <Textarea
            id={name}
            className={'text-input__input'}
            style={{...defaultStyles.input, ...styles.input}}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        <div
          className={classNames(
            'text-input__underline',
            submitFailed && error && 'text-input__underline--error',
          )}
        />
      </div>
    );
  }
}

// @todo Use 'inherit' by default.
const defaultStyles = {
  label: {
    color: Colors.WHITE,
  },
  input: {
    backgroundColor: 'transparent',
    color: Colors.WHITE,
  },
};

export default TextInput;
