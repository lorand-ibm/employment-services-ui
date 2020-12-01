import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import ReactPlayer from 'react-player';

type Props = {
  className: String,
  slide: Object,
  hidden: Boolean,
};

class VideoCarouselSlide extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden && this.state.playing) {
      this.setState({playing: false});
    }
  }

  render() {
    const {className, slide} = this.props,
      {playing} = this.state;

    return (
      <div className={classNames('myhki-video-carousel-slide', className)}>
        <div className="myhki-video-carousel-slide__inner">
          <div className="myhki-video-carousel-slide__video">
            {!!slide.video && (
              <ReactPlayer
                url={slide.video}
                width="100%"
                height="100%"
                controls
                playing={playing}
                onPlay={() => {
                  this.setState({playing: true});
                }}
              />
            )}
          </div>
          <div className="myhki-video-carousel-slide__video-info">
            <h3 className="myhki-video-carousel-slide__video-title">{slide.title}</h3>
            <div className="myhki-video-carousel-slide__video-description">
              <div dangerouslySetInnerHTML={{__html: slide.description}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VideoCarouselSlide);
