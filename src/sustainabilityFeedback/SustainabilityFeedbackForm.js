// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, getFormValues, getFormSyncErrors} from 'redux-form';
import flow from 'lodash/flow';
import lodashValues from 'lodash/values';
import {translate} from 'react-i18next';
import {Notification} from 'react-notification';
import {withRouter} from 'react-router';
import validator from 'validator';
import {Row, Column} from 'react-foundation';
import TextInput from '../form/TextInput';
import Checkbox from '../form/Checkbox';
import Button from '../button/Button';
import heart from '../../assets/images/ts-heart-animated-blue-wink.gif';
import {sendSustainabilityFeedback, sendSustainabilityFeedbackClear} from './actions';
import type {SustainabilityFeedback} from './types';
import {ContactForms} from '../constants';
import {get} from 'lodash';
import classNames from 'classnames';
import {getIsSending, getIsSent} from './selectors';

type Props = {
  handleSubmit: Function,
  sendSustainabilityFeedback: SustainabilityFeedback => mixed,
  sendSustainabilityFeedbackClear: Function,
  errors: Object,
  invalid: Boolean,
  submitFailed: Boolean,
  onSuccess: Function,
  closeAction?: Function,
  t: Function,
  location: Object,
  history: Function,
  isSent: Boolean,
  isSending: Boolean,
  values: Object,
};

const FORM_ID = ContactForms.SUSTAINABILITY_FEEDBACK_FORM;

class SustainabilityFeedbackForm extends Component {
  props: Props;

