import React from 'react';
import classNames from 'classnames';

type Props = {
  className: String,
  centered: Boolean,
  type: String,
  sourceTitle: String,
  sourceText: String,
  sourceImage: String,
  children: Object,
};

const getSourceIcon = sourceText => {
  switch (sourceText) {
    case 'twitter':
      return (
        <div
          className={`myhki-simple-quote__source-icon myhki-simple-quote__source-icon-${sourceText}`}
        />
      );
    default:
      return null;
  }
};

const QuoteTypeBasic = ({
  className,
  centered,
  sourceText,
  sourceTitle,
  sourceImage,
  children,
}: Props) => (
  <div
    className={classNames('myhki-simple-quote', className, {
      'myhki-simple-quote--centered': centered,
      'myhki-simple-quote--type-quote': sourceText !== 'twitter',
      'myhki-simple-quote--type-twitter': sourceText === 'twitter',
      'myhki-simple-quote--source-image': sourceImage && !sourceText,
      'myhki-simple-quote--source-text': !sourceImage && sourceText,
      'myhki-simple-quote--source-full': sourceImage && sourceText,
    })}
  >
    {getSourceIcon(sourceText)}
    <blockquote className="myhki-simple-quote__body">
      {children}
    </blockquote>
    <div className="myhki-simple-quote__source">
      <div className="source-image">{sourceImage && <img src={sourceImage} alt="" />}</div>
      <div className="source-text">{sourceText}</div>
      <div className="source-title">{sourceTitle}</div>
    </div>
  </div>
);
export default QuoteTypeBasic;
