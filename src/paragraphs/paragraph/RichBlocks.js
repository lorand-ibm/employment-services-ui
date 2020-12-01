import React from 'react';
import RichBlocks from '../../richBlocks/RichBlocks';

type Props = {
  paragraph: Object,
};

// @todo RichBlocks component normally shows a background. However, we can't
//   really add the background to this version of the component because this
//   component is shown inside grid and therefore it doesn't stretch to the
//   full width of the page. We should somehow refactor the code so that we
//   are able to show the background. See 'theme/ThemePage.js' for an example
//   on how the background is added to RichBlocks component.
const RichBlocksParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--rich-blocks">
    <RichBlocks items={paragraph.items} collapseMargins={true} />
  </div>
);

export default RichBlocksParagraph;
