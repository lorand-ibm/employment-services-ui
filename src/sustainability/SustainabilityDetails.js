import React, {Component} from 'react';
import classNames from 'classnames';
import {browserHistory, withRouter} from 'react-router';
import {translate} from 'react-i18next';
import i18n from '../root/i18n';
import flowRight from 'lodash/flowRight';
import Banner from '../banner/Banner';
import heart from '../../assets/images/ts-heart-animated-v2.gif';
import {get, has} from 'lodash';
import {Row, Column} from 'react-foundation';
import Button from '../button/Button';
import SustainabilityCriterionGroup from './SustainabilityCriterionGroup';
import SustainabilityHeading from './SustainabilityHeading';
import {Colors} from '../constants';
import SustainabilityFeedbackForm from '../sustainabilityFeedback/SustainabilityFeedbackForm';
import Modal from '../modal/Modal';

type Props = {
  details: Object,
};

class SustainabilityDetails extends Component {
  props: Props;
  criterionTypes: Array;
  summaryText: String;

  /**
   * Get criterion-types as an array.
   *
   * Transforms objects into arrays (criterion-type list and criterion lists
   * inside each criterion-type). Also ensures that each criterion-type has
   * their criterions sorted in correct order.
   *
   * @param {Object} criterionTypesObject
   */
  getCriterionTypesArray(criterionTypesObject) {
    const criterionTypesArray = Object.values(criterionTypesObject);
    const criterionTypesProcessed = criterionTypesArray.map((criterionType) => {
      const criterionsObject = get(criterionType, 'criterions', {});
      let criterionsArray = Object.values(criterionsObject);
      criterionsArray.sort((x, y) => y['high_priority'] - x['high_priority']);
      criterionsArray.sort((x, y) => y['active'] - x['active']);
      return Object.assign(criterionType, {criterions: criterionsArray});
    });
    return criterionTypesProcessed;
  }

  constructor(props) {
    super(props);

    const {details} = props;
    const criterionTypesObject = get(details, 'criterion_types', {});
    this.criterionTypes = this.getCriterionTypesArray(criterionTypesObject);
    this.summaryText = get(details, 'summary', '');
  }

  showFeedbackOverlay = () => {
    const location = this.props.location;
    const query = get(location, 'query');
    browserHistory.push(
      Object.assign(location, {
        query: Object.assign(query, {sendSustainabilityFeedback: null}),
      }),
    );
  };

  hideFeedbackOverlay = () => {
    const location = this.props.location;
    const query = get(location, 'query');
    delete query.sendSustainabilityFeedback;
    browserHistory.push(Object.assign(location, {query}));
  };

  render() {
    const {t} = this.props;
    const {criterionTypes, summaryText} = this;

    const banner = {
      iconType: 'ts-heart',
      title: i18n.t('sustainabilityDetails:title'),
      link: i18n.t('sustainabilityDetails:link'),
      linkText: i18n.t('sustainabilityDetails:linkText'),
      linkTextMobile: i18n.t('sustainabilityDetails:linkTextMobile'),
      colorScheme: {
        background: Colors.HEL_COPPER,
        text: Colors.WHITE,
        button: Colors.HEL_BUS_1,
      },
    };

    return (
      <div className="sustainability-details">
        <Row isCollapsed>
          <Column small={8} offsetOnSmall={2}>
            <img
              width="433"
              height="394"
              className="sustainability-details__logo"
              alt="#ThinkSustainably logo"
              src={heart}
            />
            <SustainabilityHeading level="1">
              {t('title')}
            </SustainabilityHeading>
            <p
              className="sustainability-details__paragraph"
              dangerouslySetInnerHTML={{__html: summaryText}}
            />
            <p className="sustainability-details__paragraph">
              <Button
                className="sustainability-details__feedback-button"
                color={'blue'}
                onClick={this.showFeedbackOverlay}
              >
                {t('feedbackButton')}
              </Button>
              <Modal
                isOpen={has(this.props.location, 'query.sendSustainabilityFeedback')}
                close={this.hideFeedbackOverlay}
                textColor={'black'}
                headerStyle={{color: Colors.HEL_BUS_1}}
                contentStyle={{backgroundColor: 'white'}}
              >
                <SustainabilityFeedbackForm closeAction={this.hideFeedbackOverlay} />
              </Modal>
            </p>
          </Column>
        </Row>

        {criterionTypes.map((criterionType, index) => (
          <SustainabilityCriterionGroup
            {...criterionType}
            key={index}
            className={classNames('sustainability-details__criterion-group', {
              'sustainability-details__criterion-group--even': index % 2,
              'sustainability-details__criterion-group--odd': !(index % 2),
            })}
          />
        ))}

        <Row isCollapsed>
          <Column medium={10} offsetOnMedium={1}>
            <Banner {...banner} />
          </Column>
        </Row>
      </div>
    );
  }
}

export default flowRight(
  translate(['sustainabilityDetails']),
  withRouter,
)(SustainabilityDetails);
