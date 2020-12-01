import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_bars_and_nightlife.svg';

type Props = {
  type: String,
};

const BarsAndNightlife = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default BarsAndNightlife;
