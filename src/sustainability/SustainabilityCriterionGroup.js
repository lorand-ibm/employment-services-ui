import React, {Component} from 'react';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';
import SustainabilityCriterion from './SustainabilityCriterion';
import SustainabilityHeading from './SustainabilityHeading';

type Props = {
  className: String,
  label: String,
  criterions: Array,
};

class SustainabilityCriterionGroup extends Component {
  props: Props;

  render() {
    const {className, label, criterions} = this.props;

    return (
      <div className={classNames(className, 'sustainability-criterion-group')}>
        <Row isCollapsed className="sustainability-criterion-group__title">
          <Column small={8} offsetOnSmall={2}>
            <SustainabilityHeading level={2} color="blue">
              {label}
            </SustainabilityHeading>
          </Column>
        </Row>

        {criterions.map((criterion, index) => (
          <SustainabilityCriterion {...criterion} key={index} />
        ))}
      </div>
    );
  }
}

export default SustainabilityCriterionGroup;
