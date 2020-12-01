// @flow

import React from 'react';
import flow from 'lodash/flow';

import Modal from '../modal/Modal';
import FeedbackForm from './FeedbackForm';
import {Colors} from '../constants';

import type {Style} from '$src/types';

type Props = {
  isOpen: boolean,
  close: Function,
  onSuccess?: Function,
  style?: Style,
};

const FeedbackModal = ({isOpen, close, onSuccess = () => {}}: Props) => (
  <Modal isOpen={isOpen} close={close} contentStyle={{color: Colors.HEL_BLACK, backgroundColor: Colors.LIGHT_SILVER}}>
    <FeedbackForm onSuccess={onSuccess} onCancel={close} />
  </Modal>
);

export default flow()(FeedbackModal);
