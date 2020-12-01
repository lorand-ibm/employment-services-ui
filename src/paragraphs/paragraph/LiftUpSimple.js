import React from 'react';
import LiftUpSimple from '../../liftUps/LiftUpSimple';

type Props = {
  paragraph: Object,
};

const LiftUpSimpleParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--lift-up-simple">
    <LiftUpSimple
      title={paragraph.title}
      link={paragraph.link}
      image={paragraph.image}
      backgroundImage={paragraph.backgroundImage}
      colorScheme={paragraph.colorScheme}
      flip={paragraph.flip}
    />
  </div>
);

export default LiftUpSimpleParagraph;
