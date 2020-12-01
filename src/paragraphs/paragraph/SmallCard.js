import React from 'react';
import i18n from '../../root/i18n';
import {Link} from 'react-router';

import {Colors} from '../../constants';

type Props = {
  paragraph: Object,
};

const SmallCard = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--small-card">
    <Link
      className="myhki-paragraph--small-card__image"
      to={paragraph.link}
      style={{
        background: paragraph.heart
          ? paragraph.heart
          : `${paragraph.image ? paragraph.image : ''} ${
            paragraph.color ? paragraph.color : Colors.HEL_SILVER
          }`,
      }}
    >
      {!paragraph.image && !!paragraph.placeholder && paragraph.placeholder}
    </Link>
    <div className="myhki-paragraph--small-card__wrapper">
      <div className="myhki-paragraph--small-card__header">{paragraph.header}</div>
      <h3 className="myhki-paragraph--small-card__title">
        <Link to={paragraph.link}>{paragraph.title}</Link>
      </h3>
      <div className="myhki-paragraph--small-card__description">{paragraph.location}</div>
      <div className="myhki-paragraph--small-card__footer">
        {!!paragraph.onHeartClick && (
          <a
            href="javascript:void(0);"
            className="myhki-paragraph--small-card__save-to-my-helsinki"
            onClick={paragraph.onHeartClick}
          >
            <span className="myhki-paragraph--small-card__save-to-my-helsinki-icon" />
            <span className="myhki-paragraph--small-card__save-to-my-helsinki-label">
              {i18n.t('common:saveToMyHelsinki')}
            </span>
          </a>
        )}
      </div>
    </div>
  </div>
);

export default SmallCard;
