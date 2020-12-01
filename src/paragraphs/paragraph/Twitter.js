import React from 'react';
import TweetEmbed from 'react-tweet-embed';

type Props = {
  paragraph: Object,
};

const Twitter = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--twitter">
    <TweetEmbed id={paragraph.id} />
  </div>
);

export default Twitter;
