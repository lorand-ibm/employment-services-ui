import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_workstudy.svg';

type Props = {
  type: String,
};

const WorkAndStudy = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default WorkAndStudy;
