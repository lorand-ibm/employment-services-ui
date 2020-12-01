import React from 'react';

import i18n from '../root/i18n';

import queryRoutes from './reittiopas/reittiopasRoutesFetch';

import {createAddressStr} from './helpers';

import reittiopasConfig from './reittiopas/reittiopasConfig';

import walkingIcon from '../../assets/images/reittiopas/ico-walking.svg';
import cyclingIcon from '../../assets/images/reittiopas/ico-cycling.svg';
import busIcon from '../../assets/images/reittiopas/ico-bus.svg';
import carIcon from '../../assets/images/reittiopas/ico-car.svg';
import linkIcon from '../../assets/images/reittiopas/ico-link.svg';
import spinnerIcon from '../../assets/images/reittiopas/ico-spinner.svg';
import {RouteResults, ItinaryDetails, Address} from './types';

const rootClassName = 'myhki-directions-block__hsl';

interface RouteType {
  icon: string;
}

const routeTypes: {[key: string]: RouteType} = {
  WALK: {
    icon: walkingIcon,
  },
  BICYCLE: {
    icon: cyclingIcon,
  },
  ALL: {
    icon: busIcon,
  },
  CAR: {
    icon: carIcon,
  },
};

const Result = (props: {
  key: string;
  result: ItinaryDetails;
  routeType: string;
  routeTypeIcon: string;
  fromAddress: Address;
  toAddress: Address;
  date: number;
}) => {
  const {result, routeType, routeTypeIcon, fromAddress, toAddress, date} = props;
  if (!result) {
    return null;
  }

  const urlTransportModes = reittiopasConfig.urlTransportModes[routeType];

  return (
    <li>
      <a
        href={getReittiopasJourneyUrl(fromAddress, toAddress, urlTransportModes, date)}
        className={`${rootClassName}-result ${rootClassName}-results-list-element`}
      >
        <div className={`${rootClassName}-result-icon`}>
          <img src={routeTypeIcon} />
        </div>
        <div className={`${rootClassName}-result-info-flex-wrapper`}>
          <div className={`${rootClassName}-result-info`}>
            <div className={`${rootClassName}-result-text-bold`}>
              {i18n.t(`reittiopas:transporationTypes:${routeType}`)}
            </div>
            <div>
              <div className={`${rootClassName}-result-duration ${rootClassName}-result-text-bold`}>
                {Math.round(result.duration / 60)} min
              </div>
              <div className={`${rootClassName}-result-distance`}>
                {(result.distance / 1000)
                  .toFixed(1)
                  .toString()
                  .replace('.', ',')}{' '}
                km{' '}
              </div>
            </div>
          </div>
          <div
            className={`${rootClassName}-result-emissions-column ${rootClassName}-result-emissions`}
          >
            <div className={`${rootClassName}-result-emissions-text`}>
              {Math.round(result.emissions)} g
            </div>
          </div>
        </div>
        <div className={`${rootClassName}-result-link-icon`}>
          <div>
            <img src={linkIcon} />
          </div>
        </div>
      </a>
    </li>
  );
};

const formatMetaDate = date =>
  date.getDate() +
  '.' +
  (date.getMonth() + 1) +
  '.' +
  date.getFullYear() +
  ' ' +
  ('0' + date.getHours()).slice(-2) +
  ':' +
  ('0' + date.getMinutes()).slice(-2);

const getReittiopasJourneyUrl = (
  fromAddress: Address,
  toAddress: Address,
  transportationMode: string,
  date: number,
) => {
  const reittiopasAddrStr = (address: Address) => {
    return createAddressStr(address) + '::' + address.coords.lat + ',' + address.coords.lon;
  }

  const langParam = () => {
    const language = i18n.language; 
    if (language === 'fi') {
      return 'fi';
    } else if (language === 'sv') {
      return 'sv';
    }
    return 'en';
  }

  return (
    'https://reittiopas.hsl.fi/' +
    langParam() +
    '/reitti/' +
    reittiopasAddrStr(fromAddress) +
    '/' +
    reittiopasAddrStr(toAddress) +
    '?modes=' +
    transportationMode +
    '&time=' +
    (date / 1000).toFixed(0)
  );
};

