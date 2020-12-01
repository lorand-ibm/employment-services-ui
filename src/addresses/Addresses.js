import React, {Component} from 'react';
import get from 'lodash/get';

import AddressGroup from './AddressGroup';

type Props = {
  items: Array,
};

class Addresses extends Component {
  props: Props;

  static defaultProps = {
    items: [],
  };

  render() {
    const {items} = this.props;

    return (
      <div className="addresses">
        {items.map((addressGroups, i) => {
          return (
            <AddressGroup
              key={i}
              title={get(addressGroups, 'field_title')}
              items={get(addressGroups, 'field_address')}
            />
          );
        })}
      </div>
    );
  }
}

export default Addresses;
