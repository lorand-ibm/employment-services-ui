import React from 'react';
import omit from 'lodash/omit';
import get from 'lodash/get';

import SimpleQuote from '../../simpleQuote/SimpleQuote';

type Props = {
  paragraph: Object,
};

const Twitter = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--quote">
    <SimpleQuote {...omit(paragraph.quote, ['body'])}>
      <div dangerouslySetInnerHTML={{__html: get(paragraph, 'quote.body')}} />
    </SimpleQuote>
  </div>
);

export default Twitter;
