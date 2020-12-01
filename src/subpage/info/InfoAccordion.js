import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

import Accordion from '../../accordion/Accordion';

type Props = {
  content: Object,
};

class InfoAccordion extends Component {
  props: Props;

  getAccordionGroups = () => {
    const {content} = this.props,
      paragraphData = get(content, 'field_paragraphs'),
      accordionGroups = [];

    const getAccordionGroupTitle = accordionData => {
      let title = '';

      forEach(accordionData, item => {
        const fieldPlain = get(item, 'field_plain', '');
        if (fieldPlain) {
          title = fieldPlain;
        }
      });

      return title;
    };

    const getAccordions = accordionData => {
      const accordions = [];

      forEach(accordionData, item => {
        const isGroupTitle = get(item, 'field_plain', undefined) !== undefined;
        if (isGroupTitle) {
          return;
        }

        const accordion = {
          title: get(item, 'field_accordion_title', ''),
          body: get(item, 'field_text[0].value', ''),
        };

        const icon = get(item, 'field_media[0].field_image[0].styles.square_150');

        if (icon) {
          accordion.icon = icon;
        }

        accordions.push(accordion);
      });

      return accordions;
    };

    forEach(paragraphData, paragraph => {
      const accordionData = get(paragraph, 'field_accordion');
      if (accordionData) {
        accordionGroups.push({
          title: getAccordionGroupTitle(accordionData),
          accordions: getAccordions(accordionData),
        });
      }
    });

    return accordionGroups;
  };

  render() {
    return (
      <div className="info-accordion">
        <Row>
          <Column>
            {this.getAccordionGroups().map((accordionGroup, i) => (
              <div className="info-accordion__accordion-group" key={i}>
                {!!accordionGroup.title && (
                  <h2 className="myhki-accordion-group__title">{accordionGroup.title}</h2>
                )}
                {accordionGroup.accordions.map((accordion, i) => (
                  <Accordion title={accordion.title} icon={accordion.icon} key={i}>
                    <div dangerouslySetInnerHTML={{__html: accordion.body}} />
                  </Accordion>
                ))}
              </div>
            ))}
          </Column>
        </Row>
      </div>
    );
  }
}

export default InfoAccordion;
