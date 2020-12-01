// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import flow from 'lodash/flow';
import {translate} from 'react-i18next';
import {withRouter} from 'react-router';
import validator from 'validator';
import {Row, Column} from 'react-foundation';

import {Colors} from '../constants'

import TextInput from '../form/TextInput';
import Button from '../button/Button';
import {sendFeedback} from './actions';

import type {Feedback} from './types';
import {ContactForms} from '../constants';
import {getIsSending} from './selectors';

import heart from '../../assets/images/heart-icons/black/heart-1.svg';

type Props = {
  handleSubmit: Function,
  onCancel: Function,
  sendFeedback: Feedback => mixed,
  errors: Object,
  isAuthenticated: boolean,
  invalid: boolean,
  submitFailed: boolean,
  isSending: boolean,
  t: Function,
  location: Object,
};

const FORM = 'feedback';

class FeedbackForm extends Component {
  props: Props;

  handleSubmit = (values: Object) => {
    values.field_referring_page = (global.IS_CLIENT) ? window.location.href : '';
    values.contact_form = ContactForms.FEEDBACK_FORM;
    this.props.sendFeedback(values);
  };

  render() {
    const { t, isSending, errors, submitFailed } = this.props;

    if (this.props.submitSucceeded) {
      return (
        <Row>
          <Column large={7}>
            <div className="feedback-form">
              <img className="feedback-form__logo" alt="#ThinkSustainably logo" src={heart} />
              <h1 className="feedback-form__heading--thank-you">
                {t('sentHeading')}
            </h1>
              <p
                className="feedback-form__paragraph"
              >{t('sentInfo')}</p>
                <Button
                  className="feedback-form__send-button"
                  color={Colors.HEL_BLACK}
                  onClick={this.props.onCancel}
                >
                  {t('common:close')}
                </Button>
            </div>
          </Column>
        </Row>
      )
    }

    const messageSubmitFailed = submitFailed && errors && errors.message;
    const mailSubmitFailed = submitFailed && errors && errors.mail;

    return (
      <form className="feedback-form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Row>
          <Column large={7}>
            <h1 className="feedback-form__heading">{t('modalHeader')}</h1>
            <Field
              name={'message'}
              type={'textarea'}
              component={TextInput}
              label={t('messageFieldLabel')}
              placeholder={t('messageFieldPlaceholder')}
              errorLabel={messageSubmitFailed ? t(this.props.errors.message) : null}
            >
            </Field>
            <Field
              name={'mail'}
              type={'text'}
              component={TextInput}
              label={t('mailFieldLabel')}
              placeholder={t('mailFieldPlaceholder')}
              errorLabel={mailSubmitFailed ? t(this.props.errors.mail) : null}
            />
            <div className="feedback-form__buttons">
              <button
                className="button hollow button--wide feedback-form__send-button"
                type={'submit'}
                wide={true}
                loading={isSending}
              >
                {t('sendButtonText')}
              </button>
            </div>
          </Column>
        </Row>
      </form>
    );
  }
}

/*
 {
 "mail": "API@example.com",
 "message": "API message",
 "field_browser": "API browser",
 "field_device": "API device",
 "field_operating_system": "API OS",
 "field_referring_page": "example.com/API"
 }
 */

const mapStateToProps = state => {
  return (
    {
      errors: state.form[FORM].syncErrors, // @todo Use getformsyncerrors()
      submitSucceeded: state.form[FORM].submitSucceeded,
      isSending: getIsSending(state),
    })
};

export default flow(
  translate(['form', 'feedback']),
  connect(
    mapStateToProps,
    { sendFeedback },
  ),
  withRouter,
  reduxForm({
    form: FORM,
    validate: values => {
      const errors = {};

      if (!values.message) {
        errors.message = 'fieldRequired';
      }

      if (!values.mail) {
        errors.mail = 'fieldRequired';
      }

      if (values.mail && !validator.isEmail(values.mail)) {
        errors.mail = 'fieldEmail';
      }

      return errors;
    },
    onSubmitFail: error => {
      if (error.message) {
        setTimeout(() => {
          const messageInputElement = document.querySelector("#message");
          if (messageInputElement) {
            messageInputElement.focus();
          }
        }, 0)
        return;
      }
      if (error.mail) {
        setTimeout(() => {
          const mailInputElement = document.querySelector("#mail");
          if (mailInputElement) {
            mailInputElement.focus();
          }
        }, 0)
      }
    },
  }),
)(FeedbackForm);
