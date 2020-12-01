import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import chunk from 'lodash/chunk';
import forEach from 'lodash/forEach';
import {Row, Column} from 'react-foundation';
import flowRight from 'lodash/flowRight';
import findIndex from 'lodash/findIndex';
import {translate} from 'react-i18next';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import Carousel from '../carousel/Carousel';
import LocationCarouselCard from './LocationCarouselCard';
import LocationCarouselMapMarker from './LocationCarouselMapMarker';
import {getCenterFromCoordinates, getMaxDistanceFromCoordinates} from '../content/helpers';
import LinkDuo from '../linkduo/LinkDuo';

import {getFoundationBreakpoint} from '../helpers.js';
import ShareLinks from '../shareLinks/ShareLinks';

import {isRetina, getCRS, MAP_URL, MAP_RETINA_URL, getDocumentWidth} from '../helpers';

type Props = {
  className: String,
  items: Array,
  content: Object,
  showShareLinks: Boolean,
  collapseMargins: Boolean,
  t: Function,
};

class LocationCarousel extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    items: [],
    showShareLinks: true,
    content: {},
    collapseMargins: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedSlide: 0,
      selectedItem: null,
      breakpoint: getFoundationBreakpoint(),
      customIcons: null,
    };
  }

  updateBreakpoint = () => {
    this.setState({
      breakpoint: getFoundationBreakpoint(),
    });
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      window.addEventListener('resize', this.updateBreakpoint);
      var {Map, Marker, TileLayer} = require('react-leaflet');
      this.setState({Map, Marker, TileLayer});
    }

    const L = require('leaflet');
    let customIcons = [];
    const items = this.props.items;
    for (let index = 0; index < items.length; index++) {
      const icon = L.divIcon({
        className: `myhki-location-carousel__custom-icon marker-${index + 1}`,
        html: ReactDOMServer.renderToString(<LocationCarouselMapMarker text={index + 1} />),
      });
      customIcons.push(icon);
    }

    const crs = getCRS();
    this.setState({
      crs,
      customIcons,
    });
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      window.removeEventListener('resize', this.updateBreakpoint);
    }
  }

  onCarouselChange = selected => {
    if (selected !== this.state.selectedSlide) {
      this.setState({
        selectedSlide: selected,
        selectedItem: null,
      });
    }
  };

  onControlClick = index => {
    this.setState({
      selectedSlide: index,
      selectedItem: null,
    });
  };

  onMapMarkerClick = (item, index) => {
    const slideIndex = this.getItemSlideIndex(item);
    this.setState({
      selectedSlide: slideIndex !== null ? slideIndex : this.state.selectedSlide,
      selectedItem: item,
    });

    this.handleMarkerAnimation(index);
  };

  handleMarkerAnimation = markerNumber => {
    const node = ReactDOM.findDOMNode(this);

    if (node instanceof HTMLElement) {
      //remove class that's responsible for enlargment of markers
      const markers = node.querySelectorAll('.leaflet-marker-icon');
      const markersArray = Array.from(markers);
      markersArray.map(m => {
        if (m.classList.contains('myhki-location-carousel__marker-selected')) {
          m.classList.remove('myhki-location-carousel__marker-selected');
        }
      });

      //Find clicked marker and append class to trigger enlargemenet
      const marker = node.querySelector(`.marker-${markerNumber + 1}`);
      marker.classList.add('myhki-location-carousel__marker-selected');
    }
  };

  getItemSlideIndex = item => {
    const divided = this.getDividedItems();

    let slideIndex = null;
    forEach(divided, (items, i) => {
      const itemIndex = findIndex(items, o => {
        return o.id === item.id;
      });

      if (itemIndex > -1) {
        slideIndex = i;
        return false;
      }
    });

    return slideIndex;
  };

  getCenter = () => {
    const coordinates = [],
      {selectedSlide, selectedItem} = this.state,
      divided = this.getDividedItems();

    forEach(selectedItem ? [selectedItem] : divided[selectedSlide], item => {
      coordinates.push(item.coordinates);
    });

    return getCenterFromCoordinates(coordinates);
  };

  getZoomLevel = () => {
    const coordinates = [],
      {selectedSlide, selectedItem} = this.state,
      divided = this.getDividedItems();

    forEach(selectedItem ? [selectedItem] : divided[selectedSlide], item => {
      coordinates.push(item.coordinates);
    });

    const maxDistance = getMaxDistanceFromCoordinates(coordinates);
    // Define zoom level based on max distance in meters
    if (maxDistance > 20000) {
      return 11;
    } else if (maxDistance > 4000) {
      return 8;
    } else if (maxDistance > 1500) {
      return 10;
    } else {
      return 12;
    }
  };

  getDividedItems = () => {
    let chunkSize = 2;
    switch (getFoundationBreakpoint()) {
      case 'small':
        chunkSize = 1;
        break;
      case 'xlarge':
      case 'xxlarge':
        chunkSize = 3;
        break;
    }
    return chunk(this.props.items, chunkSize);
  };

  getSlides = () => {
    return this.getDividedItems().map((cards, i) => {
      return (
        <div className="myhki-location-carousel-slide" key={i}>
          {cards.map((card, cardIndex) => {
            return (
              <LocationCarouselCard
                key={cardIndex}
                item={card}
                showLike={card.showLike}
                onLike={card.onLike}
                sustainabilityStatus={card.sustainabilityStatus}
              />
            );
          })}
        </div>
      );
    });
  };

  // Helper for custom arrow button controls
  getNumberOfSlides = () => {
    let chunkSize = 2;
    switch (getFoundationBreakpoint()) {
      case 'small':
        chunkSize = 1;
        break;
      case 'xlarge':
      case 'xxlarge':
        chunkSize = 3;
        break;
    }
    const num = this.props.items.length / chunkSize;
    return Math.ceil(num);
  }

  render() {
    const {t, className, items, collapseMargins} = this.props,
      {title, seeAllLink, seeAllLinkText} = this.props.content ? this.props.content : null,
      {selectedSlide, crs, customIcons, Map, Marker, TileLayer} = this.state,
      center = this.getCenter(),
      zoomLevel = this.getZoomLevel(),
      slides = this.getSlides(),
      divided = this.getDividedItems();

    const isDesktop = getDocumentWidth() > 998;

    if (!customIcons) {
      return null;
    }

    return (
      <div
        className={classNames(
          'myhki-location-carousel',
          `myhki-location-carousel--slides-${divided.length}`,
          className,
          {'myhki-location-carousel--collapse-margins': collapseMargins}
        )}
      >
        <div className="myhki-location-carousel__titleContainer">
          {!!title && <h3 className="myhki-location-carousel__title">{title}</h3>}
          {!!seeAllLink && (
            <LinkDuo className="myhki-location-carousel__see-all-link" to={seeAllLink}>
              {seeAllLinkText || t('seeAllLabel')}
            </LinkDuo>
          )}
        </div>
        <Carousel
          baseClassName="myhki-location-carousel"
          showDots={true}
          itemsLength={slides.length}
          onCarouselChange={this.onCarouselChange.bind(this)}
        >
          {slides}
        </Carousel>
        <div className="myhki-location-carousel__map">
          <div className="myhki-location-carousel__map-container">
            <Map
              center={[center.lat, center.lng]}
              crs={crs}
              zoom={zoomLevel}
              minZoom={6}
              maxZoom={14}
              dragging={isDesktop}
              touchZoom={true}
              scrollWheelZoom={false}
              style={{height: '500px'}}
            >
              <TileLayer
                url={isRetina() ? MAP_RETINA_URL : MAP_URL}
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {items.map((item, i) => (
                <Marker
                  position={[item.coordinates.lat, item.coordinates.lng]}
                  icon={customIcons[i]}
                  key={i}
                  onClick={() => {
                    this.onMapMarkerClick(item, i);
                  }}
                />
              ))}
            </Map>
          </div>
        </div>
        <ShareLinks title={t('shareLinksTitle')} />
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['locationCarousel']),
)(LocationCarousel);