  static defaultProps = {
    isSent: false,
  };

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollIntoView(true);
    }
  }

  componentWillUnmount() {
    this.props.sendSustainabilityFeedbackClear();
  }

  handleSubmit = (values: Object) => {
    values.field_referring_page = global.IS_CLIENT ? window.location.href : '';
    values.contact_form = ContactForms.SUSTAINABILITY_FEEDBACK_FORM;
    if (!this.props.isSending) {
      this.props.sendSustainabilityFeedback(values);
    }
  };

  render() {
    const {t, isSent, isSending, values, closeAction} = this.props;

    // Field type props.
    const checkboxProps = {
      component: Checkbox,
      className: 'sustainability-feedback-form__checkbox',
    };
    const textInputProps = {
      type: 'textarea',
      component: TextInput,
      collapseMargins: true,
      className: 'sustainability-feedback-form__text',
      styles: {
        label: {color: 'inherit'},
        input: {color: 'inherit'},
      },
    };

    // "Service" section field props.
    const propsServiceName = {
      name: 'field_service_name',
      label: t('serviceNameLabel'),
      placeholder: t('serviceNamePlaceholder'),
    };
    const propsServiceHiddenFields = [
      {
        checkboxName: 'field_service_exemplary_check',
        checkboxLabel: t('serviceExemplaryCheckLabel'),
        textfieldName: 'field_service_exemplary_text',
        textfieldLabel: t('serviceExemplaryTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
      {
        checkboxName: 'field_service_problem_check',
        checkboxLabel: t('serviceProblemCheckLabel'),
        textfieldName: 'field_service_problem_text',
        textfieldLabel: t('serviceProblemTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
      {
        checkboxName: 'field_service_incomplete_check',
        checkboxLabel: t('serviceIncompleteCheckLabel'),
        textfieldName: 'field_service_incomplete_text',
        textfieldLabel: t('serviceIncompleteTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
    ];

    // "Criteria" section field props.
    const propsCriteriaHiddenFields = [
      {
        checkboxName: 'field_criteria_useful_check',
        checkboxLabel: t('criteriaUsefulCheckLabel'),
        textfieldName: 'field_criteria_useful_text',
        textfieldLabel: t('criteriaUsefulTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
      {
        checkboxName: 'field_criteria_clear_check',
        checkboxLabel: t('criteriaClearCheckLabel'),
        textfieldName: 'field_criteria_clear_text',
        textfieldLabel: t('criteriaClearTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
      {
        checkboxName: 'field_criteria_coverage_check',
        checkboxLabel: t('criteriaCoverageCheckLabel'),
        textfieldName: 'field_criteria_coverage_text',
        textfieldLabel: t('criteriaCoverageTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
      {
        checkboxName: 'field_criteria_reliable_check',
        checkboxLabel: t('criteriaReliableCheckLabel'),
        textfieldName: 'field_criteria_reliable_text',
        textfieldLabel: t('criteriaReliableTextLabel'),
        textfieldPlaceholder: t('tellMore'),
      },
    ];
    const propsCriteriaFeedback = {
      name: 'field_criteria_feedback',
      label: t('criteriaFeedbackLabel'),
      placeholder: t('criteriaFeedbackPlaceholder'),
    };

    // "Additions" section field props.
    const propsAdditionName = {
      name: 'field_addition_name',
      label: t('additionNameLabel'),
      placeholder: t('additionNamePlaceholder'),
    };
    const propsAdditionMessage = {
      name: 'field_addition_message',
      label: t('additionMessageLabel'),
      placeholder: t('additionMessagePlaceholder'),
    };

    // "Contact" section field props.
    const propsContactMail = {
      name: 'mail',
      label: t('contactMailLabel'),
      placeholder: t('contactMailPlaceholder'),
    };

    return (
      <div
        className={classNames('sustainability-feedback-form', {
          'sustainability-feedback-form--is-sent': isSent,
        })}
      >
        {isSent ? (
          <div>
            <div className="sustainability-feedback-form__scroll-anchor" ref={this.scrollRef}></div>
            <img className="sustainability-feedback-form__logo" alt="#ThinkSustainably logo" src={heart} />
            <h1 className="sustainability-feedback-form__heading">
              {t('sentHeading')}
            </h1>
            <p
              className="sustainability-feedback-form__paragraph"
              dangerouslySetInnerHTML={ {__html: t('sentInfo')} }
            ></p>
            <Button
              color={'primary'}
              onClick={closeAction}
            >
              {t('sentButtonReturn')}
            </Button>
          </div>
        ) : (
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <Row>
              <Column>
                <h1 className="sustainability-feedback-form__heading">{t('formHeading')}</h1>

                <div
                  className={classNames(
                    'sustainability-feedback-form__section',
                    'sustainability-feedback-form__section--first',
                  )}
                >
                  <p className="sustainability-feedback-form__paragraph">{t('formHelp')}</p>
                </div>

                <div className="sustainability-feedback-form__section">
                  <h2 className="sustainability-feedback-form__sub-heading">
                    {t('serviceHeading')}
                  </h2>
                  <Field {...propsServiceName} {...textInputProps} />
                  <div className="sustainability-feedback-form__checkbox-group">
                    {propsServiceHiddenFields.map((item, i) => (
                      <div key={i}>
                        <Field
                          name={item.checkboxName}
                          label={item.checkboxLabel}
                          {...checkboxProps}
                        />
                        {get(values, item.checkboxName) && (
                          <Field
                            name={item.textfieldName}
                            label={item.textfieldLabel}
                            placeholder={item.textfieldPlaceholder}
                            {...textInputProps}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sustainability-feedback-form__section">
                  <h2 className="sustainability-feedback-form__sub-heading">
                    {t('criteriaHeading')}
                  </h2>
                  <div className="sustainability-feedback-form__checkbox-group">
                    {propsCriteriaHiddenFields.map((item, i) => (
                      <div key={i}>
                        <Field
                          name={item.checkboxName}
                          label={item.checkboxLabel}
                          {...checkboxProps}
                        />
                        {get(values, item.checkboxName) && (
                          <Field
                            name={item.textfieldName}
                            label={item.textfieldLabel}
                            placeholder={item.textfieldPlaceholder}
                            {...textInputProps}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Field {...propsCriteriaFeedback} {...textInputProps} />
                </div>

                <div className="sustainability-feedback-form__section">
                  <h2 className="sustainability-feedback-form__sub-heading">
                    {t('additionHeading')}
                  </h2>
                  <p className="sustainability-feedback-form__paragraph">{t('additionHelp')}</p>
                  <Field {...propsAdditionName} {...textInputProps} />
                  <Field {...propsAdditionMessage} {...textInputProps} />
                </div>

                <div
                  className={classNames(
                    'sustainability-feedback-form__section',
                    'sustainability-feedback-form__section--last',
                  )}
                >
                  <Field {...propsContactMail} {...textInputProps} />
                </div>

                <div className="sustainability-feedback-form__buttons">
                  <Button
                    className="sustainability-feedback-form__send-button"
                    type={'submit'}
                    color={'primary'}
                    wide={true}
                    loading={isSending}
                  >
                    {t('formButtonSubmit')}
                  </Button>
                </div>

                <Notification
                  isActive={this.props.submitFailed && this.props.invalid}
                  message={t(lodashValues(this.props.errors)[0])}
                />
              </Column>
            </Row>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  values: getFormValues(FORM_ID)(state),
  errors: getFormSyncErrors(FORM_ID)(state),
  isSending: getIsSending(state),
  isSent: getIsSent(state),
});

export default flow(
  translate(['form', 'sustainabilityFeedbackForm']),
  connect(
    mapStateToProps,
    {sendSustainabilityFeedback, sendSustainabilityFeedbackClear},
  ),
  withRouter,
  reduxForm({
    form: FORM_ID,
    validate: values => {
      const errors = {};
      if (values.mail && !validator.isEmail(values.mail)) {
        errors.mail = 'fieldEmail';
      }
      return errors;
    },
  }),
)(SustainabilityFeedbackForm);
