import React from 'react';
import i18n from '../root/i18n';
import classNames from 'classnames';

interface LikeMarkerButtonProps {
  isLiked?: boolean;
  title: string;
  onLike: () => void;
  showSustainabilityMarker: boolean;
  small?: boolean;
}

const LikeMarkerButton = (props: LikeMarkerButtonProps) => {
  const {small, showSustainabilityMarker, isLiked, title, onLike} = props;
  const baseClassName = `myhki-like-marker__like${small ? '-small' : ''}`;
  return (
    <button
      className={classNames(baseClassName, {
        'myhki-like-marker__like--sustainability': showSustainabilityMarker,
        [`${baseClassName}--liked`]: isLiked,
      })}
      onClick={onLike}
      aria-label={i18n.t('common:saveToMyHelsinki') + ' ' + `${title}`}
    ></button>
  );
};

export default LikeMarkerButton;
