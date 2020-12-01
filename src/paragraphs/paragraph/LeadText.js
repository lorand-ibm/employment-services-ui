import React from 'react';
import LeadText from '../../leadText/LeadText';

type Props = {
  paragraph: Object,
};

const LeadTextParagraph = ({paragraph}: Props) => (
    <div className="myhki-paragraph myhki-paragraph--lead-text">
      <LeadText value={paragraph.value} colorScheme={paragraph.colorScheme} collapseMargins={true} />
    </div>
);

export default LeadTextParagraph;
