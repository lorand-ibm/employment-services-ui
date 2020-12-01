// @flow

import React from 'react';
import flow from 'lodash/flow';

import Modal from '../modal/Modal';
import EditList from './EditList';

import type {Style} from '$src/types';
import type {MyHelsinkiList} from './types';
import * as myHelsinkiHelpers from './helpers';

type Props = {
  isOpen: boolean,
  close: Function,
  list: MyHelsinkiList,
  onSuccess?: Function,
  style?: Style,
};

const EditListModal = ({isOpen, close, list, onSuccess = () => {}}: Props) => (
  <Modal isOpen={isOpen} close={close}>
    <EditList
      onSuccess={onSuccess}
      list={list}
      onCancel={close}
      initialValues={myHelsinkiHelpers.getListFromContent(list)}
    />
  </Modal>
);

export default flow()(EditListModal);
