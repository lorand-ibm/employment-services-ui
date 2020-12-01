import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import moment from 'moment-timezone';
import i18n from '../root/i18n';

/**
 *
 * @param date
 * @param format
 */
export const formatDate = (date, format) => {
  const d = getFinnishMomentDate(date);
  return d.format(format);
};

const isSameDate = (a, b) => {
  return moment(a).isSame(b, 'day');
};

/**
 *
 * @param startDate
 * @param endDate
 * @returns {string}
 */
const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return '';
  }

  const start = getFinnishMomentDate(startDate),
    end = getFinnishMomentDate(endDate);

  let startFormat = 'D.M.YYYY';
  if (start.year() === end.year() && start.month() === end.month()) {
    startFormat = 'D.';
  } else if (start.year() === end.year()) {
    startFormat = 'D.M.';
  }

  if (isSameDate(start, end)) {
    return `${start.format('D.M.YYYY')}`;
  } else {
    return `${start.format(startFormat)}-${end.format('D.M.YYYY')}`;
  }
};

export const formatArticleDate = content => {
  const format = 'D.M.YYYY',
    created = formatDate(Number(content.created), format),
    changed = formatDate(Number(content.changed), format);

  if (changed && changed !== created) {
    return i18n.t('article:dateChanged', {created: created, changed: changed});
  }

  return i18n.t('article:dateNotChanged', {created: created});
};

/**
 *
 * @param startDate
 * @param endDate
 * @returns {null}
 */
export const formatDuration = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return null;
  }

  const start = getFinnishMomentDate(startDate),
    end = getFinnishMomentDate(endDate);

  return end.from(start, true);
};

/**
 *
 * @param date
 */
export const formatStartTime = date => {
  const start = getFinnishMomentDate(date);

  return start.calendar();
};

export const getContentDateRange = (
  content,
  startPath = 'field_start_date',
  endPath = 'field_end_date',
) => {
  const startTime = get(content, startPath),
    endTime = get(content, endPath);

  if (!startTime && !endTime) {
    return '';
  }

  if (!endTime) {
    return formatDate(startTime, 'D.M.YYYY');
  }

  return formatDateRange(startTime, endTime);
};

/**
 * Returns true if starts at 00:XX and ends at 23:XX. NOTE: does not take days into account.
 * @param {*} startTime
 * @param {*} endTime
 */
const isWholeDayEvent = (startTime, endTime) => {
  return startTime.hours() === 0 && endTime.hours() === 23;
};

const endsAtMidnight = endTime => {
  return endTime.hours() === 23 && endTime.minutes() === 59;
};

export const createDateRangeWithTime = (start, end) => {
  if (!start) {
    return '';
  }

  const startTime = getFinnishMomentDate(start);
  const endTime = getFinnishMomentDate(end);

  const isEndTimeValid = endTime.isValid();
  const isSameYear = startTime.isSame(endTime, 'year');
  const isSameMonth = startTime.isSame(endTime, 'month');
  const isSameDate = startTime.isSame(endTime, 'day');

  const showEndDate = isEndTimeValid && !isSameDate;
  const showStartTime = isSameDate && !isWholeDayEvent(startTime, endTime);
  const showEndTime = showStartTime && !endsAtMidnight(endTime);

  let startFormat = 'D.M.YYYY';
  if (showEndDate && isSameYear && isSameMonth) {
    startFormat = 'D.';
  } else if (showEndDate && isSameYear) {
    startFormat = 'D.M.';
  }

  return [
    startTime.format(startFormat),
    showEndDate ? endTime.format('–D.M.YYYY') : '',
    showStartTime ? startTime.format(' HH:mm') : '',
    showEndTime ? endTime.format('–HH:mm') : '',
  ].join('');
};

/**
 * Tranforms server time (UTC) to Finland's time,
 * and returns moment date object with
 * correct date and time despite user's timezone
 *
 * @param {*} dateValue
 */
export const getFinnishMomentDate = dateValue => {
  const timeZone = 'Europe/Helsinki';
  return isNumber(dateValue) ? moment.unix(dateValue).tz(timeZone) : moment.tz(dateValue, timeZone);
};
