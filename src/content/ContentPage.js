// @flow
import flowRight from 'lodash/flowRight';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Cookies from 'universal-cookie';
import contentFactory from './contentFactory';
import {clearPageVisited, fetchContentByPath, increasePageVisited} from './actions';
import {contentPageSelector} from './selectors';
import i18n from '../root/i18n';
import {translate} from 'react-i18next';
import {Helmet} from 'react-helmet';
import type {Content} from './types';
import * as contentHelpers from './helpers';
import * as helpers from '../helpers';
import {ContentTypes, ImageStyles, Orientations, BypassCacheQueryParameter} from '../constants';

import ErrorPage from '../errorPage/ErrorPage';
import LoadIndicator from '../loadIndicator/LoadIndicator';
import Survey from '../survey/Survey';
import InfoPopup from '../infoPopup/InfoPopup';
import { showInfoPopup } from '../infoPopup/infoPopupHelper';
import GTMHOC from './GTMHOC';
import RichCard from '../seo/RichCard';
import has from 'lodash/has';

export type Props = {
  clearPageVisited: Function,
  content: Content,
  isFetching: boolean,
  fetchContentByPath: typeof fetchContentByPath,
  increasePageVisited: Function,
  router: any,
  location: any,
  pageVisited: number,
  path: string,
  t: Function,
};

type State = {
  noMoreSurvey: boolean,
  orientation: string,
  showSurvey: boolean,
  showSurveyTimeoutInProgress: boolean,
};

const cookies = new Cookies();
const PAGE_VISIT_TO_SHOW_SURVEY = 3;
const DELAY_TO_SHOW_SURVEY = 5000;
const SURVEY_IS_ACTIVE = false;

class ContentPage extends Component {
  props: Props;
  state: State = {
    noMoreSurvey: false,
    orientation: Orientations.PORTRAID,
    showSurveyTimeoutInProgress: false,
    showSurvey: false,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const {
      increasePageVisited,
      path,
      location: {pathname},
      content,
      pageVisited,
    } = props;

    this.handleShowSurvey(pageVisited);

    if (!content) {
      const bypassCache = has(props.location, `query.${BypassCacheQueryParameter}`);
      props.fetchContentByPath(path || pathname, bypassCache);

      if (pageVisited < PAGE_VISIT_TO_SHOW_SURVEY) {
        increasePageVisited();
      }
    }

    if (global.IS_CLIENT) {
      i18n.on('languageChanged', this.onLanguageChange);
    }
  }

  onLanguageChange = language => {
    const {content, path} = this.props;

    if (path && path.search('<front>') > -1) {
      this.context.router.push(`/${language}`);
    } else if (content) {
      const path = contentHelpers.getContentPath(content, language);

      if (path) {
        this.context.router.replace(path);
      } else {
        this.context.router.replace(`/${language}`);
      }
    }
  };

  setOrientation = () => {
    if (global.IS_CLIENT) {
      this.setState({orientation: helpers.getOrientation()});
    } else {
      this.setState({orientation: Orientations.PORTRAID});
    }
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      this.setState({orientation: helpers.getOrientation()});
      window.addEventListener('resize', this.setOrientation);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('resize', this.setOrientation);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
        increasePageVisited,
        location: {pathname},
        path,
        pageVisited,
      } = this.props,
      {
        path: nextPath,
        location: {pathname: nextPathname},
        content,
      } = nextProps;

    this.handleShowSurvey(pageVisited);

