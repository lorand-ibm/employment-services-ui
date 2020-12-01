import React, {PureComponent} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import {Colors, KoroTypes} from '../constants';
import {
  getContentTitle,
  getContentCoverImage,
  getContentLinkListItems,
  getStaffUnits,
  getContentBreadcrumbs,
} from '../content/helpers';

import DisplayThisSection from '../displayThisSection/DisplayThisSection';
import Hero from '../hero/Hero';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LinkList from '../linkList/LinkList';
import Koro from '../koro/Koro';
import StaffBlocks from '../staffBlocks/StaffBlocks';
import DirectionsBlock from '../directionsBlock/DirectionsBlock';
import Addresses from '../addresses/Addresses';

type Props = {
  content: Object,
};

class ContactSubpage extends PureComponent {
  props: Props;

  componentDidMount() {
    if (global.IS_CLIENT) {
      console.log('Contact subpage: %o', this.props.content);
    }
  }

  getLinkListProps = () => {
    const {content} = this.props,
      items = getContentLinkListItems(content);

    return items.length
      ? {
        title: get(content, 'field_link_list_title'),
        items: items,
      }
      : null;
  };

  getHeroBackground = () => {
    const {content} = this.props,
      heroImageData = getContentCoverImage(content);

    return heroImageData ? `url("${heroImageData}")` : null;
  };

  getCoordinates = () => {
    const {content} = this.props,
      geolocationData = get(content, 'field_geolocation[0]');

    return geolocationData
      ? {
        lat: Number(geolocationData.lat),
        lng: Number(geolocationData.lng),
      }
      : null;
  };

  getStaffBlocksPropsProps = () => {
    const {content} = this.props,
      items = getStaffUnits(content);

    return {
      title: get(content, 'field_staff_title'),
      items: items,
    };
  };

  render() {
    const {content} = this.props,
      heroBackground = this.getHeroBackground(),
      description = get(content, 'field_formatted_description'),
      linkListProps = this.getLinkListProps(),
      locationAddress = get(content, 'field_location_address'),
      addressesProps = get(content, 'field_addresses'),
      staffBlocksProps = this.getStaffBlocksPropsProps();

    return (
      <div className="subpage subpage--contact">
        <DisplayThisSection when={!!heroBackground}>
          <Hero background={heroBackground} koroColor="#ffffff" title={getContentTitle(content)} />
        </DisplayThisSection>

        <Row>
          <Column>
            <Breadcrumbs items={getContentBreadcrumbs(content)} />
          </Column>
        </Row>

        <DisplayThisSection when={!!description[0] && !!description[0].value}>
          <Row>
            <Column>
              <div
                className="subpage--contact__description"
                dangerouslySetInnerHTML={{__html: description[0].value}}
              />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!!locationAddress}>
          <div className="subpage--contact__info-block">
            <Row>
              <Column>
                <DirectionsBlock
                  coordinates={this.getCoordinates()}
                  addressObj={{streetAddress: locationAddress}}
                />
              </Column>
            </Row>
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!!addressesProps}>
          <Row>
            <Column>
              <Addresses items={addressesProps} />
            </Column>
          </Row>
        </DisplayThisSection>

        <DisplayThisSection when={!isEmpty(staffBlocksProps)}>
          <div className="staff">
            <Koro
              type={KoroTypes.BASIC_WAVE}
              color={Colors.LIGHT_BLUE}
              className="koro-1"
              flip={true}
            />
            <div className="staff__wrapper">
              <Row>
                <Column>
                  <StaffBlocks className="contact-staff-blocks" {...staffBlocksProps} />
                </Column>
              </Row>
            </div>
            <Koro type={KoroTypes.BASIC_WAVE} color={Colors.LIGHT_BLUE} className="koro-2" />
          </div>
        </DisplayThisSection>

        <DisplayThisSection when={!isEmpty(linkListProps)}>
          <Row>
            <Column>
              <LinkList {...linkListProps} />
            </Column>
          </Row>
        </DisplayThisSection>
      </div>
    );
  }
}

export default ContactSubpage;
