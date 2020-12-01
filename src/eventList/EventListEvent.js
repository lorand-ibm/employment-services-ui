import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

import {Colors, ImageStyles} from '../constants';

import {getContentTitle, getContentCoverImage, getContentPath} from '../content/helpers';

import {getFoundationBreakpoint} from '../helpers.js';
import {formatStartTime, formatDuration} from '../content/dateHelpers';

type Props = {
  className: String,
  event: Object,
  color: String,
};

const getCover = (event, color) => {
  const coverImage = getContentCoverImage(event, ImageStyles.SQUARE_150);

  return coverImage ? `url("${coverImage}")` : color;
};

const EventListItem = ({className, event, color = Colors.HEL_COPPER}: Props) => {
  const saveMyHelsinkiIcon = getFoundationBreakpoint() === 'small' ? 'fa-heart' : 'fa-heart-o';
  return (
    <Link to={getContentPath(event)} className={classNames('myhki-event-list-event', className)}>
      <div className="myhki-event-list-event__image" style={{background: getCover(event, color)}} />
      <div className="myhki-event-list-event__wrapper">
        <div className="myhki-event-list-event__header">
          <span className="myhki-event-list-event__start-and-duration">
            {formatStartTime(event.field_start_date)}
            {formatDuration(event.field_start_date, event.field_end_date)}
          </span>
        </div>
        <h3 className="myhki-event-list-event__title">{getContentTitle(event)}</h3>
        <div className="myhki-event-list-event__footer">
          <span className="myhki-event-list-event__price-and-place">
            {event.field_location_name}
          </span>
          <button
            className="myhki-event-list-event__save-to-my-helsinki"
            onClick={e => {
              e.preventDefault();
            }}
          >
            <i className={classNames('fa', saveMyHelsinkiIcon)} aria-hidden="true" />
            <span>Save to My Helsinki</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventListItem;
