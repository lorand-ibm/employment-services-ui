// @flow

import React from 'react';
import flow from 'lodash/flow';

import Modal from '../modal/Modal';
import NewList from './NewList';

import type {Style} from '$src/types';

type Props = {
  isOpen: boolean,
  close: Function,
  onSuccess?: Function,
  style?: Style,
};

const NewListModal = ({isOpen, close, onSuccess = () => {}}: Props) => (
  <Modal isOpen={isOpen} close={close}>
    <NewList onSuccess={onSuccess} onCancel={close} />
  </Modal>
);

export default flow()(NewListModal);
