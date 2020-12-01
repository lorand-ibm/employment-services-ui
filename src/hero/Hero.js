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
      lineHeight: 0,
      marginRight: '4rem',
      marginLeft: '4rem',
    }}
   >
    <div className="myhki-hero__wrapper" >
      <div>
        <h1 className="myhki-hero__title">{'Työllisyyden kuntakokeilu alkaa 2021'}</h1>
      </div>
      <div className="myhki-hero__subtitle">
        Helsingin työllisyyspalveluiden tavoitteena on edistää nykyistä tehokkaammin työttömien työnhakijoiden työllistymistä ja koulutukseen ohjautumista, sekä touda uusia ratkaisuja osaavan työvoiman saatavuuteen.
      </div>
    </div>
    <div
      className={classNames('myhki-hero', className, 'myhki-diagonal-koro' )}
      style={{
        background: background || 'transparent',
        backgroundImage: headerImage,
        backgroundColor: color,
      }}
    />
    <svg id="clip" width='0' height='0'>
        <defs>
          <polygon id="poly" points="0.39,1 0.69,0 1,0 1,1"/>
          <path id="arch" transform="scale(1,5) rotate(146.3)"
                d="M0,0
                     h.144v.0019
                     C.108,.0019,.108,.021,.072,.021
                     S.036,.0019,0,.0019S.036,.0019,0,.0019
                     V0z
                     " />
        </defs>

          <defs>
            <clipPath id="koros" clipPathUnits="objectBoundingBox">
              <use href="#poly" />
              <use href="#arch" fill="yellow" transform="translate(0.45,.8) "/>
              <use href="#arch" fill="yellow" transform="translate(0.55,.48) "/>
              <use href="#arch" fill="yellow" transform="translate(0.66,.13) "/>
              <use href="#arch" fill="yellow" transform="translate(0.76,-.22) "/>
            </clipPath>
          </defs>
  </svg>


  </div>
);

export default withRouter(Hero);
