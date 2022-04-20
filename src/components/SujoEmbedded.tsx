import React from "react";

function SujoEmbedded(props: { training: boolean }): JSX.Element {
  const { training } = props;

  return (
    <div>
      <iframe
        title="Sujo"
        src={
          training
            ? "https://tyopa.sujo.fi/pls/sujo/tyoko.training"
            : "https://tyopa.sujo.fi/pls/sujo/tyoko.salary"
        }
        height="800px"
        width="100%"
        frameBorder="0"
      />
    </div>
  );
}

export default SujoEmbedded;
