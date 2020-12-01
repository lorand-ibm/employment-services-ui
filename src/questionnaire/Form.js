import React from 'react';
import propTypes from 'prop-types';

import Checkbox from '../form/Checkbox';
import Button from '../button/Button';

/*
 * Questionnaire Form
 *
 * Input boxes (questions)
 * and consent checkbox and text
 * and submit button
 *
 * Input boxes are created based on flags:
 * - m for mandatory
 * - h for half half width
 * - a for textarea input (instead of one line)
 */
const Form = ({questionList, description, consentShort, consentAccepted, setConsentAccepted, mandatoriesFilled, handleAnswerChange, buttonLabel, handleSubmit}) => {

  const toUI = (q) => {
    let inputField = [];
    const placeholder = q.mandatory ? `${q.label} *` : q.label;
    if (q.area) {
      inputField = <textarea type="text" rows="5" name={q.label} id={q.label} onChange={handleAnswerChange} placeholder={placeholder} required={q.mandatory} />
    } else {
      inputField = <input type="text" name={q.label} id={q.label} onChange={handleAnswerChange} placeholder={placeholder} required={q.mandatory} />
    }

    const className = q.halfWidth
      ? 'myhki-questionnaire__form--halfwidth'
      : 'myhki-questionnaire__form--fullwidth';

    return (
      <div key={q.label} className={className}>
        {inputField}
      </div>
    );
  }

  const uiQuestions = questionList.map(toUI);
  const disabled = !consentAccepted || !mandatoriesFilled;

  return (
    <>
      <div
        className="myhki-questionnaire__description"
        dangerouslySetInnerHTML={{__html: description}}
      />

      <form action="" className="myhki-questionnaire__form">
        {uiQuestions}
      </form>

      <div className="myhki-questionnaire__consent-and-submit">
        <Checkbox
          className="myhki-questionnaire__consent"
          label={consentShort}
          input={{
            onChange: (event) => setConsentAccepted(event),
            value: consentAccepted,
          }}
          meta />
        <Button
          className="myhki-questionnaire__submit-button button"
          onClick={handleSubmit}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
      </div>
    </>
  );
}

Form.propTypes = {
  questionList: propTypes.arrayOf(propTypes.object).isRequired,
  description: propTypes.string.isRequired,
  consentShort: propTypes.string,
  consentAccepted: propTypes.bool,
  setConsentAccepted: propTypes.func,
  handleAnswerChange: propTypes.func.isRequired,
  buttonLabel: propTypes.string.isRequired,
  handleSubmit: propTypes.func.isRequired,
}

Form.defaultProps = {
  consentShort: undefined,
  consentAccepted: false,
  setConsentAccepted: () => {},
}

export default Form;
