import React from 'react';
import CardList from '../../cardList/CardList';

type Props = {
  paragraph: Object,
};

const CardListParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--card-list">
    <CardList {...paragraph} collapseMargins={true} />
  </div>
);

export default CardListParagraph;
