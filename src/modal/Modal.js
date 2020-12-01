// @flow

import React, {Component} from 'react';
import ReactModal from 'react-modal';
import omit from 'lodash/omit';
import get from 'lodash/get';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

type Props = {
  contentLabel?: string,
  close: Function,
  children?: Object,
  backgroundColor?: string,
  overlayStyle?: Object,
  contentStyle?: Object,
  headerStyle?: Object,
  closeType?: string,
  textColor?: 'white' | 'black',
  shouldCloseOnOverlayClick?: Boolean,
  t: Function,
};

ReactModal.setAppElement('#root');

class Modal extends Component {
  props: Props;

  static defaultProps = {
    textColor: 'white',
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('keydown', this.onDocumentKeyPress);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('keydown', this.onDocumentKeyPress);
    }
  }

  onDocumentKeyPress = (event: Event) => {
    // "Esc" key.
    if (get(event, 'keyCode') === 27) {
      this.props.close();
    }
  };

  getStyle = () => {
    const {overlayStyle, contentStyle} = this.props;
    return {
      overlay: overlayStyle,
      content: contentStyle,
    };
  };

  render() {
    const {t, children, close, contentLabel, closeType, textColor, headerStyle, xIconRowStyle,   ...props} = this.props;

    const modalClassNames = classNames(
      'modal',
      `modal--text-${textColor}`,
      {
        'modal--close-arrow': (closeType === 'arrow'),
      }
    );

    let fontAwesomeIcon = 'fa fa-times-thin';
    if (closeType === 'arrow') {
      fontAwesomeIcon = 'fa fa-chevron-left-thin';
    }

    return (
      <ReactModal
        overlayClassName={modalClassNames}
        className="modal__content"
        style={this.getStyle()}
        onRequestClose={close}
        contentLabel={contentLabel || ''}
        {...props}
      >
        <div className="modal__header" style={headerStyle}>
          <Row onClick={close} collapseOnMedium style={xIconRowStyle}>
            <Column medium={11} offsetOnMedium={1}>
              <div className="modal__close-wrapper">
                <button onClick={close} className="modal__close-button" aria-label={t('close')}>
                  <i className={classNames('modal__close-icon', fontAwesomeIcon)} />
                  <span className="modal__close-word">{t('close')}</span>
                </button>
              </div>
            </Column>
          </Row>
        </div>
        {children}
      </ReactModal>
    );
  }
}

export default flowRight(
  translate(['common']),
)(Modal);
