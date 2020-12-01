import React, {Component} from 'react';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';

import * as contentHelpers from '../content/helpers';

import Hero from '../hero/Hero';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

type Props = {
  content: Object,
};

class BasicPage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Basic page: %o', this.props.content);
    }
  }

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageData = contentHelpers.getContentCoverImage(content);

    return heroImageData ? `url("${heroImageData}")` : null;
  };

  render() {
    const {content} = this.props,
      heroBackground = this.getHeroBackground(),
      body = contentHelpers.getContentBody(content, false);

    return (
      <div className={classNames('basic-page')}>
        {heroBackground && <Hero background={heroBackground} koroColor="#ffffff" />}
        <Row>
          <Column>
            <Breadcrumbs items={contentHelpers.getContentBreadcrumbs(content)} />
            <Row>
              <Column large={10} offsetOnLarge={1}>
                <h1>{contentHelpers.getContentTitle(content)}</h1>
                <div className="basic-page__content">
                  <div dangerouslySetInnerHTML={{__html: body}} />
                </div>
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
    );
  }
}

export default BasicPage;
