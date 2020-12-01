import React from 'react';
import classNames from 'classnames';

type Props = {
  children: Object,
  className: String,
  fieldTitle?: string,
  sourceImage: String,
  sourceText: String,
  sourceTitle: String,
};

const QuoteTypeTitleFirst = ({
  className,
  sourceText,
  sourceTitle,
  sourceImage,
  children,
  fieldTitle,
}: Props) => (
  <div
    className={classNames('myhki-simple-quote', className, {
      'myhki-simple-quote--type-quote': true,
      'myhki-simple-quote--source-image': sourceImage && !sourceText,
      'myhki-simple-quote--source-text': !sourceImage && sourceText,
      'myhki-simple-quote--source-full': sourceImage && sourceText,
    })}
  >
    <div className="source-title">{sourceTitle}</div>
    <blockquote className="myhki-simple-quote__body">
      {children}
    </blockquote>
    <div className="myhki-simple-quote__source">
      <div className="source-image">{sourceImage && <img src={sourceImage} alt="" />}</div>
      <div className="source-text">{sourceText}</div>
      <div className="source-text">{fieldTitle}</div>
    </div>
  </div>
);

export default QuoteTypeTitleFirst;
