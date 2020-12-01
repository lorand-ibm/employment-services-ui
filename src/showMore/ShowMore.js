import React, {Component} from 'react';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import ReactDOM from 'react-dom';
import lineHeight from 'line-height';

type Props = {
  className: String,
  children: Object,
  open: Boolean,
  onReadMoreClick: Function,
  lines: Number,
  t: Function,
  preserveSpace: Boolean,
};

class ShowMore extends Component {
  props: Props;

  static defaultProps = {
    lines: 4,
    preserveSpace: false,
    onReadMoreClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      overflows: false,
      bodyStyle: null,
      lineHeight: null,
    };
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      this.checkOverflow();
      this.calculateBodyStyle();
      if (global.IS_CLIENT) {
        window.addEventListener('resize', this.onResize);
      }
    }
  }

  onResize = () => {
    this.checkOverflow();
    this.calculateBodyStyle();
  };

  checkOverflow = () => {
    if (this.state.open) {
      return true;
    }

    const innerEl = ReactDOM.findDOMNode(this.bodyInner);

    if (!innerEl) {
      return;
    }

    const lh = lineHeight(innerEl);
    this.setState({
      overflows: innerEl.offsetHeight > lh * this.props.lines,
    });
  };

  getLinkText = () => {
    const {t} = this.props;
    return this.state.open ? t('readLess') : t('readMore');
  };

  onReadMoreClick = () => {
    this.props.onReadMoreClick(!this.state.open);
    this.setState({
      open: !this.state.open,
    });
  };

  calculateBodyStyle = () => {
    if (this.state.open) {
      return null;
    }

    if (!global.IS_CLIENT) {
      return null;
    }

    const outerEl = ReactDOM.findDOMNode(this.body),
      innerEl = ReactDOM.findDOMNode(this.bodyInner);

    if (!outerEl || !innerEl) {
      return null;
    }

    const lh = lineHeight(innerEl),
      height = this.props.lines * lh,
      style = {
        maxHeight: height,
      };

    if (this.props.preserveSpace) {
      style.minHeight = height;
    }

    this.setState({
      lineHeight: lh,
      bodyStyle: style,
    });
  };

  render() {
    const {className, children} = this.props,
      {open, overflows, bodyStyle, lineHeight} = this.state;

    return (
      <div
        className={classNames('myhki-show-more', className, {
          'myhki-show-more--open': open,
          'myhki-show-more--overflows': overflows,
        })}
      >
        <div
          className="myhki-show-more__body"
          ref={c => {
            this.body = c;
          }}
          style={!open ? bodyStyle : null}
        >
          <div
            className="myhki-show-more__body-inner"
            ref={c => {
              this.bodyInner = c;
            }}
          >
            {children}
          </div>
          <span
            className="myhki-show-more__line-end"
            style={lineHeight ? {height: lineHeight} : null}
          />
        </div>
        <button
          className={classNames('myhki-show-more__read-more')}
          onClick={this.onReadMoreClick}
          aria-expanded={open}
        >
          {this.getLinkText()}
        </button>
      </div>
    );
  }
}

export default flowRight(translate(['common']))(ShowMore);
