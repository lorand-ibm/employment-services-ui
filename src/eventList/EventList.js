import React from 'react';
import classNames from 'classnames';

import EventListEvent from './EventListEvent';

type Props = {
  className: String,
  items: Array,
};

const EventList = ({className, items = []}: Props) => (
  <div className={classNames('myhki-event-list', className)}>
    <div className="myhki-event-list__events">
      {items.map((event, i) => (
        <EventListEvent key={i} event={event} />
      ))}
    </div>
    <div className="myhki-event-list__footer">
      <a className="myhki-event-list__load-more">Load more</a>
    </div>
  </div>
);

export default EventList;
