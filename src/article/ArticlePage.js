import React, {Component} from 'react';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';

import {
  getContentTitle,
  getContentCoverImage,
  getContentCoverImageCopyright,
  getContentTags,
  getContentAuthor,
  getContentCards,
  getContentBreadcrumbs,
} from '../content/helpers';
import * as contentHelpers from '../content/helpers';
import {ImageStyles, KoroTypes} from '../constants';
import {formatArticleDate} from '../content/dateHelpers';

import Hero from '../hero/Hero';
import HeroCopyright from '../hero/HeroCopyright';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Tags from '../tags/Tags';
import CardList from '../cardList/CardList';
import Koro from '../koro/Koro';
import ShareLinks from '../shareLinks/ShareLinks';
import Author from '../author/Author';
import Paragraphs from '../paragraphs/Paragraphs';

type Props = {
  content: Object,
};

class ArticlePage extends Component {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Article page: %o', this.props.content);
    }
  }

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageData = getContentCoverImage(content, ImageStyles.HERO_IMAGE, false);

    return heroImageData ? `url("${heroImageData}")` : '#ffffff';
  };

  getHeroCopyright = () => {
    const {content} = this.props,
      heroCopyright = getContentCoverImageCopyright(content);
    return heroCopyright ? heroCopyright : '';
  };

  getShowDate = () => {
    return !!Number(get(this.props.content, 'field_show_created_updated'));
  };

  getRelatedArticlesCardListProps = () => {
    const {content} = this.props,
      items = getContentCards(content, 'related_entities.items');

    if (!items.length) {
      return null;
    }

    return {
      title: get(content, 'related_entities.title'),
      items: items,
      seeAllLink: get(content, 'related_entities.see_all_link_path'),
    };
  };

  render() {
    const {content} = this.props,
      teaserText = get(content, 'field_teaser_text'),
      tags = getContentTags(content),
      author = getContentAuthor(content),
      relatedArticlesCardListProps = this.getRelatedArticlesCardListProps(),
      showAuthor = contentHelpers.isContentAuthorVisible(content);

    return (
      <div className={classNames('article-page')}>
        <Hero background={this.getHeroBackground()} koroColor="#ffffff" />
        <Row>
          <Column>
            <div className="myhki-breadcrumbs-wrapper">
              <Breadcrumbs items={getContentBreadcrumbs(content)} />
              <HeroCopyright credits={this.getHeroCopyright()} />
            </div>
            <h1>{getContentTitle(content)}</h1>
            {!!teaserText && <p className="article-page__teaser-text">{teaserText}</p>}
            {this.getShowDate() && (
              <p className="article-page__date">{formatArticleDate(content)}</p>
            )}
            <div className="paragraphs">
              <Paragraphs content={content} />
            </div>
            <div className="article-page__footer">
              <Row>
                {showAuthor && !!author && (
                  <Column small={12} large={6}>
                    <Author author={author} />
                  </Column>
                )}
                <Column small={12} large={6}>
                  {!!tags && <Tags tags={tags} />}
                </Column>
                <Column>
                  <ShareLinks />
                </Column>
              </Row>
            </div>
          </Column>
        </Row>

        {relatedArticlesCardListProps && (
          <div className="article-page__related-articles">
            <Koro color="#ebedf1" type={KoroTypes.BASIC_WAVE} flip />
            <div className="article-page__related-articles-wrapper">
              <Row>
                <Column>
                  {relatedArticlesCardListProps && (
                    <CardList
                      className="related-articles-card-list"
                      {...relatedArticlesCardListProps}
                    />
                  )}
                </Column>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ArticlePage;
