import React, {Component} from 'react';
import {Link} from 'react-router';
import isExternal from 'is-url-external';

type Props = {
  to: string,
};

export class LinkDuo extends Component {
  props: Props;

  getLink = () => {
    const {to, children, ...attr} = this.props;
    if (typeof window !== 'undefined' && isExternal(to)) {
      return <a href={to} target="_blank" rel="noopener noreferrer" {...attr}>
        {children}
      </a>;
    } else {
      return <Link {...this.props}>
        {children}
      </Link>;
    }
  };

  render() {
    return <>{this.getLink()}</>;
  }
}

export default LinkDuo;
