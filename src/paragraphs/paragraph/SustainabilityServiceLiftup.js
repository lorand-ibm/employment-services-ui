import React from 'react';
import SustainabilityServiceLiftup from '../../sustainability/SustainabilityServiceLiftup';

type Props = {
  paragraph: Object,
};

const SustainabilityServiceLiftupParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--sustainability-service-liftup">
    <SustainabilityServiceLiftup
      details={paragraph.details}
      flip={paragraph.flip}
      image={paragraph.image}
      text={paragraph.text}
      title={paragraph.title}
    />
  </div>
);

export default SustainabilityServiceLiftupParagraph;
