import React from 'react';
import Questionnaire from '../../questionnaire/Questionnaire';

type Props = {
  paragraph: Object,
};

const QuestionnaireParagraph = ({paragraph}: Props) => (
  <div className="myhki-paragraph myhki-paragraph--questionnaire">
    <Questionnaire
      description={description}
      thankYou={thankYou}
      submitEmail={submitEmail}
      buttonLabel={buttonLabel}
      questions={questions}
      colorScheme={colorScheme}
    />
  </div>
);

export default QuestionnaireParagraph;
