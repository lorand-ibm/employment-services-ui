import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';

import StaffBlock from './StaffBlock';

type Props = {
  items: Array,
  title: String,
};

class ContactCards extends Component {
  props: Props;

  static defaultProps = {
    items: [],
    title: '',
  };

  render() {
    const {items, title} = this.props;
    return (
      <div className="myhki-staff-blocks">
        <Row>
          <Column>
            <h3 className="myhki-staff-blocks__title">{title}</h3>
            <div className="myhki-staff-blocks__wrapper">
              {items.map((staffBlock, i) => (
                <StaffBlock
                  key={i}
                  title={staffBlock.title}
                  details={staffBlock.details}
                  items={staffBlock.items}
                />
              ))}
            </div>
          </Column>
        </Row>
      </div>
    );
  }
}

export default ContactCards;
