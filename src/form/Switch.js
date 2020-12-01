// @flow

import React from 'react';
import classnames from 'classnames';
import i18n from '../root/i18n';

type Props = {
  input: {
    value: boolean,
    onChange: Function,
  },
};

const Switch = ({input: {value, onChange, name}}: Props) => (
  <>
    <label htmlFor="rocker-button" className="visually-hidden">{i18n.t('myHelsinkiList:privacyFieldLabel')}</label>
    <button
      id="rocker-button"
      role="switch"
      aria-checked={value}
      className={classnames('myhki-switch', value ? 'myhki-switch--on' : 'myhki-switch--off')}
      onClick={() => {
        event.preventDefault()
        onChange(!value)}
      }
    >
      {value && (
        <span className={'myhki-switch__rocker-label myhki-switch__rocker-label--on'}>On</span>
      )}
      <div className={'myhki-switch__rocker'} />
      {!value && (
        <span className={'myhki-switch__rocker-label myhki-switch__rocker-label--off'}>Off</span>
      )}
    </button>
  </>
);

export default Switch;
