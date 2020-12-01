// @flow

import React, {Component} from 'react';
import classNames from 'classnames';

type Props = {
  className?: String,
  meta?: Object,
  value?: String,
  label: String,
  checked?: Boolean,
  input: {
    value: Boolean,
    onChange: Function,
  },
  meta: {
    submitFailed: Boolean,
    error: String,
  },
};

class Checkbox extends Component {
  props: Props;

  render() {
    const {
      className,
      label,
      input: {value, onChange},
      meta: {submitFailed, error},
    } = this.props;

    return (
      <div className={classNames(className, 'checkbox', {
        'checkbox--error': submitFailed && error,
        'checkbox--checked': value,
      })}>
        <label className="checkbox__label">
          <input
            type="checkbox"
            className="checkbox__input"
            onChange={() => onChange(!value)}
          />
          <span className="checkbox__status" />
          <span className="checkbox__text">{label}</span>
        </label>
      </div>

    );
  }
}

export default Checkbox;
