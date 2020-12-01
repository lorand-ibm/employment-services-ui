import React from 'react';

type Props = {
  author: string,
  authorUrl: string,
  text: string,
  tweetUrl: string,
};

const TwitterQuote = ({author, authorUrl, text, tweetUrl}: Props) => (
  <div className="myhki-twitter-quote">
    <div className="myhki-twitter-quote__source-icon-twitter">
      <a href={tweetUrl} className="icon-link" target="_blank" rel="noopener noreferrer" />
    </div>
    {text && (
      <blockquote className="myhki-twitter-quote__body">
        <p dangerouslySetInnerHTML={{__html: text}} />
      </blockquote>
    )}
    {author && authorUrl && (
      <div className="myhki-twitter-quote__source">
        <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="source-author">
          {author}
        </a>
      </div>
    )}
  </div>
);

export default TwitterQuote;
