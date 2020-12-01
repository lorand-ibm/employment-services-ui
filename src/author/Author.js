import React from 'react';
import flowRight from 'lodash/flowRight';
import {translate} from 'react-i18next';

type Props = {
  t: Function,
  author: Object,
};

const Author = ({t, author}: Props) => (
  <div className="myhki-author">
    {!!author.image && (
      <div
        className="myhki-author__image"
        style={{
          backgroundImage: `url("${author.image}")`,
        }}
      />
    )}
    <div className="myhki-author__wrapper">
      <span className="myhki-author__label">{t('label')}</span>
      <span className="myhki-author__name">{author.name}</span>
      {!!author.title && <span className="myhki-author__title">{author.title}</span>}
    </div>
  </div>
);

export default flowRight(translate(['author']))(Author);
