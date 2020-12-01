import React, {Component} from 'react';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';
import {getLanguagecodeFromUrl} from '../helpers';

const emptyFn = () => {};

type Props = {
  className: String,
  dateFrom: Object,
  dateTo: Object,
  onChange: Function,
  onClose: Function,
};

type State = {
  isFirstSelection: boolean,
};

class DatePicker extends Component {
  props: Props;

  static defaultProps = {
    onChange: emptyFn,
    onClose: emptyFn,
  };

  state: State = {
    isFirstSelection: true,
  };

  render() {
    const {className, dateFrom, dateTo, onChange, onClose} = this.props,
      {isFirstSelection} = this.state;

    const lang = global.IS_CLIENT
      ? getLanguagecodeFromUrl(window.location.pathname)
      : 'en';

    return (
      <div className={classNames('myhki-datepicker', className)}>
        <div className="myhki-datepicker__wrapper">
          <div className="myhki-datepicker__date">
            <ReactDatePicker
              locale={lang}
              selectsEnd={!isFirstSelection}
              selected={dateFrom}
              startDate={dateFrom}
              endDate={dateTo}
              onSelect={date => {
                if (isFirstSelection) {
                  onChange(date, null);
                } else {
                  if (date.isBefore(dateFrom)) {
                    onChange(date, dateFrom);
                  } else {
                    onChange(dateFrom, date);
                  }

                  onClose();
                }

                this.setState({
                  isFirstSelection: false,
                });
              }}
              monthsShown={2}
              inline
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;
