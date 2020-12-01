// @flow

import React from 'react';
import {connect} from 'react-redux';
import {NotificationStack} from 'react-notification';
import flow from 'lodash/flow';

import {popNotification} from './actions';

import type {RootState} from '../root/types';

type Props = {
  notifications: Array<string>,
  popNotification: Function,
};

const Notifications = ({notifications, popNotification}: Props) => (
  <NotificationStack
    notifications={notifications.map((notification, index) => ({
      message: notification,
      key: index,
    }))}
    dismissAfter={3000}
    onDismiss={popNotification}
  />
);

const mapStateToProps = (state: RootState) => ({
  notifications: state.notification.messages,
});

export default flow(
  connect(
    mapStateToProps,
    {popNotification},
  ),
)(Notifications);
