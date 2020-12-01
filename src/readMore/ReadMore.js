import React, {Component} from 'react';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

type Props = {
  className: String,
  children: Object,
  summary: mixed,
  open: Boolean,
  t: Function,
};

class ReadMore extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      open: props.open ? true : !props.summary,
    };
  }

  getLinkText = () => {
    const {t} = this.props;
    return this.state.open ? t('readLess') : t('readMore');
  };

  onReadMoreClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const {className, children, summary} = this.props;

    return (
      <div
        className={classNames('myhki-read-more', className, {
          'myhki-read-more--open': this.state.open,
        })}
      >
        {!!summary && (
          <div className="myhki-read-more__body-summary">
            <p>{summary}</p>
          </div>
        )}
        <div className="myhki-read-more__body">{children}</div>
        {!!summary && (
          <button className={classNames('myhki-read-more__read-more')} onClick={this.onReadMoreClick} aria-expanded={this.state.open}>
            {this.getLinkText()}
          </button>
        )}
      </div>
    );
  }
}

export default flowRight(translate(['common']))(ReadMore);
