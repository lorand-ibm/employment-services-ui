import React from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import {Row, Column} from 'react-foundation';
import ReactPlayer from 'react-player/lazy';

type Props = {
  className: String,
  video: Object,
};

const SimpleVideo = ({className, video}: Props) => (
  <div className={classNames('myhki-simple-video', className)}>
    <Row>
      <Column>
        <div className={classNames('myhki-simple-video__video', video.type)}>
          {!!video.url && (
            <div className="myhki-simple-video__video-wrapper">
              <ReactPlayer url={video.url} width="100%" height="100%" controls />
            </div>
          )}
        </div>
        <div className="myhki-simple-video__video-info">
          <div className="myhki-simple-video__video-title">
            <div dangerouslySetInnerHTML={{__html: video.title}} />
          </div>
        </div>
      </Column>
    </Row>
  </div>
);

export default withRouter(SimpleVideo);
