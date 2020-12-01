// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, getFormValues} from 'redux-form';
import flow from 'lodash/flow';
import lodashValues from 'lodash/values';
import {translate} from 'react-i18next';
import {Notification} from 'react-notification';
import {Row, Column} from 'react-foundation';

import TextInput from '../form/TextInput';
import Button from '../button/Button';
import {updateUser} from './actions';

import type {User} from './types';
import * as authHelpers from './helpers';
import {getIsUpdating} from './selectors';

type Props = {
  handleSubmit: Function,
  onCancel: Function,
  updateUser: typeof updateUser,
  change: Function,
  initialValues: User,
  user: User,
  values: Object,
  errors: Object,
  isAuthenticated: boolean,
  invalid: boolean,
  submitFailed: boolean,
  isUpdating: boolean,
  t: Function,
};

const FORM = 'editProfile';

class EditProfile extends Component {
  props: Props;

  handleSubmit = (values: Object) => {
    this.props.updateUser(values);
  };

  render() {
    const {t, user, isUpdating} = this.props;

    return (
      <form className="edit-profile-form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Row>
          <Column large={7}>
            <h2>{authHelpers.getUserName(user)}</h2>
            <Field
              name={'displayName'}
              type={'text'}
              component={TextInput}
              label={t('displayNameFieldLabel')}
              placeholder={t('displayNameFieldPlaceholder')}
            />
            <div className="edit-profile-form__buttons">
              <Button
                className="edit-profile-form__save-button"
                type={'submit'}
                color={'customWhite'}
                wide={true}
                loading={isUpdating}
              >
                {t('saveButtonText')}
              </Button>
            </div>
            <Notification
              isActive={this.props.submitFailed || this.props.errors}
              message={t(lodashValues(this.props.errors)[0])}
            />
          </Column>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    values: getFormValues(FORM)(state),
    errors: state.form[FORM].syncErrors, // @todo Use getformsyncerrors()
    isUpdating: getIsUpdating(state),
  };
};

export default flow(
  translate(['form', 'profile']),
  connect(
    mapStateToProps,
    {updateUser},
  ),
  reduxForm({
    form: FORM,
    validate: values => {
      const errors = {};

      if (!values.displayName) {
        errors.title = 'fieldRequired';
      }

      return errors;
    },
  }),
)(EditProfile);
