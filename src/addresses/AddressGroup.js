import React, {Component} from 'react';
import get from 'lodash/get';

import Address from './Address';

type Props = {
  title: String,
  items: Array,
};

class AddressGroups extends Component {
  props: Props;

  static defaultProps = {
    title: '',
    items: [],
  };

  render() {
    const {title, items} = this.props;

    return (
      <div className="address-group">
        <h3 className="address-group__title">{title}</h3>
        <div className="address-group__wrapper">
          {items.map((address, i) => {
            return (
              <Address
                key={i}
                title={get(address, 'field_title')}
                body={get(address, 'field_details[0].value')}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default AddressGroups;
