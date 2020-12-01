import React from 'react';
import propTypes from 'prop-types';
/*
 * Expandable long consent description
 */
class ConsentDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      descriptionVisible: false
    }
  }

  setDescriptionVisible = () => {
    this.setState({
      ...this.state,
      descriptionVisible: true,
    });
  }

  render () {
    const {consentLong, consentLink} = this.props;

    let consentDescription = [];

    if (consentLong) {
      const buttonVisible = !this.state.descriptionVisible;
      const descriptionClassname = this.state.descriptionVisible
        ? 'myhki-questionnaire__consent-long'
        : 'myhki-questionnaire__consent-long--invisible';
      const buttonClassname = buttonVisible
        ? 'myhki-questionnaire__consent-button'
        : 'myhki-questionnaire__consent-long--invisible';

      consentDescription = (
        <div className="myhki-questionnaire__consent-description">
          <button className={buttonClassname} onClick={this.setDescriptionVisible} type="button">
            {consentLink}
          </button>
          <div className={descriptionClassname}>
            {consentLong}
          </div>
        </div>
      );
    }

    return consentDescription;
  }
}

ConsentDescription.propTypes = {
  consentLong: propTypes.string,
  consentLink: propTypes.string,
};

ConsentDescription.defaultProps = {
  consentLong: undefined,
  consentLink: undefined,
};

export default ConsentDescription;
