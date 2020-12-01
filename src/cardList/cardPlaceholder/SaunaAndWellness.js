import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_sauna_and_wellness.svg';

type Props = {
  type: String,
};

const SaunaAndWellness = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default SaunaAndWellness;
