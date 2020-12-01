// @flow

import React from 'react';
import flow from 'lodash/flow';

import Modal from '../modal/Modal';
import EditProfile from './EditProfile';

import type {Style} from '$src/types';
import type {User} from './types';

type Props = {
  isOpen: boolean,
  close: Function,
  user: User,
  onSuccess?: Function,
  style?: Style,
};

const EditProfileModal = ({isOpen, close, user, onSuccess = () => {}}: Props) => (
  <Modal isOpen={isOpen} close={close}>
    <EditProfile onSuccess={onSuccess} user={user} initialValues={user} onCancel={close} />
  </Modal>
);

export default flow()(EditProfileModal);
