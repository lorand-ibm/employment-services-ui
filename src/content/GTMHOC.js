// @flow
import React, {Component} from 'react';
import capitalize from 'lodash/capitalize';

//import {registerPageView} from '../tag-manager';

type Props = {
  location: any,
};

const GTMHOC = WrappedComponent => {
  return class extends Component {
    props: Props;

    displayName = 'GTMHOC';

    // TODO: Actually inject the real title for the content-page
    generatePageName = path => {
      const pathParts = decodeURIComponent(path).split('/');
      // Select title parts from end of path. If path ends with '/', don't take the last empty one but the 2nd last one.
      const titleParts = path.endsWith('/') && pathParts.length >= 3 ? pathParts[pathParts.length - 2].split('-') : pathParts[pathParts.length - 1].split('-');
      // Example: convert title from ['see', 'and', 'do'] to 'See And Do'.
      return titleParts.map((part) => capitalize(part)).join(' ');
    };

    trackPageView = path => {
      //registerPageView(this.generatePageName(path), decodeURIComponent(path));
    };

    componentDidMount() {
      const path = this.props.location.pathname;
      this.trackPageView(path);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        this.trackPageView(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default GTMHOC;
