import React from 'react';
import propTypes from 'prop-types';

/*
 * Thank you information after questionnaire form
 * has been submitted
 */
const ThankYou = ({thankYou}) => (
  <>
    <div
      className="myhki-questionnaire__thankyou"
      dangerouslySetInnerHTML={{__html: thankYou}}
    />
  </>
);

ThankYou.propTypes = {
  thankYou: propTypes.string,
};

export default ThankYou;
