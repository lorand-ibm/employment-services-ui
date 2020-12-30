// @flow

import React, {Component} from 'react';
import classNames from 'classnames';

type Props = {
  children: Object,
  icon: String,
  title: String,
  sourceIcon: String,
  sourceText: String,
  sourceTitle: String,
};

class Accordion extends Component {
  props: Props;

  state = {
    open: false,
  };

  render() {
    let {icon, title, sourceIcon, sourceText, sourceTitle, children} = this.props;
    const {open} = this.state;

    title = this.props.paragraph.title;
    let body = this.props.paragraph.body;

    return (
      <div className='myhki-paragraph myhki-paragraph--accordion'>

        <div
          className={classNames('myhki-accordion', {
            'myhki-accordion--open': open,
            'accordion-border': false,
          })}
        >
          <button
            className="myhki-accordion__header"
            aria-expanded={this.state.open}
            onClick={() => {
              this.setState({open: !open});
            }}
          >
            {!!icon && (
              <div className="myhki-accordion__icon">
                <img src={icon} alt="" />
              </div>
            )}
            <div className="myhki-accordion__title">{title}</div>
          </button>
          <div className={classNames('myhki-accordion__body', {
            'myhki-accordion__body-hidden': !open,
          })}>
            <div className="myhki-accordion__body-wrapper">
              <div className="text" dangerouslySetInnerHTML={{__html: body}} />
              {(sourceIcon || sourceText || sourceTitle) && (
                <div className="myhki-accordion__source">
                  {!!sourceIcon && <img src={sourceIcon} className="myhki-accordion__source-icon" alt="" />}
                  <div className="myhki-accordion__source-text">
                    <div className="title">{'sourceTitle'}</div>

                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
        <div className="accordion-border"></div>
      </div>
    );
  }
}

export default Accordion;
