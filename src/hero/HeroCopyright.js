// @flow

import React, {Component} from 'react';
import i18n from '../root/i18n';

type Props = {
  credits: string,
};

export class HeroCopyright extends Component {
  props: Props;

  render() {
    const {credits} = this.props;
    if (!credits) {
      return null;
    }
    return (
      <div className="myhki-hero--copyrights">
        <p className="myhki-hero--copyrights-credits">{`${i18n.t(
          'hero:copyrights',
        )} ${credits}`}</p>
      </div>
    );
  }
}

export default HeroCopyright;
