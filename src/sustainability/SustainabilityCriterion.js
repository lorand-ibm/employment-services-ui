import React, {Component} from 'react';
import classNames from 'classnames';
import {Column, Row} from 'react-foundation';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

type Props = {
  label: String,
  description: String,
  active: Boolean,
  t: Function,
};

class SustainabilityCriterion extends Component {
  props: Props;
  state = {
    open: false,
  };

  handleClick = () => {
    const {open} = this.state;
    this.setState({open: !open});
  };

  render() {
    const {t, label, description, active} = this.props;
    const {open} = this.state;
    const arrowIconClass = open ? 'fa fa-angle-up' : 'fa fa-angle-down';

    return (
      <div
        className={classNames(
          'sustainability-criterion',
          {'sustainability-criterion--open': open},
          {'sustainability-criterion--active': active},
          {'sustainability-criterion--inactive': !active},
        )}
      >
        <h3 className="sustainability-criterion__heading">
          <button onClick={this.handleClick} aria-expanded={open} className="sustainability-criterion__heading-button">
            <Row isCollapsed>
              <Column
                small={2}
                medium={1}
                offsetOnMedium={1}
                className="sustainability-criterion__column sustainability-criterion__column--centered"
              >
                {active && <i aria-hidden="true" className="sustainability-criterion__check-icon" />}
                <span className="sr-only">{active ? t('yes') : t('no')}</span>
              </Column>
              <Column small={8} className="sustainability-criterion__column">
                <div className="sustainability-criterion__label">{label}</div>
              </Column>
              <Column
                small={2}
                medium={1}
                className="sustainability-criterion__column sustainability-criterion__column--centered"
              >
                <i className={classNames(arrowIconClass, 'sustainability-criterion__arrow-icon')} />
              </Column>
            </Row>
          </button>
        </h3>
        {!!open && (
          <Row isCollapsed>
            <Column small={8} offsetOnSmall={2}>
              <div
                className="sustainability-criterion__body"
                dangerouslySetInnerHTML={{__html: description}}
              />
            </Column>
          </Row>
        )}
        <Row isCollapsed>
          <Column medium={10} offsetOnMedium={1}>
            <hr className="sustainability-criterion__horizontal-rule" />
          </Column>
        </Row>
      </div>
    );
  }
}

export default flowRight(translate(['common']))(SustainabilityCriterion);