const getReittiopasUrl = () => {
  const lang = i18n.language;
  const reittiopasUrl = reittiopasConfig.reittiopasUrl;
  if (lang === 'fi') {
    return reittiopasUrl;
  }
  if (lang === 'sv') {
    return reittiopasConfig.reittiopasUrl + '/sv';
  }
  return reittiopasUrl + '/en';
};

const Error = (props: {errorMessage: string}) => (
  <div className={`${rootClassName}-results`}>
    <ul className={`${rootClassName}-results-list`}>
      <li>
        <div className={`${rootClassName}-results-meta ${rootClassName}-results-list-element`}>
          <div className={`${rootClassName}-results-meta-time`}>{formatMetaDate(new Date())}</div>
        </div>
      </li>
      <li>
        <div className={`${rootClassName}-error`}>
          <div className={`${rootClassName}-error-text`}>{props.errorMessage}</div>
          <div className={`${rootClassName}-error-reittiopas-link-wrapper`}>
            <a href={getReittiopasUrl()} className={`${rootClassName}-error-reittiopas-link`}>
              {i18n.t('reittiopas:linkText')}
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

interface Props {
  toAddress: Address;
  fromAddress: Address;
}

interface State {
  fetching: boolean;
  routeResults: RouteResults;
  errorMessage: string;
}

class DirectionsResults extends React.Component {
  props: Props;

  state: State = {
    fetching: false,
    routeResults: null,
    errorMessage: null,
  };

  async componentDidUpdate(prevProps) {
    if (this.props.fromAddress && this.props.toAddress && (prevProps.fromAddress !== this.props.fromAddress || prevProps.toAddress !== this.props.toAddress)) {
      this.setState({ fetching: true, errorMessage: null });
      await this.fetchResults();
      this.setState({ fetching: false });
    }
  }

  async fetchResults() {
    try {
      const routeResults: RouteResults = await queryRoutes(
        this.props.fromAddress.coords,
        this.props.toAddress.coords,
      );
      const noResults =
        routeResults.results['WALK'] === null &&
        routeResults.results['BICYCLE'] === null &&
        routeResults.results['ALL'] === null &&
        routeResults.results['CAR'] === null;

      if (noResults) {
        this.setState({errorMessage: i18n.t('reittiopas:noResultsMessage')});
      } else {
        this.setState({routeResults});
      }
    } catch (error) {
      this.setState({
        errorMessage: i18n.t('reittiopas:errorMessage'),
      });
    }
  }

  render() {
    if (this.state.errorMessage) {
      return <Error errorMessage={this.state.errorMessage} />;
    }
    if (this.state.fetching) {
      return (
        <div className={`${rootClassName}-spinner`}>
          <img src={spinnerIcon} />
        </div>
      );
    }
    if (!this.state.routeResults) {
      return null;
    } else {
      const {routeResults} = this.state;
      const results = routeResults.results;
      return (
        <div className={`${rootClassName}-results`}>
          <ul className={`${rootClassName}-results-list`}>
            <li>
              <div
                className={`${rootClassName}-results-meta ${rootClassName}-results-list-element`}
              >
                <div className={`${rootClassName}-results-meta-time`}>
                  {formatMetaDate(new Date(routeResults.date))}
                </div>
                <div className={`${rootClassName}-results-meta-emissions-wrapper`}>
                  <div
                    className={`${rootClassName}-results-meta-emissions ${rootClassName}-result-emissions-column`}
                  >
                    <sup>*</sup>CO₂
                  </div>
                  <div className={`${rootClassName}-result-link-icon`} />
                </div>
              </div>
            </li>
            {Object.keys(routeTypes).map(routeType => (
              <Result
                key={routeType}
                result={results[routeType]}
                routeType={routeType}
                routeTypeIcon={routeTypes[routeType].icon}
                toAddress={this.props.toAddress}
                fromAddress={this.props.fromAddress}
                date={routeResults.date}
              />
            ))}
          </ul>
          <div className={`${rootClassName}-results-info`}>
            <sup>*</sup>
            {i18n.t('reittiopas:info')}
          </div>
          <div className={`${rootClassName}-results-info-emissions`}>
            {i18n.t('reittiopas:infoZeroEmissions')}
          </div>
        </div>
      );
    }
  }
}

export default DirectionsResults;
