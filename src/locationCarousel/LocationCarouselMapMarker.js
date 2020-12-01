//@flow
import React from 'react';
import classNames from 'classnames';
import i18n from '../root/i18n';

import locationIcon from '../../assets/images/map-marker.svg';

type Props = {
  className: string,
  lat: Number,
  lng: Number,
  text: string,
};

class LocationCarouselMapMarker extends React.Component {
  props: Props;

  render() {
    const {className, text} = this.props;
    return (
      <div
        ref={`marker-${text}`}
        className={classNames('myhki-location-carousel-map-marker', className)}
      >
        <img src={locationIcon} alt={i18n.t('locationCarousel:pin')} />
        {!!text && <div className="myhki-location-carousel-map-marker__text">{text}</div>}
      </div>
    );
  }
}

export default LocationCarouselMapMarker;
