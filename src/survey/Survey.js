import React from 'react';
import Modal from 'react-modal';
import i18n from '../root/i18n';

type Props = {
  isOpen: boolean,
  onAgree: Function,
  onClose: Function,
  onSkip: Function,
};

const Survey = ({isOpen, onAgree, onClose, onSkip}: Props) => (
  <Modal className="survey" isOpen={isOpen} contentLabel="survey" overlayClassName="overlay">
    <div className="survey__title">
      <a onClick={onClose} />
      <p>{i18n.t('survey:title')}</p>
    </div>
    <div className="survey__body">{i18n.t('survey:body')}</div>
    <div className="survey__buttons">
      <button onClick={onAgree}>{i18n.t('survey:agree')}</button>
      <button onClick={onSkip}>{i18n.t('survey:dismiss')}</button>
    </div>
  </Modal>
);

export default Survey;
