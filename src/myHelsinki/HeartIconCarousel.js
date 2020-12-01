// @flow

import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import {translate} from 'react-i18next';
import flow from 'lodash/flow';
import range from 'lodash/range';
import classNames from 'classnames';

import {getHeartIcon} from './helpers';
import {MyHelsinkiHeartColors, CarouselSwipeTolerance, Colors} from '../constants';
import Koro from '../koro/Koro';

type Props = {
  background: string,
  selectedItem: number,
  onSave: Function,
  t: Function,
};

type State = {
  heartNumber: number,
};

const HEART_NUMBERS = range(1, 55);

class HeartIconCarousel extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      heartNumber: props.selectedItem ? Number(props.selectedItem) : 1,
    }
  };

  onChange = (heartNumber: number) => {
    this.setState({heartNumber});
  };

  render() {
    const {t, background} = this.props;
    const selectedHeartNumber = this.state.heartNumber ? Number(this.state.heartNumber) : 1;

    return (
      <div
        className="heart-icon-carousel"
        style={{
          background: background ? `url("${background}")` : Colors.HEL_SUOMENLINNA,
        }}
      >
        <Carousel
          className="heart-icon-carousel__carousel"
          selectedItem={selectedHeartNumber - 1}
          showThumbs={false}
          showArrows={true}
          showIndicators={false}
          showStatus={false}
          useKeyboardArrows={true}
          axis="horizontal"
          swipeScrollTolerance={CarouselSwipeTolerance}
          onClickItem={index => this.onChange(index + 1)}
          onChange={index => this.onChange(index + 1)}
        >
          {HEART_NUMBERS.map(heartNumber => (
            <div className="heart-icon-carousel__slide" key={heartNumber}>
              <img
                className={classNames(
                  'heart-icon-carousel__heart',
                  `heart-icon-carousel__heart--${heartNumber}`,
                )}
                src={getHeartIcon(heartNumber, MyHelsinkiHeartColors.WHITE)}
              />
            </div>
          ))}
        </Carousel>
        <div className="heart-icon-carousel__buttons">
          <button
            onClick={() => this.props.onSave(this.state.heartNumber)}
            className={'heart-icon-carousel__save-button'}
          >
            {t('save')}
          </button>
        </div>
        <Koro color="#ffffff" flip />
      </div>
    );
  }
}

export default flow(translate(['common']))(HeartIconCarousel);
