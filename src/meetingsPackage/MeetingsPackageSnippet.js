// @flow
import React, {Component} from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import image from './background.jpg';

import {getActiveLanguage} from '../helpers';

type Props = {
  className?: string,
  isHorizontal?: boolean,
};

class MeetingsPackageSnippet extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');

      const isFinnish = get(getActiveLanguage(), 'id') === 'fi';
      if (isFinnish) {
        script.src =
          'https://myhelsinki.meetingpackage.com/whitelabel/widgets-myhelsinki/215009/fi';
      } else {
        script.src =
          'https://myhelsinki.meetingpackage.com/whitelabel/widgets-myhelsinki/215009/en';
      }
      script.setAttribute('async', '');
      const head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
    }
  }

  render() {
    const {className, isHorizontal} = this.props;

    return (
      <div className="meetings-package__container" style={{backgroundImage: 'url(' + image + ')'}}>
        <div id="mp-widget" className={classNames(className, {horizontal: isHorizontal})} />
      </div>
    );
  }
}

export default MeetingsPackageSnippet;
