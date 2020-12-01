import React, {Component} from 'react';
import {translate} from 'react-i18next';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';

const rootClassName = 'page-details__opening-hours';

const getWeekday = day => {
  const weekdaysShort = moment.localeData().weekdaysShort();
  return weekdaysShort[Number(day)];
};

const formatTime = time => {
  const length = time.length;
  if (length === 4) {
    // after 10AM time e.g. 1600 => 16:00/4PM
    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);
    return `${hours}.${minutes}`;
  } else if (length === 3) {
    // before 10AM time, e.g. 200 => 02:00/2AM
    const hours = time.substring(0, 1);
    const minutes = time.substring(1, 3);
    return `0${hours}.${minutes}`;
  } else if (length === 2) {
    return `00.${time}`;
  } else if (time === '0') {
    // single '0' signifies midnight
    return '24.00';
  } else {
    return '';
  }
};

const dataRequiresLegacyComponent = data => {
  if (isEmpty(data.structured)) {
    return true;
  }
  if (data.structured.every(h => isClosed(h.starthours, h.endhours))) {
    return true;
  }
  return false;
};

const isClosed = (start, end) => {
  return start === '0' && end === '0';
};

const getHours = (start, end) => {
  const opening = formatTime(start);
  const closing = formatTime(end);
  if (opening && closing) {
    return { opening, closing}
  }
  // Unexpected values for start or end
  return {opening: '', closing: ''};
};

const Label = ({t}) => (
  <div className={`${rootClassName}-label`}>
    <span className={`${rootClassName}-icon`} />
    <h2 className={`${rootClassName}-title`}>{t('openingHours:title')}</h2>
  </div>
);

const rows = (h, i, t) => {
  const closed = isClosed(h.starthours, h.endhours);
  const { opening, closing } = getHours(h.starthours, h.endhours);
  return (
    <tr className={`${rootClassName}-openings-row`} key={i}>
      <td className={`${rootClassName}-openings-row-weekday`}>
        {getWeekday(h.day)}
      </td>
      <td className={`${rootClassName}-openings-row-hours`}>
      {closed ?
        <td className={`${rootClassName}-openings-row-hours-closed`}>
          {t('closed')}
        </td>
        :
        <>
          <div className={`${rootClassName}-openings-row-hours--time`}>
            {opening}
          </div>
          <div className={`${rootClassName}-openings-row-hours--delimiter`}>
            -
          </div>
          <div className={`${rootClassName}-openings-row-hours--time`}>
            {closing}
          </div>
        </>
      }
      </td>
    </tr>
  )
}

const Openings = ({isLegacy, data, t}) => (
  <div className={`${rootClassName}-openings`}>
    {isLegacy ? (
      <div className={`${rootClassName}-exception`}>{data.text}</div>
    ) : (
      <table>
        {data.structured.map((h, i) => (
          rows(h, i, t)
        ))}
      </table>
    )}
    {!isLegacy && data.exception && <Exception exception={data.exception} />}
  </div>
);

const Exception = ({exception}) => {
  const isBlank = str => /^\s*$/.test(str);
  const exeptions: string[] = exception.split('\n').filter(exception => !isBlank(exception));
  return (
    <div className={`${rootClassName}-exception`}>
      {exeptions.map((e, i) => (
        <div className={`${rootClassName}-exception-row`} key={i}>
          {e}
        </div>
      ))}
    </div>
  );
};

type Props = {
  data: any;
  breakpoint: string;
  t: any;
};

class OpeningHours extends Component {
  props: Props;
  state = {mobileShow: false};

  render() {
    const {data, breakpoint} = this.props;
    if (!data) {
      return null;
    }
    const isLegacy = dataRequiresLegacyComponent(data);

    if (isLegacy && !data.text) {
      return null;
    }

    if (breakpoint == 'small') {
      return (
        <div className={`${rootClassName}`}>
          <div className={`${rootClassName}-mobile`}>
            <button
              className={`${rootClassName}-button-row`}
              aria-expanded={this.state.mobileShow}
              aria-label={this.props.t('openingHours:title')}
              onClick={() => {
                this.setState({mobileShow: !this.state.mobileShow});
            }}
            >
              <Label t={this.props.t} />
              <div className={`${rootClassName}-dropdown-button-icon`}>
                <span
                  className={`${rootClassName}-dropdown-icon${
                    this.state.mobileShow ? ` ${rootClassName}-dropdown-icon-flip` : ''
                  }`}
                />
              </div>
            </button>
            {this.state.mobileShow && (
              <Openings isLegacy={isLegacy} data={data} t={this.props.t} />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`${rootClassName}`}>
        <Label t={this.props.t} />
        <Openings isLegacy={isLegacy} data={data} t={this.props.t} />
      </div>
    );
  }
}

export default translate('openingHours')(OpeningHours);
