import React from "react";

function SujoEmbedded(props: { training: boolean }) {
  const { training } = props;

  return (
    <div>
      <iframe
        src={training ? "https://www.sujo.fi/pls/sujo/tyoko.training" : "https://www.sujo.fi/pls/sujo/tyoko.salary"}
        height="800px"
        width="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default SujoEmbedded;
