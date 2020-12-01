import React from 'react';
import CardPlaceholder from './CardPlaceholder';

import placeholderImage from '../../../assets/images/placeholder-icons/placeholder_shopping.svg';

type Props = {
  type: String,
};

const Shop = ({type}: Props) => (
  <CardPlaceholder
    type={type}
    image={placeholderImage}
  />
);

export default Shop;
