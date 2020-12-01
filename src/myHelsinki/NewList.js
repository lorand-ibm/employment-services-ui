// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import get from 'lodash/get';
import flow from 'lodash/flow';
import values from 'lodash/values';
import {translate} from 'react-i18next';
import {Notification} from 'react-notification';
import {Row, Column} from 'react-foundation';
import classNames from 'classnames';
import {withRouter} from 'react-router';

import {getIsAuthenticated} from '../auth/selectors';
import {getIsCreating} from './selectors';
import TextInput from '../form/TextInput';
import Switch from '../form/Switch';
import Button from '../button/Button';
import {createNewList} from './actions';

import type {MyHelsinkiList} from './types';

type Props = {
  handleSubmit: Function,
  onCancel: Function,
  createNewList: MyHelsinkiList => mixed,
  errors: Object,
  isAuthenticated: boolean,
  isCreating: boolean,
  invalid: boolean,
  submitFailed: boolean,
  t: Function,
  location: Object,
};

const FORM = 'newList';

class NewList extends Component {
  props: Props;

  handleSubmit = (values: Object) => {
    const {location} = this.props,
      nid = get(location, 'query.createList');

    if (nid) {
      values.items = [nid];
    }
    this.props.createNewList(values);
  };

  render() {
    const {t, isCreating} = this.props;

    return (
      <form
        className={classNames('new-list-form', {
          'new-list-form--creating': isCreating,
        })}
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Row>
          <Column large={7}>
            <h2>{t('newList')}</h2>
            <Field
              name={'title'}
              type={'text'}
              component={TextInput}
              label={t('titleFieldLabel')}
              placeholder={t('titleFieldPlaceholder')}
            />
            <Field
              name={'description'}
              type={'textarea'}
              component={TextInput}
              label={t('descriptionFieldLabel')}
              placeholder={t('descriptionFieldPlaceholder')}
            />
            <div className="new-list-form__field-row">
              <div className="new-list-form__field-column">
                <span className={'new-list-form__field-label'}>{t('privacyFieldLabel')}</span>
              </div>
              <div className="new-list-form__field-column new-list-form__field-column--small">
                <Field name={'privacy'} component={Switch} />
              </div>
            </div>
            <div className="new-list-form__buttons">
              <Button
                className="new-list-form__create-button"
                type={'submit'}
                color={'customWhite'}
                wide={true}
                loading={isCreating}
              >
                {t('createButtonText')}
              </Button>
              <Button
                className="new-list-form__cancel-button"
                color="white"
                borderless={true}
                onClick={this.props.onCancel}
              >
                {t('cancelButtonText')}
              </Button>
            </div>
            <Notification
              isActive={this.props.submitFailed && this.props.invalid}
              message={t(values(this.props.errors)[0])}
            />
          </Column>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isAuthenticated: getIsAuthenticated(state),
  errors: state.form[FORM].syncErrors, // @todo Use getformsyncerrors()
});

export default flow(
  withRouter,
  translate(['form', 'myHelsinkiList']),
  connect(
    mapStateToProps,
    {createNewList},
  ),
  reduxForm({
    form: FORM,
    initialValues: {
      privacy: false,
    },
    validate: values => {
      const errors = {};

      if (!values.title) {
        errors.title = 'fieldRequired';
      }

      return errors;
    },
  }),
)(NewList);
