import React from 'react';
import {withRouter} from 'react-router';
import ReactPlayer from 'react-player/lazy';
import classNames from 'classnames';

import Koro from '../koro/Koro';

import {KoroTypes} from '../constants';

type Props = {
  className: String,
  subtitle: any,
  video: String,
  title: String,
  background: String,
  koroColor: String,
  koroType: String,
  headerImage: String,
  color: String,
};

const Hero = ({
                className,
                subtitle,
                title,
                background,
                video,
                koroColor = '#ffffff',
                koroType = KoroTypes.DIAGONAL,
                headerImage,
                color,
              }: Props) => (

  <div className={classNames('myhki-hero__container' )}
       style={{
         backgroundColor: color,
         lineHeight: 0
       }}
  >

    <div className="myhki-hero__wrapper hero-large" >
      <div>
        <h1 className="myhki-hero__title">{title}</h1>
      </div>
      <div className="myhki-hero__subtitle">
        {subtitle}
      </div>
    </div>
    <div
      className={classNames('myhki-hero', className, 'myhki-diagonal-koro', 'hero-large' )}
      style={{
        background: background || 'transparent',
        backgroundImage: headerImage,
        backgroundColor: color,
        heigth: '800px',
      }}
    />

    <div className="myhki-hero__wrapper column hero-small" >
      <div>
        <h1 className="myhki-hero__title row">{'Työllisyyden kuntakokeilu alkaa 2021'}</h1>
      </div>
      <div className="myhki-hero__subtitle row">
        Helsingin työllisyyspalveluiden tavoitteena on edistää nykyistä tehokkaammin työttömien työnhakijoiden työllistymistä ja koulutukseen ohjautumista, sekä tuoda uusia ratkaisuja osaavan työvoiman saatavuuteen.
      </div>
    </div>
    <div
      className={classNames('myhki-hero', className, 'hero-small', 'row')}
      style={{
        background: background || 'transparent',
        backgroundImage: headerImage,
        backgroundColor: color,
        heigth: '800px',
      }}
      >
      <Koro className={'hero-small-koro row hero-small'} color={'#D0E6F7'} />
    </div>

  </div>
);

export default withRouter(Hero);
