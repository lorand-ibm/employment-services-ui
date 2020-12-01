import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_eatdrink.svg';

type Props = {
  type: String,
};

const EatAndDrink = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default EatAndDrink;
