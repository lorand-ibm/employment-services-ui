import React from 'react';
import i18n from '../root/i18n';
import classNames from 'classnames';

interface LikeMarkerProps {
  showSustainabilityMarker: boolean;
  small?: boolean;
}

class LikeMarker extends React.Component<LikeMarkerProps> {
  render() {
    const {showSustainabilityMarker, small} = this.props;

    return (
      <>
        <div
          title={
            showSustainabilityMarker ? i18n.t('sustainabilityMarker:sustainableService') : null
          }
          className={classNames(
            'myhki-like-marker__shadow',
            `myhki-like-marker__shadow--size-${small ? 'small' : 'normal'}`,
            {'myhki-like-marker__shadow--sustainability': showSustainabilityMarker},
          )}
        >
          {showSustainabilityMarker && i18n.t('sustainabilityMarker:sustainableService')}
        </div>
      </>
    );
  }
}

export default LikeMarker;
