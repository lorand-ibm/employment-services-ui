import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import flowRight from 'lodash/flowRight';

import i18n from '../../root/i18n';
import {fetchMenuByName} from '../../menu/actions';
import {FooterTopMenuByLanguage, FooterBottomMenuByLanguage, BypassCacheQueryParameter} from '../../constants';
import {footerMenuPageSelector} from '../../menu/selectors';
import * as helpers from '../../helpers';
import has from 'lodash/has';

type Props = {
  fetchMenuByName: typeof fetchMenuByName,
  topMenu: Array,
  bottomMenu: Array,
  i18n: Object,
  t: Function,
  params: Object,
  location: String,
};

class Footer extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      logo: helpers.getLogo(),
      logoClass: helpers.getLogoClass(),
    };
    if (global.IS_CLIENT) {
      i18n.on('languageChanged', this.onLanguageChange);
    }
  }

  onLanguageChange = () => {
    this.setState({
      logo: helpers.getLogo(),
      logoClass: helpers.getLogoClass(),
    });
  };

  componentWillReceiveProps(nextProps: Props) {
    const {
        params: {language},
      } = this.props,
      {
        params: {language: nextLanguage},
      } = nextProps;

    // Check if we need to fetch menu from API, but only if language has changed.
    if (language !== nextLanguage) {
      this.fetchMenus(nextLanguage, nextProps);
    }
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      this.fetchMenus(this.props.params.language);
    }
  }

  showFeedbackForm = () => {
    helpers.showFeedbackModal();
  };

  fetchMenus = (language, props) => {
    if (!language) return;

    const {topMenu, bottomMenu} = props || this.props,
      topMenuName = FooterTopMenuByLanguage[language],
      bottomMenuName = FooterBottomMenuByLanguage[language];

    const bypassCache = has(this.props.location, `query.${BypassCacheQueryParameter}`);

    if (!topMenu && topMenuName) {
      this.props.fetchMenuByName(topMenuName, language, bypassCache);
    }

    if (!bottomMenu && bottomMenuName) {
      this.props.fetchMenuByName(bottomMenuName, language, bypassCache);
    }
  };

  render() {
    const {t, topMenu, bottomMenu} = this.props,
      {logo, logoClass} = this.state;
    const {
      params: {language},
    } = this.props;
    const currentLang = i18n.language;
    const langArray = ['sv', 'fi', 'en'];
    const isInLangArray = langArray.includes(currentLang);

    return (
      <footer className="footer">
        <nav aria-label={i18n.t('secondary')}>
          <div className="footer__wrapper">
            <div className="row">
              <div className="small-12 column">
                <Link className={logoClass} to="/">
                  <img src={logo} alt={i18n.t('home')}/>
                </Link>

              </div>
            </div>
          </div>
        </nav>

      </footer>
    );
  }
}

export default flowRight(
  translate(['general', 'footer']),
  connect(
    footerMenuPageSelector,
    {fetchMenuByName},
  ),
  withRouter,
)(Footer);
