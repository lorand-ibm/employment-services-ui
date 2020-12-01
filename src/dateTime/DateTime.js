import React from 'react';

import {createDateRangeWithTime} from '../content/dateHelpers';

type Props = {
  start: String | Number,
  end: String | Number,
};

const DateTime = ({start, end, ...rest}: Props) => {
  const range = createDateRangeWithTime(start, end);
  return (
    <time dateTime={start} {...rest}>
      {range}
    </time>
  );
};

export default DateTime;
