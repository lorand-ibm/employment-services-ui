import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';
import i18n from '../root/i18n';
import {createAddressStr} from './helpers';

import DirectionsSearch from './DirectionsSearch';
import DirectionsResults from './DirectionsResults';
import DirectionsMap from './DirectionsMap';

import reittiopasIcoLogo from '../../assets/images/reittiopas/ico-logo.svg';
import reittiopasIcoFromLoc from '../../assets/images/reittiopas/ico-from-location.svg';
import reittiopasIcoToLoc from '../../assets/images/reittiopas/ico-to-location.svg';
import reittiopasIcoLoc from '../../assets/images/reittiopas/ico-location.svg';

import {Address, RouteResults, Coords2} from './types';

const rootClassName = 'myhki-directions-block';

interface Props {
  addressObj: any;
  coordinates: Coords2;
  setDestManually?: boolean;
}

interface State {
  fromAddress: Address;
  toAddress: Address;
  reittiopasResults: RouteResults;
  setDestManually: boolean;
}

const DEFAULT_TO_ADDRESS: Address = {
  name: null,
  localadmin: 'Helsinki',
  coords: {
    lat: 60.171099,
    lon: 24.941472,
  },
};

class DirectionsBlock extends React.Component {
  props: Props;

  state: State = {
    fromAddress: null,
    toAddress: null,
    reittiopasResults: null,
    setDestManually: false,
  };

  componentDidMount() {
    const {coordinates, addressObj} = this.props;
    const toAddress: Address = coordinates
      ? {
          name: addressObj.streetAddress,
          localadmin: addressObj.locality,
          coords: {
            lat: coordinates.lat,
            lon: coordinates.lng,
          },
        }
      : null;
    this.setState({toAddress, setDestManually: !toAddress || this.props.setDestManually});
  }

  setFromAddress(fromAddress: Address) {
    this.setState({fromAddress});
  }

  setToAddress(toAddress: Address) {
    this.setState({toAddress});
  }

  render() {
    const {fromAddress, toAddress} = this.state;

    const addressStr = createAddressStr(toAddress);

    const fullHeight = !!fromAddress;

    return (
      <div className={`${rootClassName}`}>
        <Row collapseOnMedium>
          <Column
            small={12}
            medium={6}
            orderOnSmall={2}
            orderOnMedium={1}
            className={`${rootClassName}__info-column${
              fullHeight ? ' ' + rootClassName + '__info-column--full-height' : ''
            }`}
          >
            <div className={`${rootClassName}__hsl-search-wrapper`}>
              <div className={`${rootClassName}__hsl-search-container`}>
                <div>
                  <h2 className={`${rootClassName}__hsl-search-container-title`}>
                    {i18n.t('reittiopas:title')}
                  </h2>
                  <div className={`${rootClassName}__hsl-search-container-title-icon`}>
                    <img src={reittiopasIcoLogo} />
                  </div>
                </div>
                <DirectionsSearch
                  setFromAddress={this.setFromAddress.bind(this)}
                  placeholder={i18n.t('reittiopas:searchOriginPlaceholder')}
                  inputIco={reittiopasIcoFromLoc}
                  resultIco={reittiopasIcoLoc}
                />
                <div>
                  <div className="react-autosuggest__input-icon">
                    <img src={reittiopasIcoToLoc} />
                  </div>
                  {this.state.setDestManually ? (
                    <DirectionsSearch
                      setFromAddress={this.setToAddress.bind(this)}
                      placeholder={i18n.t('reittiopas:searchDestinationPlaceholder')}
                      inputIco={reittiopasIcoToLoc}
                      resultIco={reittiopasIcoLoc}
                    />
                  ) : (
                    <input
                      type="text"
                      className="react-autosuggest__input"
                      value={addressStr ? addressStr : ''}
                      disabled={true}
                      style={{cursor: 'auto', backgroundColor: '#fefefe'}}
                    />
                  )}
                </div>
              </div>
            </div>
            <DirectionsResults toAddress={toAddress} fromAddress={fromAddress} />
          </Column>
          <DirectionsMap
            toAddress={toAddress}
            fromAddress={this.state.fromAddress}
            addressStr={addressStr}
            defaultToAddress={DEFAULT_TO_ADDRESS}
          />
        </Row>
      </div>
    );
  }
}

export default withRouter(DirectionsBlock);
