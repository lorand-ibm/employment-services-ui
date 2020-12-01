import React, {Component} from 'react';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import {withRouter} from 'react-router';
import {Row, Column} from 'react-foundation';
import {translate} from 'react-i18next';

import {Content} from '../content/types';
import * as contentHelpers from '../content/helpers';
import SectionPageItem from './SectionPageItem';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

type Props = {
  content: Content,
  t: Function,
};

class SectionPage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Section page %o', this.props.content);
    }
  }

  getBreadcrumbs = () => {
    const {content, t} = this.props,
      title = get(content, 'title');

    const breadcrumbs = [{text: t('homeLabel'), link: '/'}];

    if (title) {
      breadcrumbs.push({
        text: title,
      });
    }

    return breadcrumbs;
  };

  render() {
    const {content} = this.props,
      items = contentHelpers.getContentSectionPageItems(content);

    return (
      <div className="section-page">
        <Row>
          <Column>
            <Breadcrumbs items={this.getBreadcrumbs()} />
            <h1 className="section-page__title">{get(content, 'title')}</h1>

            <div className="section-page__items">
              {items.map((item, i) => (
                <SectionPageItem key={i} {...item} />
              ))}
            </div>
          </Column>
        </Row>
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['breadcrumbs']),
)(SectionPage);
