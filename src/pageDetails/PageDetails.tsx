import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Column, ButtonGroup, Link} from 'react-foundation';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';
import i18n from '../root/i18n';
import Tags from '../tags/Tags';
import ReadMore from '../readMore/ReadMore';
import ShareLinks from '../shareLinks/ShareLinks';
import {getFoundationBreakpointUsingWindowWidth} from '../helpers.js';
import {showActionLinks} from './helpers.js';
import OpeningHours2 from './OpeningHours';
import phoneIcon from '../../assets/images/ico-phone.svg';

interface Props {
  title: String;
  meta: any;
  body: any;
  summary: String;
  ctaButtons: any;
  tags: Array<Object>;
  breakpoint: String;
  saveToMyHelsinkiIcon: string;
  onSaveToMyHelsinkiClick(): any;
  t(s: string): string;
  contentId?: string;
  type?: Array<string>;
  openingHours: any;
  phone: string;
  address: any;
}

interface State {
  breakpoint: String;
}

const TitleBar = props => (
  <div className="page-details__title">
    <h1>{props.title}</h1>
    {props.address && <div className="page-details__title-address">{props.address}</div>}
  </div>
);

const PhoneButtons = ({phone}) =>
  phone.split(',').map(p => (
    <ButtonGroup className="page-details__cta-buttons" key={p}>
      <PhoneButton phone={p} />
    </ButtonGroup>
  ));

const PhoneButton = ({phone}) => (
  <div>
    <Link className="phone-button"
      href={'tel:' + phone}
      target="_blank"
      rel="noopener noreferrer"
      isHollow
    >
      <img src={phoneIcon} alt=""/>
      {phone}
      <span className="visually-hidden">{i18n.t('common:call')}</span>
    </Link>
  </div>
);

const TagsAndLinks = ({tags}) => (
  <section className="small-11 medium-11 columns">
    {!!tags && tags.length > 0 && <Tags tags={tags} />}
    <ShareLinks />
  </section>
);

const Body = ({summary, body}) => (
  <ReadMore className="page-details__body" summary={summary}>
    <div dangerouslySetInnerHTML={{__html: body}} />
  </ReadMore>
);

const Meta = ({meta}) => (
  <Row>
    <Column small={12} medium={6}>
      <div className="page-details__meta">{meta}</div>
    </Column>
  </Row>
);

const SaveToMyHelsinki = ({onSaveToMyHelsinkiClick}) => (
  <div className="page-details__my-helsinki-actions">
    <a
      href="javascript:void(0);"
      className="page-details__save-to-my-helsinki"
      onClick={onSaveToMyHelsinkiClick}
    >
      <span className="page-details__save-to-my-helsinki-icon" />
      <span className="page-details__save-to-my-helsinki-label">
        {i18n.t('common:saveToMyHelsinki')}
      </span>
    </a>
  </div>
);

const ActionLinks = ({suggestEditLink, suggestRemoveLink, t}) => (
  <div className="page-details__actionLinks">
    <a href={suggestEditLink} target="_blank">
      {t('suggestAnEdit')}
    </a>
    <br />
    <a href={suggestRemoveLink} target="_blank">
      {t('placeIsClosed')}
    </a>
  </div>
);

const Buttons = ({ctaButtons, phone}) => (
  <section className="page-details__buttons">
    {ctaButtons}
    {phone && <PhoneButtons phone={phone} />}
  </section>
);

class PageDetails extends Component {
  props: Props;

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      breakpoint: getFoundationBreakpointUsingWindowWidth(),
    };
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      window.addEventListener('resize', this.updateBreakpoint);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      window.removeEventListener('resize', this.updateBreakpoint);
    }
  }

  updateBreakpoint = () => {
    this.setState({breakpoint: getFoundationBreakpointUsingWindowWidth()});
  };

  render() {
    const {breakpoint} = this.state;
    const {
      title,
      address,
      onSaveToMyHelsinkiClick,
      openingHours,
      type,
      meta,
      summary,
      body,
      contentId,
      ctaButtons,
      phone,
      tags,
      t,
    } = this.props;

    const langCode = contentId ? contentId : '';
    const suggestEditLink = `https://places.myhelsinki.fi/TeeIlmoitus?paikka_id=${langCode}${
      i18n.language === 'en' ? '&lcid=1033' : '&lcid=1035'
    }`;
    const suggestRemoveLink = `https://places.myhelsinki.fi/TeePoistoIlmoitus?paikka_id=${langCode}${
      i18n.language === 'en' ? '&lcid=1033' : '&lcid=1035'
    }`;

    return (
      <div className="page-details">
        <Row>
          <Column small={12} medium={8}>
            <TitleBar title={title} address={address} />
            {meta && <Meta meta={meta} />}
            {breakpoint !== 'small' && <Body summary={summary} body={body} />}
            {breakpoint !== 'small' && <TagsAndLinks tags={tags} />}
            {breakpoint !== 'small' && showActionLinks(i18n.language, type) && (
              <ActionLinks
                suggestEditLink={suggestEditLink}
                suggestRemoveLink={suggestRemoveLink}
                t={t}
              />
            )}
          </Column>
          <Column small={12} medium={4}>
            {!!onSaveToMyHelsinkiClick && (
              <SaveToMyHelsinki onSaveToMyHelsinkiClick={onSaveToMyHelsinkiClick} />
            )}
            <Buttons phone={phone} ctaButtons={ctaButtons} />
            <OpeningHours2 data={openingHours} breakpoint={breakpoint} />
            {breakpoint === 'small' && <Body summary={summary} body={body} />}
            {breakpoint === 'small' && <TagsAndLinks tags={tags} />}
            {breakpoint === 'small' && showActionLinks(i18n.language, type) && (
              <ActionLinks
                suggestEditLink={suggestEditLink}
                suggestRemoveLink={suggestRemoveLink}
                t={t}
              />
            )}
          </Column>
        </Row>
      </div>
    );
  }
}

export default flowRight(
  translate('place'),
  withRouter,
)(PageDetails);
