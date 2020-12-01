import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_accomondation.svg';

type Props = {
  type: String,
};

const Accomondation = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default Accomondation;
