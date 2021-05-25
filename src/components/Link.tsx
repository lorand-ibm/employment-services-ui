import React from "react";

import { IconArrowRight, IconLinkExternal } from "hds-react";

function Link({ url, text }: { url: string, text: string }) {
  const isExternalLink = url && (url.startsWith("https://") || url.startsWith("https://"));
  return (
    <a href={url} style={{ display: "flex", fontSize: "16px", textDecoration: "none", fontFamily: "HelsinkiGrotesk" }}>
      <span style={{ padding: "1px 5px 0 0" }}>{text}</span>
      {isExternalLink ? <IconLinkExternal /> : <IconArrowRight />}
    </a>
  );
}

export default Link;
