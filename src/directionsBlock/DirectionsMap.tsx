import React, {Component, createRef} from 'react';
import {Column} from 'react-foundation';
import i18n from '../root/i18n';

import {Coords, Address, Coords2, RentalBikeStation} from './types';

import {isRetina, MAP_URL, MAP_RETINA_URL, getDocumentWidth, getCRS} from '../helpers';

import {fetchCityBikes} from './reittiopas/reittiopasCitybikeFetch';

import icoFromLocationSvg from '../../assets/images/reittiopas/ico-from-location.svg';
import icoToLocationSvg from '../../assets/images/reittiopas/ico-to-location.svg';
import icoCitybikeStationSvg from '../../assets/images/reittiopas/ico-citybike-station.svg';

const rootClassName = 'myhki-directions-block';

interface Props {
  toAddress: Address;
  fromAddress: Address;
  addressStr: string;
  defaultToAddress: Address;
}

interface State {
  crs: any;
  Map: any;
  Marker: any;
  TileLayer: any;
  Popup: any;
  FeatureGroup: any;
  rentalBikeStations: RentalBikeStation[];
  renderRentalBikeStations: boolean;
}

class DirectionsMap extends Component {
  props: Props;

  state: State = {
    crs: null,
    Map: null,
    Marker: null,
    TileLayer: null,
    Popup: null,
    FeatureGroup: null,
    rentalBikeStations: null,
    // if toAddress is not selected, zoom level is 9: dont render 
    renderRentalBikeStations: !!this.props.toAddress,
  };

  START_VIEW_PORT = {
    center: this.props.toAddress
      ? [this.props.toAddress.coords.lat, this.props.toAddress.coords.lon]
      : [this.props.defaultToAddress.coords.lat, this.props.defaultToAddress.coords.lon],
    zoom: 9,
  };

  map: any = createRef();
  MAX_ZOOM_LEVEL_CITYBIKES = 9;

  componentWillMount() {
    if (global.IS_CLIENT) {
      const crs = getCRS();
      this.setState({crs});
      var {Map, Marker, TileLayer, Popup, FeatureGroup} = require('react-leaflet');
      this.setState({Map, Marker, TileLayer, Popup, FeatureGroup});

      fetchCityBikes().then(data => {
        const rentalBikeStations: RentalBikeStation[] = data.bikeRentalStations;

        this.setState({
          //Filter out stations with no coordinates set. Bug in API?
          rentalBikeStations: rentalBikeStations.filter(
            station => station.lon !== 0 && station.lat !== 0,
          ),
        });
      });
    }
  }

  componentDidMount() {
    this.map.current.leafletElement.on('zoomend', this.onZoomChange.bind(this));
  }

  componentDidUpdate(prevProps) {
    const toAddressChanged = prevProps.toAddress !== this.props.toAddress;
    const fromAddressChanged = prevProps.fromAddress !== this.props.fromAddress;
    const toAddressSelected = this.props.toAddress;
    const fromAddressSelected = this.props.fromAddress;
    // Searches routing when to and fromm address selected
    if (fromAddressSelected && toAddressSelected && (fromAddressChanged || toAddressChanged)) {
      const fromCoords = this.props.fromAddress.coords;
      const toCoords = this.props.toAddress.coords;
      this.map.current.leafletElement.fitBounds([
        [fromCoords.lat, fromCoords.lon],
        [toCoords.lat, toCoords.lon],
      ]);
    } else if (toAddressChanged && !fromAddressSelected) {
      const toCoords = this.props.toAddress.coords;
      this.map.current.leafletElement.fitBounds([[toCoords.lat, toCoords.lon]]);
    }
  }

  onZoomChange = e => {
    const zoomLevel = this.map.current.leafletElement.getZoom();
    if (this.state.renderRentalBikeStations && zoomLevel <= this.MAX_ZOOM_LEVEL_CITYBIKES) {
      this.setState({renderRentalBikeStations: false});
    }
    if (!this.state.renderRentalBikeStations && zoomLevel > this.MAX_ZOOM_LEVEL_CITYBIKES) {
      this.setState({renderRentalBikeStations: true});
    }
  };

  render() {
    const {crs, Map, Marker, TileLayer, Popup, FeatureGroup} = this.state;
    const {toAddress, fromAddress, addressStr} = this.props;
    if (!crs) return null;

    const isDesktop = getDocumentWidth() > 998;

    const fromAddressCoords: Coords = fromAddress ? fromAddress.coords : null;
    const toAddressCoords: Coords = toAddress
      ? toAddress.coords
      : this.props.defaultToAddress.coords;

    const twoMarkersSelected = fromAddressCoords && toAddressCoords;

    const createMarkerLIcon = svg =>
      new L.Icon({
        iconUrl: svg,
        iconRetinaUrl: svg,
        iconAnchor: null,
        popupAnchor: [0, -28],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: twoMarkersSelected
          ? isDesktop
            ? new L.Point(50, 50)
            : new L.Point(40, 40)
          : isDesktop
          ? new L.Point(55, 55)
          : new L.Point(45, 45),
      });

    const createCitybikeLIcon = () => {
      return new L.Icon({
        iconUrl: icoCitybikeStationSvg,
        iconRetinaUrl: icoCitybikeStationSvg,
        iconAnchor: null,
        popupAnchor: [0, -13],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: isDesktop ? new L.Point(20, 20) : new L.Point(18, 18),
      });
    };

    const rentalBikeStationMarkers =
      this.state.rentalBikeStations && this.state.renderRentalBikeStations ? (
        <FeatureGroup>
          {this.state.rentalBikeStations.map((station: RentalBikeStation) => (
            <Marker
              key={station.lat + ', ' + station.lon}
              position={[station.lat, station.lon]}
              icon={createCitybikeLIcon()}
            >
              <Popup>
                <span>
                  {i18n.t('reittiopas:cityBikePopupText')}: {station.bikesAvailable}
                </span>
              </Popup>
            </Marker>
          ))}
        </FeatureGroup>
      ) : null;

    return (
      <Column small={12} medium={6} orderOnSmall={1} orderOnMedium={2}>
        <div className={`${rootClassName}__map`}>
          <div className={`${rootClassName}__map-container`}>
            <Map
              ref={this.map}
              boundsOptions={{padding: [50, 50]}}
              crs={crs}
              minZoom={6}
              maxZoom={14}
              scrollWheelZoom={false}
              dragging={isDesktop}
              touchZoom={true}
              className={`${rootClassName}__map-content`}
              viewport={
                !toAddress && !fromAddress ? this.START_VIEW_PORT : null
              }
            >
              <TileLayer
                url={isRetina() ? MAP_RETINA_URL : MAP_URL}
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {toAddress && toAddressCoords && (
                <Marker
                  position={[toAddressCoords.lat, toAddressCoords.lon]}
                  icon={createMarkerLIcon(icoToLocationSvg)}
                  zIndexOffset={1000}
                >
                  <Popup>
                    <span>{addressStr}</span>
                  </Popup>
                </Marker>
              )}
              {fromAddressCoords && (
                <Marker
                  position={[fromAddressCoords.lat, fromAddressCoords.lon]}
                  icon={createMarkerLIcon(icoFromLocationSvg)}
                  zIndexOffset={1000}
                >
                  <Popup>
                    <span>{fromAddress.name + ', ' + fromAddress.localadmin}</span>
                  </Popup>
                </Marker>
              )}
              {rentalBikeStationMarkers}
            </Map>
          </div>
        </div>
      </Column>
    );
  }
}

export default DirectionsMap;
