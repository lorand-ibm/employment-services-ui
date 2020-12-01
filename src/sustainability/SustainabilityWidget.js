import React, {Component} from 'react';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import {browserHistory, withRouter} from 'react-router';
import {has, get} from 'lodash';
import Modal from '../modal/Modal';
import SustainabilityDetails from './SustainabilityDetails';
import {Colors} from '../constants';
import heartIcon from '../../assets/images/ts-heart-black.svg';
import arrowIcon from '../../assets/images/ico-link-black.svg';

type Props = {
  className?: String,
  status: Boolean,
  details: Object,
  t: Function,
  location: String,
};

class SustainabilityWidget extends Component {
  props: Props;
  activeCriterionCount: Number;
  totalCriterionCount: Number;
  criterionTypes: Object;
  summaryText: String;

  constructor(props) {
    super(props);

    const {details} = props;
    this.activeCriterionCount = get(details, 'active_criterion_count', null);
    this.totalCriterionCount = get(details, 'service_type.total_criterion_count', null);
    this.criterionTypes = get(details, 'criterion_types', null);
    this.summaryText = get(details, 'summary', null);

    const {location} = props;
    this.state = {
      widgetVisible: this.getWidgetVisibility(props),
      overlayVisible: has(location, 'query.criteria'),
    };
  }

  /**
   * Get widget visibility.
   *
   * Widget is visible only if all the required data exists.
   *
   * @returns {boolean}
   */
  getWidgetVisibility({status}) {
    return (
      status &&
      this.activeCriterionCount &&
      this.totalCriterionCount &&
      this.criterionTypes &&
      this.summaryText
    );
  }

  showOverlay = () => {
    this.setState({overlayVisible: true});
    const location = this.props.location;
    const query = get(location, 'query');
    browserHistory.push(
      Object.assign(location, {
        query: Object.assign(query, {criteria: null}),
      }),
    );
  };

  hideOverlay = () => {
    this.setState({overlayVisible: false});
    const location = this.props.location;
    const query = get(location, 'query');
    delete query.criteria;
    browserHistory.push(Object.assign(location, {query}));
  };

  render() {
    // Render nothing if the widget doesn't have anything to show.
    if (!this.getWidgetVisibility(this.props)) {
      return null;
    }

    const {className, details, t} = this.props;
    const {overlayVisible} = this.state;
    const {activeCriterionCount, totalCriterionCount} = this;
    const modalContentStyle = {
      backgroundColor: 'white',
      color: Colors.HEL_BLACK,
      padding: '6rem 0 4rem',
    };

    return (
      <div className={classNames(className, 'sustainability-widget')}>
        <button className="sustainability-widget__link" onClick={this.showOverlay}>
          <div className="sustainability-widget__content-wrapper">
            <img
              alt="#ThinkSustainably logo"
              src={heartIcon}
              className="sustainability-widget__heart"
            />
            <div className="sustainability-widget__label">
              {t('criterionCountSummary', {
                active: activeCriterionCount,
                total: totalCriterionCount,
              })}
            </div>
            <div className="sustainability-widget__arrow">
              <img src={arrowIcon} alt="" />
            </div>
          </div>
        </button>
        <Modal
          isOpen={overlayVisible}
          close={this.hideOverlay}
          closeType="arrow"
          contentStyle={modalContentStyle}
        >
          <SustainabilityDetails details={details} />
        </Modal>
      </div>
    );
  }
}

export default flowRight(
  translate(['sustainabilityWidget']),
  withRouter,
)(SustainabilityWidget);
