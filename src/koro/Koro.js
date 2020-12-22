import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import base64 from 'base-64';

import {KoroTypes} from '../constants';

import basicWave from './types/basicWave';
import verticalBasicWave from './types/verticalBasicWave';
import highWave from './types/highWave';
import mediumWave from './types/mediumWave';
import pyramid from './types/pyramid';
import round from './types/round';
import diagonalWave from './types/diagonalWave';

const getSVG = (type, color) => {
  switch (type) {
    case KoroTypes.BASIC_WAVE:
      return basicWave(color);
    case KoroTypes.VERTICAL_BASIC_WAVE:
      return verticalBasicWave(color);
    case KoroTypes.HIGH_WAVE:
      return highWave(color);
    case KoroTypes.MEDIUM_WAVE:
      return mediumWave(color);
    case KoroTypes.PYRAMID:
      return pyramid(color);
    case KoroTypes.ROUND:
      return round(color);
    case KoroTypes.DIAGONAL:
      return diagonalWave(color);
  }
};

const Koro = ({className, color, type, flip, shiftX}) => {
  const isVertical = type === KoroTypes.VERTICAL_BASIC_WAVE;
  const baseClass = classNames('', isVertical ? 'myhki-koro-vertical' : '');
  let transform = flip && isVertical
                  ? 'rotateY(180deg)'
                  : flip ? 'rotateX(180deg)'
                  : false;
  //transform = false;
  //color = "#d0e6f7";
  return (
    <div
      className={classNames(baseClass, className)}
      style={{
        transform,
        backgroundPositionX: shiftX ? '100%' : false,
        backgroundImage: `url("data:image/svg+xml;base64,${base64.encode(getSVG(type, color))}")`,
      }}
    />
  );
};

Koro.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  flip: PropTypes.bool,
  shiftX: PropTypes.bool,
};

Koro.defaultProps = {
  classNames: '',
  color: '',
  type: KoroTypes.BASIC_WAVE,
  flip: false,
  shiftX: false,
};

export default Koro;
