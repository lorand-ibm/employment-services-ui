import React, {Component} from 'react';

import i18n from '../root/i18n';
import Modal from '../modal/Modal';
import {setInfoPopupShown} from './infoPopupHelper';

type Props = {
  isOpen: Boolean,
};

class InfoPopup extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      open: props.isOpen || false
    }
  }

  close = () => {
    this.setState({open: false});
    setInfoPopupShown();
  }

  onClick = () => {
    setInfoPopupShown();
    window.location = i18n.t('infoPopup:url');
  }

  render() {
    return (
      <Modal className="info-popup" isOpen={this.state.open} close={this.close} contentLabel="info-popup" overlayClassName="overlay" shouldCloseOnOverlayClick={true}>
        <div className="info-popup__title">{i18n.t('infoPopup:title')}</div>
        <div className="info-popup__body">{i18n.t('infoPopup:text')}</div>
        <button className="info-popup__button" onClick={this.onClick}>{i18n.t('infoPopup:buttonText')}</button>
      </Modal>
    );
  };
};

export default InfoPopup;
