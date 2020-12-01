import React from 'react';
import Autosuggest from 'react-autosuggest';

import {getAddress} from './reittiopas/reittiopasRoutes';
import {Address, DigitransitAddress} from './types';

const rootClassName = 'react-autosuggest__input';

const FETCH_WAIT_INTERVAL = 500;

const getSuggestionValue = (suggestion: Address) =>
  suggestion.name + (suggestion.localadmin ? ', ' + suggestion.localadmin : '');

const renderInputComponent = inputProps => (
  <div>
    <div className={`${rootClassName}-icon`}>
      <img src={inputProps.icon} />
    </div>
    <input {...inputProps} />
  </div>
);

interface Props {
  placeholder: string;
  resultIco: string;
  inputIco: string;
  setFromAddress(address: Address): void;
}

interface State {
  value: string;
  suggestions: Address[];
  selectedSuggestion: Address;
}

class DirectionsSearch extends React.Component {
  props: Props;

  state: State = {
    value: '',
    suggestions: [],
    selectedSuggestion: null,
  };

  fetchTimer = null;

  renderSuggestion(suggestion: Address) {
    return (
      <div>
        <div className={`${rootClassName}-icon`}>
          <img src={this.props.resultIco} />
        </div>
        <div className={`${rootClassName}-address`}>
          <div className={`${rootClassName}-address-name`}>{suggestion.name}</div>
          <div className={`${rootClassName}-address-localadmin`}>{suggestion.localadmin}</div>
        </div>
      </div>
    );
  }

  renderSuggestionsContainer({containerProps, children, query}) {
    return <div {...containerProps}>{children}</div>;
  }

  onSuggestionsFetchRequested({value, reason}) {
    if ((reason !== 'input-changed' && reason !== 'input-focused') || value === '') return;

    clearTimeout(this.fetchTimer);
    this.fetchTimer = setTimeout(this.fetchSuggestions.bind(this), FETCH_WAIT_INTERVAL, value);
  }

  fetchSuggestions(value: string) {
    getAddress(value).then(addresses => {
      this.setState({
        suggestions: addresses,
      });
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  onChange = (_event, {newValue}) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionSelected(_event, {suggestion}: {suggestion: DigitransitAddress}) {
    this.setState({suggestions: []});
    this.props.setFromAddress({
      ...suggestion,
      coords: {lat: parseFloat(suggestion.coords.lat), lon: parseFloat(suggestion.coords.lon)},
    });
  }

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange.bind(this),
      icon: this.props.inputIco,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        renderInputComponent={renderInputComponent}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
        focusInputOnSuggestionClick={false}
      />
    );
  }
}

export default DirectionsSearch;
