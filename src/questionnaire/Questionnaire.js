import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import get from 'lodash/get';
import classNames from 'classnames';
import ConsentDescription from './ConsentDescription';
import Form from './Form';
import ThankYou from './ThankYou';
import {createEmail, sendEmail} from './email';
import i18n from '../root/i18n';

type Props = {
  t: any,
  className: String,
  description: String,
  thankYou: String,
  submitEmail: String,
  buttonLabel: String,
  consentShort: String,
  consentLong: ?String,
  questionList: Array,
};

class Questionnaire extends Component {
  props: Props;

  static defaultProps = {
    buttonLabel: 'Send',
    thankYou: 'Thank you!',
  }

  constructor(props) {
    super(props);
    this.state = {
      consentAccepted: false,
      viewConsentDescription: false,
      answers: {},
      mandatoriesFilled: false,
      submitted: false,
      error: '',
    };
  }

  setConsentAccepted = (value) => {
    this.setState({consentAccepted: value});
  }
  setSubmitted = () => {
    this.setState({submitted: true});
  }
  setViewConsentDescription = () => {
    this.setState({viewConsentDescription: true});
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {answers, consentAccepted} = this.state;
    const {consentShort, consentLong, submitEmail} = this.props;

    const emailBody = createEmail(answers, consentAccepted, consentShort, consentLong);

    const status = await sendEmail(submitEmail, emailBody);

    if (status.data === 'ok') {
      this.setState({error: ''});
      this.setSubmitted();
      window.scrollTo(0,0);
    } else {
      this.setState({error: `${i18n.t('questionnaire:sendFailed')}`});
    }
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str.trim()));
  }

  isMandatoriesFilled = (answers) => {
    const questionList = [].concat(this.props.questionList, []); // ensure questionList is array
    const unanswered = questionList
      .filter(q => q.mandatory) // is mandatory
      .map(q => q.label) // map to question name
      .filter(q => this.isBlank(answers[q])); // is empty

    return unanswered.length === 0;
  }

  handleAnswerChange = (event) => {
    const newAnswers = {
      ...this.state.answers,
      [event.target.name]: event.target.value,
    };
    this.setState({
      answers: newAnswers,
      mandatoriesFilled: this.isMandatoriesFilled(newAnswers),
    });
  };

  render = () => {
    const {t, className, description, submitEmail, buttonLabel, consentShort, consentLink, consentLong, thankYou, questionList, colorScheme} = this.props;
    const {consentAccepted, mandatoriesFilled} = this.state;
    const errorClasses = classNames({
      'myhki-questionnaire__error': true,
      'myhki-questionnaire__error--invisible': !this.state.error,
    })

    const formView = (
      <>
        <Form
          description={description}
          questionList={questionList}
          consentShort={consentShort}
          consentAccepted={consentAccepted}
          setConsentAccepted={this.setConsentAccepted}
          mandatoriesFilled={mandatoriesFilled}
          handleAnswerChange={this.handleAnswerChange}
          buttonLabel={buttonLabel}
          handleSubmit={this.handleSubmit}
        />
        <div className={errorClasses}>
          {this.state.error}
        </div>
        <ConsentDescription
          consentLong={consentLong}
          consentLink={consentLink}
        />
      </>
    )

    const view = this.state.submitted
      ? <ThankYou thankYou={thankYou}
/>
      : formView;

    const style = {
      background: get(colorScheme, 'background'),
      color: get(colorScheme, 'text'),
    };

    return (
      <div className="myhki-questionnaire" style={style}>
        { view }
      </div>
    );
  }
}

export default flowRight(
  translate(['common']),
  withRouter,
)(Questionnaire);
