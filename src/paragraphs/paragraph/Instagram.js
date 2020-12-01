import React from 'react';
import InstagramEmbed from 'react-instagram-embed';

type Props = {
  paragraph: Object,
};

const Twitter = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--instagram">
    <InstagramEmbed url={paragraph.url} clientAccessToken={IG_ACCESS_TOKEN} />
  </div>
);

export default Twitter;
