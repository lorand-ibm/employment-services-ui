// @flow

import React, {Component} from 'react';
import get from 'lodash/get';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';

import Hero from '../../hero/Hero';
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs';
import InfoAccordion from './InfoAccordion';
import InfoRichBlock from './InfoRichBlock';

import * as contentHelpers from '../../content/helpers';

import {Colors, InfoSubpageTypes, ImageStyles} from '../../constants';

type Props = {
  content: Object,
};

class InfoSubpage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Info Subpage: %o', this.props.content);
    }
  }

  getTitle = () => {
    const {content} = this.props;

    return get(content, 'title', null);
  };

  getBreadcrumbs = () => {
    const title = this.getTitle();

    const breadcrumbs = [{text: 'Home', link: '/'}, {text: 'Info'}];

    if (title) {
      breadcrumbs.push({
        text: title,
      });
    }

    return breadcrumbs;
  };

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageStyle = ImageStyles.HERO_IMAGE,
      heroImageData = get(content, `field_hero_image[0].field_image[0].styles.${heroImageStyle}`);

    return heroImageData ? `url("${heroImageData}")` : Colors.HEL_DARK_GRAY;
  };

  getInfoSubpageType = () => {
    const {content} = this.props;
    return get(content, 'field_paragraphs')
      ? InfoSubpageTypes.ACCORDION
      : InfoSubpageTypes.RICH_BLOCK;
  };

  render() {
    const {content} = this.props,
      type = this.getInfoSubpageType();

    return (
      <div
        className={classNames('subpage subpage--info', {
          'subpage--info-accordion': type === InfoSubpageTypes.ACCORDION,
          'subpage--info-rich-block': type === InfoSubpageTypes.RICH_BLOCK,
        })}
      >
        <Hero
          title={this.getTitle()}
          background={this.getHeroBackground()}
          koroColor={type === InfoSubpageTypes.ACCORDION ? '#DFEDFA' : '#ffffff'}
        />
        <Row>
          <Column>
            <Breadcrumbs items={contentHelpers.getContentBreadcrumbs(content)} />
          </Column>
        </Row>
        {type === InfoSubpageTypes.ACCORDION ? (
          <InfoAccordion content={content} />
        ) : (
          <InfoRichBlock content={content} />
        )}
      </div>
    );
  }
}

export default InfoSubpage;
