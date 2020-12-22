import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

type Props = {
  className?: String,
  title: String,
  body: String,
};

class InfoNotification extends React.Component {
  props: Props;

  static defaultProps = {
    colorScheme: {},
  }

  render() {
    const {className, title, body} = this.props;

    return (
      <div className='myhki-paragraph myhki-paragraph--info notification-info-wrapper' >
        <div className='notification-info-left'></div>
        <div className='notification-texts'>
          <div className='notification-title-row'>
            <div className='notification-icon'></div>
            <div className='notification-title '>
              <p>{title}</p>
            </div>
          </div>
          <div className='notification-body' dangerouslySetInnerHTML={{__html: body}}></div>
        </div>
      </div>

    );
  }
}

export default InfoNotification;
