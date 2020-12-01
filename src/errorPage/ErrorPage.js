import React from 'react';
import {Row, Column} from 'react-foundation';
import {translate, Interpolate} from 'react-i18next';
import flowRight from 'lodash/flowRight';

import {Colors, KoroTypes} from '../constants';

import errorImage from '../../assets/images/error-heart.svg';
import Hero from '../hero/Hero';

type Props = {
  t: Function,
};

const ErrorPage = ({t}: Props) => (
  <div className="error-page">
    <Hero background={`url("${errorImage}") ${Colors.HEL_ENGEL}`} koroType={KoroTypes.PYRAMID} />
    <Row>
      <Column>
        <h1>{t('title')}</h1>
        <Row>
          <Column medium={6} offsetOnMedium={3}>
            <p>
              <Interpolate i18nKey="description" useDangerouslySetInnerHTML={true} />
            </p>
          </Column>
        </Row>
      </Column>
    </Row>
  </div>
);

export default flowRight(translate('error'))(ErrorPage);
