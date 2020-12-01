import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';

import ContactCard from './ContactCard';

import {Colors} from '../constants';

type Props = {
  items: Array,
  title: String,
  subtitle: String,
  defaultCardColor: String,
};

class ContactCards extends Component {
  props: Props;

  static defaultProps = {
    items: [],
    title: '',
    subtitle: '',
    defaultCardColor: Colors.HEL_MEDIUM_GRAY,
  };

  render() {
    const {items, title, subtitle, defaultCardColor} = this.props;
    return (
      <div className="myhki-contact-cards">
        <Row>
          <Column>
            <h3 className="myhki-contact-cards__title">{title}</h3>
            {subtitle && (
              <div className="myhki-contact-cards__subtitle-wrapper">
                <i className="fa fa-info-circle myhki-contact-cards__subtitle-icon" />
                <span className="myhki-contact-cards__subtitle">{subtitle}</span>
              </div>
            )}
            <div className="myhki-contact-cards__wrapper">
              {items.map((contactCard, i) => (
                <ContactCard
                  key={i}
                  image={contactCard.image}
                  title={contactCard.title}
                  name={contactCard.name}
                  phone={contactCard.phone}
                  email={contactCard.email}
                  color={defaultCardColor}
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
