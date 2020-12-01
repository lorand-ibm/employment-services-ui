// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, getFormValues} from 'redux-form';
import flow from 'lodash/flow';
import remove from 'lodash/remove';
import lodashValues from 'lodash/values';
import {translate} from 'react-i18next';
import {Notification} from 'react-notification';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import {Row, Column} from 'react-foundation';

import {getIsAuthenticated} from '../auth/selectors';
import TextInput from '../form/TextInput';
import Switch from '../form/Switch';
import Button from '../button/Button';
import {updateList, deleteList} from './actions';
import {getIsUpdating, getIsDeleting} from './selectors';

import type {MyHelsinkiList} from './types';
import type {Content} from '../content/types';
import * as contentHelpers from '../content/helpers';

type Props = {
  handleSubmit: Function,
  onCancel: Function,
  updateList: typeof updateList,
  deleteList: typeof deleteList,
  change: Function,
  initialValues: MyHelsinkiList,
  list: Content,
  values: Object,
  errors: Object,
  isAuthenticated: boolean,
  invalid: boolean,
  submitFailed: boolean,
  isUpdating: boolean,
  isDeleting: boolean,
  t: Function,
};

const FORM = 'editList';

const DragHandle = SortableHandle(({ item, i, itemsLength }) => (
  <div tabIndex={0} className="edit-list-form__item-list-item-content" style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between', paddingRight: '20px' }}>
    <div>
      <span className="edit-list-form__item-list-item-subtitle">{item.subtitle}</span>
      <span className="edit-list-form__item-list-item-title">
        {item.title}
        <div className="visually-hidden">{`${i + 1} out of ${itemsLength} list items.`}</div>
      </span>
    </div>
    <div
      className="edit-list-form__item-list-item-sort-handle-handle"
      style={{ margin: 'auto 0' }}
    />
  </div>
));

const SortableItem = SortableElement(({ item, onRemove, t, i, itemsLength }) => (
  <li className="edit-list-form__item-list-item">
    <div className="edit-list-form__item-list-item-remove">
    </div>
    <DragHandle item={item} i={i} itemsLength={itemsLength} />
    <label htmlFor={"remove-button-" + i} className="visually-hidden">{t('removeItemFromList', { item: item.title, itemPosition: i + 1, itemsLength })}</label>
    <button
      id={"remove-button-" + i}
      className="edit-list-form__item-list-item-remove-button"
      onClick={() => {
        event.preventDefault();
        onRemove(item);
      }}
    />
  </li>
));

const SortableList = SortableContainer(({items, onRemoveItem, t}) => {
  return (
    <ul className="edit-list-form__item-list-items">
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} onRemove={onRemoveItem} t={t} i={index} itemsLength={items.length} />
      ))}
    </ul>
  );
});

class EditList extends Component {
  props: Props;

  state = {
    sorting: false,
    movedItemIndex: null,
    currentItemIndex: null,
  };

  handleSubmit = (values: Object) => {
    const isLoading = (this.props.isUpdating || this.props.isDeleting);
    if (!isLoading) {
      this.props.updateList(values);
    }
  };

  deleteList = () => {
    const {list} = this.props,
      listId = contentHelpers.getContentId(list),
      isLoading = (this.props.isUpdating || this.props.isDeleting);

    if (!isLoading) {
      this.props.deleteList(listId);
    }
  };

  /*
    Sorting has ended.
    For keyboard users: space pressed to indicate ending of movement.
  */
  onSortEnd = ({oldIndex, newIndex}) => {
    const {change, values} = this.props;

    change('items', arrayMove(values.items, oldIndex, newIndex));

    this.setState({
      sorting: false,
      movedItemIndex: newIndex,
      currentItemIndex: oldIndex,
    });
  };

  /*
    Single item sorting over: item has been moved to new position.
  */
  onSortOver = ({ newIndex }) => {
    this.setState({
      sorting: true,
      movedItemIndex: newIndex
    });
  };

  removeItem = item => {
    const {change, values} = this.props;

    remove(values.items, itemsItem => {
      return itemsItem.nid === item.nid;
    });

    change('items', values.items);
  };

  render() {
    const {t, values, isUpdating, isDeleting} = this.props;

    return (
      <form
        className="edit-list-form"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Row>
          <Column large={7}>
            <h2>{t('editList')}</h2>
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
            <div className="edit-list-form__field-row">
              <div className="edit-list-form__field-column">
                <span className={'edit-list-form__field-label'}>{t('privacyFieldLabel')}</span>
              </div>
              <div className="edit-list-form__field-column edit-list-form__field-column--small">
                <Field name={'privacy'} component={Switch} />
              </div>
            </div>
            {!!values.items.length && (
              <div className="edit-list-form__item-list" role="group" aria-labelledby="edit-list-title" aria-aria-describedby="edit-list-instructions" >
                <h3 id="edit-list-title" className="edit-list-form__item-list-title">
                  {t('editListItemsTitle')}
                </h3>
                <div id="edit-list-instructions" className="visually-hidden">{t('instructions', { itemsLength: values.items.length })}</div>
                <span className="visually-hidden" role="status" aria-atomic="true" aria-live="polite">
                  {this.state.sorting && t('status', { itemPosition: this.state.movedItemIndex + 1, itemsLength: values.items.length })}
                </span>
                <SortableList
                  items={values.items}
                  onSortEnd={this.onSortEnd}
                  onSortOver={this.onSortOver}
                  onRemoveItem={this.removeItem}
                  lockAxis="y"
                  useDragHandle={true}
                  t={t}
                />
              </div>
            )}
            <div className="edit-list-form__buttons">
              <Button
                className="edit-list-form__save-button"
                type={'submit'}
                color={'customWhite'}
                wide={true}
                loading={isUpdating}
                disabled={isUpdating || isDeleting}
              >
                {t('saveButtonText')}
              </Button>
              <Button
                className="edit-list-form__delete-button"
                color={'red'}
                borderless={true}
                onClick={this.deleteList}
                loading={isDeleting}
                disabled={isDeleting || isUpdating}
              >
                <i className="edit-list-form__delete-icon fa fa-trash" />
                {t('deleteButtonText')}
              </Button>
            </div>
            <Notification
              isActive={this.props.submitFailed && this.props.invalid}
              message={t(lodashValues(this.props.errors)[0])}
            />
          </Column>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  isUpdating: getIsUpdating(state),
  isDeleting: getIsDeleting(state),
  values: getFormValues(FORM)(state),
  errors: state.form[FORM].syncErrors, // @todo Use getformsyncerrors()
});

export default flow(
  translate(['form', 'myHelsinkiList']),
  connect(
    mapStateToProps,
    {updateList, deleteList},
  ),
  reduxForm({
    form: FORM,
    validate: values => {
      const errors = {};

      if (!values.title) {
        errors.title = 'fieldRequired';
      }

      return errors;
    },
  }),
)(EditList);
