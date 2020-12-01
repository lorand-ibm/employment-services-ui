import React from 'react';
import TweetEmbed from 'react-tweet-embed';

type Props = {
  id: Number,
};

const Twitter = ({id}: Props) => (
  <div className="myhki-twitter">
    <TweetEmbed
      id={id}
      options={{
        cards: 'hidden',
        align: 'center',
      }}
    />
  </div>
);

export default Twitter;
