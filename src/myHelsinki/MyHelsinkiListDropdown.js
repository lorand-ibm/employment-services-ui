import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import has from 'lodash/has';
import get from 'lodash/get';
import values from 'lodash/values';

import MenuLink from '../app/topNavigation/MenuLink';
import MyHelsinkiListDropdownMenu from './MyHelsinkiListDropdownMenu';
import OnboardingModal from './OnboardingModal';
import {getIsAuthenticated, getUser} from '../auth/selectors';
import {getUsersLists, getIsFetching} from '../myHelsinki/selectors';
import {fetchUsersLists, addItemToList} from '../myHelsinki/actions';
import type {MyHelsinkiListMap} from './types';
import type {User} from '../auth/types';
import * as myHelsinkiHelpers from './helpers';
import * as contentHelpers from '../content/helpers';
import * as helpers from '../helpers';
import i18n from '../root/i18n';

type Props = {
  className: String,
  usersLists: MyHelsinkiListMap,
  isAuthenticated: Boolean,
  isFetching: Boolean,
  fetchUsersLists: typeof fetchUsersLists,
  addItemToList: typeof addItemToList,
  location: Object,
  router: Object,
  user: User,
};

type State = {
  open: boolean,
};

class MyHelsinkiListDropdown extends Component {
  props: Props;

  state: State = {
    open: false,
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  componentDidMount() {
    const {location} = this.props;

    if (has(location, 'query.chooseList') || has(location, 'query.addToList')) {
      this.open();

      this.setState({
        openedViaQuery: true,
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const {location} = this.props,
      {location: nextLocation} = nextProps;

    if (
      ((!has(location, 'query.chooseList') && has(nextLocation, 'query.chooseList')) ||
        (!has(location, 'query.addToList') && has(nextLocation, 'query.addToList'))) &&
      !this.state.open
    ) {
      this.open();

      this.setState({
        openedViaQuery: true,
      });
    }
  }

  open = () => {
    const {user, isAuthenticated, fetchUsersLists} = this.props,
      {open} = this.state;

    if (isAuthenticated && !open) {
      fetchUsersLists(user.uid);
    }

    this.setState({
      open: true,
    });
  };

  close = () => {
    helpers.hideChooseListModal();
    helpers.hideAddToListModal();

    this.setState({
      open: false,
      openedViaQuery: false,
    });
  };

  onDocumentClick = event => {
    const target = event.target,
      el = ReactDOM.findDOMNode(this);

    if (this.state.openedViaQuery) {
      this.setState({
        openedViaQuery: false,
      });

      return;
    }

    if (this.state.open && target !== el && !el.contains(target)) {
      this.close();
    }
  };

  onLinkClick = () => {
    const {open} = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  };

  onItemClick = item => {
    console.log('MyHelsinkiListDropdown.onItemClick(%o)', item);
    const {router, location} = this.props;

    const itemId = get(location, 'query.addToList');
    if (itemId) {
      this.props.addItemToList({
        list: myHelsinkiHelpers.getListFromContent(item),
        itemId: itemId,
      });
    } else {
      router.push(contentHelpers.getContentPath(item));
    }

    this.close();
  };

  getMenu = () => {
    const {isFetching} = this.props,
      {open} = this.state;

    return (
      <MyHelsinkiListDropdownMenu
        open={open && !isFetching}
        items={values(this.props.usersLists)}
        onItemClick={this.onItemClick}
        onCloseClick={this.close}
      />
    );
  };

  getOnboardingModal = () => {
    const {isFetching, usersLists} = this.props,
      {open} = this.state,
      lists = values(usersLists);

    if (isFetching || !open || lists.length > 0) {
      return null;
    }

    return (
      <OnboardingModal
        onClose={() => {
          this.close();
        }}
      />
    );
  };

  render() {
    const {className, isFetching} = this.props;

    return (
      <div
        className={classNames('my-helsinki-list-dropdown', className, {
          'my-helsinki-list-dropdown--loading': isFetching,
          'my-helsinki-list-dropdown--open': this.state.open,
        })}
      >
        <MenuLink
          name="likes"
          text={i18n.t('myHelsinkiList:myListsTitle')}
          onClick={this.onLinkClick}
          open={this.state.open}
        />
        <i className="my-helsinki-list-dropdown__loader fa fa-circle-o-notch fa-spin fa-fw" />
        {this.getMenu()}
        {this.getOnboardingModal()}
      </div>
    );
  }
}

export default flowRight(
  translate(['myHelsinkiListDropdown']),
  withRouter,
  connect(
    state => ({
      usersLists: getUsersLists(state),
      isAuthenticated: getIsAuthenticated(state),
      user: getUser(state),
      isFetching: getIsFetching(state),
    }),
    {fetchUsersLists, addItemToList},
  ),
)(MyHelsinkiListDropdown);
