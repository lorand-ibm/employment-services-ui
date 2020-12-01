import {createElement} from 'react';
import {withRouter} from 'react-router';

import QuoteTypeBasic from './QuoteTypeBasic';
import QuoteTypeTitleFirst from './QuoteTypeTitleFirst';

const QuoteTypes = {
  basic: QuoteTypeBasic,
  'title-first': QuoteTypeTitleFirst,
};

const resolveQuoteType = type => QuoteTypes[type] || QuoteTypeBasic;

const SimpleQuote = props => createElement(resolveQuoteType(props.type), props);

export default withRouter(SimpleQuote);
