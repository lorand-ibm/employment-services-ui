import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

type Props = {
  className?: String,
  value: String,
  collapseMargins?: Boolean,
  colorScheme: Object,
};

class LeadText extends React.Component {
  props: Props;

  static defaultProps = {
    colorScheme: {},
  }

  render() {
    const {className, value, collapseMargins, colorScheme} = this.props;
    const style = {
      color: get(colorScheme, 'text'),
    };

    return (
      <div className={classNames(className, 'myhki-lead-text', {
        'myhki-lead-text--collapse-margins': collapseMargins,
      })}
      style={style}
      >
        <p>{value}</p>
      </div>
    );
  }
}

export default LeadText;
