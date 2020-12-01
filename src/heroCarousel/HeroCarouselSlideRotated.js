import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import ReactPlayer from 'react-player/lazy';
import {translate} from 'react-i18next';
import flowRight from 'lodash/flowRight';
import {LazyBackground} from '../lazyImage/LazyImage';
import {getFoundationBreakpoint} from '../helpers';
import get from 'lodash/get';
import LinkDuo from '../linkduo/LinkDuo';

type Props = {
  t: Function,
  className: String,
  slide: Object,
  hidden: Boolean,
  colorScheme: Object,
};

class HeroCarouselSlideRotated extends Component {
  props: Props;

  static defaultProps = {
    colorScheme: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      action: 'setWrapperWidth',
      breakpoint: getFoundationBreakpoint(),
      width: null,
      scale: 1,
    };
  }

  windowResizeHandler() {
    // @todo Is there a way to define the state defaults once, and then refer to
    //   those defaults in the constructor and also in this method?
    this.setState({
      action: 'setWrapperWidth',
      breakpoint: getFoundationBreakpoint(),
      width: null,
      scale: 1,
    });
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      window.addEventListener('resize', this.windowResizeHandler.bind(this));
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      window.removeEventListener('resize', this.windowResizeHandler.bind(this));
    }
  }

  componentDidUpdate() {
    const action = this.state.action;
    if (action === 'setWrapperWidth') {
      this.setWrapperWidth();
    }
    else if (action === 'setWrapperScale') {
      this.setWrapperScale();
    }
  }

  /**
   * Sets the width of wrapperMain element.
   *
   * Text inside the wrapper needs to be shown as a horizontal rectangle. We
   * want to avoid showing the text as a square or as a vertical rectangle.
   *
   * This method checks the aspect-ratio of the wrapper and increases its width
   * until the minimum aspect ratio is reached.
   *
   * When the aspect-ratio is correct, this method changes the "action" to
   * "setWrapperScale" which will ensure that the wrapper fits inside its parent.
   */
  setWrapperWidth() {
    const isMobile = (this.state.breakpoint === 'small');
    const wrapperMain = this.wrapperMainElement;
    const wrapperAspecRatio = wrapperMain.clientWidth / wrapperMain.clientHeight;
    const minimumAspectRatio = (isMobile) ? 3 : 2;
    if (wrapperAspecRatio < minimumAspectRatio) {
      const width = wrapperMain.clientWidth + 50;
      this.setState({width});
    }
    else {
      this.setState({action: 'setWrapperScale'});
    }
  }

  /**
   * Sets the scale value of wrapperScale element.
   *
   * Text inside the wrapper is sometimes too large for the space it has. This
   * method compares those sizes and sets a scale value of 0-1.
   *
   * Note: We must use getBoundingClientRect() instead of clientHeigh because
   * we are working with rotated elements. This way we get the actual space the
   * element needs.
   */
  setWrapperScale() {
    const slide = this.slideElement;
    const wrapperRotate = this.wrapperRotateElement;
    const slideHeight = slide.clientHeight;
    const wrapperHeight = wrapperRotate.getBoundingClientRect()['height'];
    const availableHeight = slideHeight * 0.75;
    let scale = 1;
    if (wrapperHeight !== availableHeight) {
      scale = availableHeight / wrapperHeight;
    }
    this.setState({scale, action: null});
  }

  render() {
    const {t, className, slide, hidden, colorScheme} = this.props;

    const {scale, width} = this.state;
    const styleWrapperMain = {minWidth: width, color: get(colorScheme, 'text')};
    const styleWrapperScale = {transform: `scale(${scale})`};
    const styleReadMoreScale = {transform: `scale(${1 / scale})`};
    const styleBackground = {backgroundColor: get(colorScheme, 'background')};
    const styleButton = {color: get(colorScheme, 'button')};

    return (
      <div className={classNames(className, 'myhki-hero-carousel-slide-rotated')} ref={elem => this.slideElement = elem}>
        <LazyBackground
          children={[]}
          background={slide.background}
          className="myhki-hero-carousel-slide-rotated__bg"
        />
        {!!slide.video && (
          <div className="myhki-hero-carousel-slide-rotated__video">
            <ReactPlayer
              fileConfig={{attributes: {autoPlay: true, muted: true}}}
              playsinline={true}
              url={slide.video}
              width="100%"
              height="100%"
              loop={slide.loop}
              volume={0}
              playing={!hidden}
            />
          </div>
        )}

        <div className="myhki-hero-carousel-slide-rotated__wrapper-main" ref={elem => this.wrapperMainElement = elem} style={styleWrapperMain}>
          <div className="myhki-hero-carousel-slide-rotated__wrapper-scale" style={styleWrapperScale}>
            <div className="myhki-hero-carousel-slide-rotated__wrapper-rotate" ref={elem => this.wrapperRotateElement = elem}>
              <div className="myhki-hero-carousel-slide-rotated__background" style={styleBackground} />
              <h1 className="myhki-hero-carousel-slide-rotated__title">
                {slide.link ? (
                  <LinkDuo to={slide.link} onlyActiveOnIndex={true}>{slide.title}</LinkDuo>
                ) : (
                  <span>{slide.title}</span>
                )}
              </h1>
              {!!slide.link && (
                <div className="myhki-hero-carousel-slide-rotated__read-more-main">
                  <div className="myhki-hero-carousel-slide-rotated__read-more-scale" style={styleReadMoreScale}>
                    <LinkDuo className="myhki-hero-carousel-slide-rotated__read-more-button" style={styleButton} to={slide.link} onlyActiveOnIndex={true}>
                      {t('readMore')}
                    </LinkDuo>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default flowRight(
  withRouter,
  translate(['common']),
)(HeroCarouselSlideRotated);
