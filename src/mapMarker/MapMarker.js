import React from 'react';
import classNames from 'classnames';

import locationIcon from '../../assets/images/ico-location.svg';

type Props = {
  className: String,
  lat: Number,
  lng: Number,
  text: String,
};

const MapMarker = ({className}: Props) => (
  <div className={classNames('myhki-map-marker', className)}>
    <img src={locationIcon} />
  </div>
);

export default MapMarker;
