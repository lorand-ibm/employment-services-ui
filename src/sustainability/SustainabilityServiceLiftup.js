import React, {Component} from 'react';
import classNames from 'classnames';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import {browserHistory, withRouter} from 'react-router';
import get from 'lodash/get';
import Modal from '../modal/Modal';
import SustainabilityDetails from './SustainabilityDetails';
import {Colors} from '../constants';
import {LazyBackground} from '../lazyImage/LazyImage';
import {Row, Column} from 'react-foundation';

type Props = {
  className?: String,
  details: Object,
  flip: Boolean,
  image: String,
  text: String,
  title: String,
  t: Function,
  location: String,
};

class SustainabilityServiceLiftup extends Component {
  props: Props;
  queryParamKey: String;
  serviceTypeId: String;
  totalCriterionCount: Number;
  criterionTypes: Object;
  summaryText: String;

  static defaultProps = {
    flip: false,
  }

  constructor(props) {
    super(props);

    const {details} = props;
    const serviceTypeId = get(details, 'service_type.id', null);
    this.queryParamKey = 'sustainability_details';
    this.serviceTypeId = serviceTypeId;
    this.totalCriterionCount = get(details, 'service_type.total_criterion_count', null);
    this.criterionTypes = get(details, 'criterion_types', null);
    this.summaryText = get(details, 'summary', null);

    const {location} = props;
    const queryParamValue = get(location, ['query', this.queryParamKey]);
    this.state = {
      overlayVisible: (queryParamValue === serviceTypeId),
    };
  }

  /**
   * Get visibility.
   *
   * Component is visible only if all the required data exists.
   *
   * @returns {boolean}
   */
  getVisibility() {
    return (
      this.serviceTypeId &&
      this.totalCriterionCount &&
      this.criterionTypes &&
      this.summaryText
    );
  }

  showOverlay = () => {
    this.setState({overlayVisible: true});
    const newQueryParam = {[this.queryParamKey]: this.serviceTypeId};
    const location = this.props.location;
    const query = get(location, 'query');
    browserHistory.push(
      Object.assign(location, {
        query: Object.assign(query, newQueryParam),
      }),
    );
  };

  hideOverlay = () => {
    this.setState({overlayVisible: false});
    const location = this.props.location;
    const query = get(location, 'query');
    delete query[this.queryParamKey];
    browserHistory.push(Object.assign(location, {query}));
  };

  render() {
    // Render nothing if the component doesn't have anything to show.
    if (!this.getVisibility()) {
      return null;
    }

    const {className, details, flip, image, text, title, t} = this.props;
    const backgroundImage = `url("${image}")`;
    const {overlayVisible} = this.state;
    const modalContentStyle = {
      backgroundColor: 'white',
      color: Colors.HEL_BLACK,
      padding: '6rem 0 4rem',
    };

    return (
      <div className={classNames(className, 'sustainability-service-liftup', {
        'sustainability-service-liftup--flipped': flip,
      })}>
        <Row>
          <Column small={12} medium={6} className={classNames(
            'sustainability-service-liftup__column',
            'sustainability-service-liftup__column--image'
          )}>
            <LazyBackground
              className="sustainability-service-liftup__image"
              data-background-image={backgroundImage}
            />
          </Column>
          <Column small={12} medium={6} className={classNames(
            'sustainability-service-liftup__column',
            'sustainability-service-liftup__column--text'
          )}>
            <h2 className="sustainability-service-liftup__title">{title}</h2>
            <div
              className="sustainability-service-liftup__text"
              dangerouslySetInnerHTML={{__html: text}}
            />
            <a
              className="sustainability-service-liftup__link"
              onClick={this.showOverlay}
            >
              {t('takeALookAtTheCriteria')}
            </a>
          </Column>
        </Row>
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
  translate(['sustainabilityServiceLiftup']),
  withRouter,
)(SustainabilityServiceLiftup);
