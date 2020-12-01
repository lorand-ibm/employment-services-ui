import React, {Component} from 'react';
const { useRef } = React;
import ReactPlayer from 'react-player/lazy';
import Modal from '../../modal/Modal';

type Props = {
  paragraph: Object,
};

export class EmbeddedVideo extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      play: false,
      full: false
    };
  }

  onStart = () => {
    this.setState({play: true, full: true});
  };

  onEnded = () => {
    this.setState({play:false, full: false});
  };

  onClose = () => {
    this.setState({play:false, full: false});
  };

  getId = () => {
    const {x} = this.props;
    return 'myhki-player_' + x.toString();
  };

  render() {
    const {x, videoUrl, height, width} = this.props;
    const maxHeight = height ? height : 315;
    const maxWidth = width ? width : 560;

    let color1 = this.props.colorBackground ? this.props.colorBackground : 'white';
    let color2 = this.props.colorBackground2 ? this.props.colorBackground2 : 'white';

    if (this.state.play) {
      return (
        <Modal
          className="embedded-video-popup"
          isOpen={true}
          close={this.onClose}
          contentLabel="video"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={false}
          xIconRowStyle={{maxWidth: '100%'}}
          style={{
           overlay: {
             position: 'fixed',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'right',
             padding: '0',
             top: '0',
             left: '0',
             right: '0',
             maxWidth: '100%',
             width: '100%',
             backgroundColor: 'black',
             color: 'white',
             margin: '0 auto',
             borderRadius: '4px',
             outline: 'none',
             arialLabel: 'video',
           },
           content: {
             maxWidth: '100%',
             maxHeight: '95%',
             width: '100%',
             height: '95%',
             padding: '5px',
             alignItems: 'right',
           }
         }}
        >
          <ReactPlayer
            ref='player'
            url={videoUrl}
            height={'100%'}
            width={'100%'}
            controls
            onStart={this.onStart}
            onEnded = {this.onEnded}
            id={'react-player_' + x}
            playing
          />
      </Modal>
      );
    }
    else {
      return (
        <div className='myhki-paragraph myhki-paragraph--embedded-video'>
          <div className='myhki-paragraph--embedded-video-div-wrapper'
             style={{background: "linear-gradient(to right, "+color1+" 50%, "+color2+" 50%, "+color2+" 100%)"}}>
            <div
              id={this.getId()}
              style={{
                maxHeight: maxHeight + 'px',
                maxWidth: maxWidth + 'px',
                margin: 'auto',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  paddingTop: (maxHeight / maxWidth) * 100 + '%',
                }}
              >
                <div className="myhki-paragraph--embedded-video-player-container">
                  <ReactPlayer
                    ref='player'
                    url={videoUrl}
                    height={'100%'}
                    width={'100%'}
                    controls
                    onStart={this.onStart}
                    onEnded={this.onEnded}
                    id={'react-player_' + x}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default EmbeddedVideo;