    if (!content) {
      const bypassCache = has(this.props.location, `query.${BypassCacheQueryParameter}`);
      if (path && path !== nextPath) {
        this.props.fetchContentByPath(nextPath, bypassCache);
        if (SURVEY_IS_ACTIVE && pageVisited < PAGE_VISIT_TO_SHOW_SURVEY) {
          increasePageVisited();
        }
      } else if (pathname !== nextPathname) {
        this.props.fetchContentByPath(nextPathname, bypassCache);
        if (SURVEY_IS_ACTIVE && pageVisited < PAGE_VISIT_TO_SHOW_SURVEY) {
          increasePageVisited();
        }
      }
    }
  }

  handleShowSurvey = (pageVisited: number) => {
    const didSurvey = cookies.get('didSurvey');
    const {noMoreSurvey, showSurveyTimeoutInProgress} = this.state;

    if (
      SURVEY_IS_ACTIVE &&
      !noMoreSurvey &&
      !didSurvey &&
      pageVisited >= PAGE_VISIT_TO_SHOW_SURVEY &&
      !showSurveyTimeoutInProgress
    ) {
      this.setState({showSurveyTimeoutInProgress: true});
      setTimeout(() => {
        this.setState({
          showSurvey: true,
          noMoreSurvey: true,
          showSurveyTimeoutInProgress: false,
        });
      }, DELAY_TO_SHOW_SURVEY);
    }
  };

  getPageTitle(): string {
    const {content, t} = this.props;
    if (content) {
      const type = contentHelpers.getContentType(content);
      let title = contentHelpers.getContentTitle(content),
        prependTitle = true;

      switch (type) {
        case ContentTypes.HOMEPAGE:
          title = t('myHelsinki');
          prependTitle = false;
          break;
      }

      return helpers.composePageTitle(title, prependTitle);
    } else {
      return helpers.composePageTitle('', true);
    }
  }

  handleAgreeSurvey = () => {
    cookies.set('didSurvey', 'didSurvey', {path: '/'});
    if (global.IS_CLIENT) {
      window.open(i18n.t('survey:url'));
    }
    this.handleCloseSurvey();
  };

  handleCloseSurvey = () => {
    const {clearPageVisited} = this.props;

    this.setState({showSurvey: false});
    clearPageVisited();
  };

  handleSkipSurvey = () => {
    cookies.set('didSurvey', 'skipSurvey', {path: '/'});
    this.handleCloseSurvey();
  };

  render() {
    const {content, isFetching} = this.props,
      image = contentHelpers.getContentCoverImage(content, ImageStyles.HERO_IMAGE),
      title = this.getPageTitle(),
      canonical = contentHelpers.getCanonicalUrl(content),
      {showSurvey} = this.state;

    let description = contentHelpers.getContentDescription(content);
    if (description) {
      description = contentHelpers.stripHtml(description);
      description = description.length > 70 ? description.substr(0, 320) + '...' : description;
    }

    return (
      <div className="content-page">
        <Helmet>
          <title>{title}</title>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          {!!image && <meta property="og:image" content={image} />}
          {!!image && (
            <meta
              property={`og:image:${image.search('https') === 0 ? 'secure_url' : 'url'}`}
              content={image}
            />
          )}
          {!!image && <meta property="og:image:width" content="1980" />}
          {!!image && <meta property="og:image:height" content="900" />}
          {!!description && <meta property="og:description" content={description} />}
          {!!description && <meta name="description" content={description} />}
          <meta name="twitter:title" content={title} />
          {!!description && <meta name="twitter:description" content={description} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@VisitHelsinki" />
          {!!canonical && <link rel="canonical" href={canonical} />}
        </Helmet>
        <Survey
          isOpen={showSurvey}
          onClose={this.handleSkipSurvey}
          onAgree={this.handleAgreeSurvey}
          onSkip={this.handleSkipSurvey}
        />
        <InfoPopup isOpen={showInfoPopup()}/>
        {!content && !isFetching && <ErrorPage />}
        {content && contentFactory(content)}
        {content && <RichCard content={content} />}
        <LoadIndicator show={isFetching} />
      </div>
    );
  }
}

export default flowRight(
  GTMHOC,
  connect(
    contentPageSelector,
    {
      clearPageVisited,
      fetchContentByPath,
      increasePageVisited,
    },
  ),
  translate(['common']),
  withRouter,
)(ContentPage);
