import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_seedo.svg';

type Props = {
  type: String,
};

const SeeAndDo = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default SeeAndDo;
