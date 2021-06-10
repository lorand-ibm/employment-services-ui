import React from "react";
import { IconArrowRight, IconLinkExternal } from "hds-react";

function IconLink({ href, text }: { href: string; text: string }): JSX.Element {
  const isExternalLink =
    href && (href.startsWith("https://") || href.startsWith("https://"));
  return (
    <a
      href={href}
      style={{
        display: "flex",
        fontSize: "16px",
        textDecoration: "none",
        fontFamily: "HelsinkiGrotesk",
      }}
    >
      <span style={{ padding: "1px 5px 0 0" }}>{text}</span>
      {isExternalLink ? <IconLinkExternal /> : <IconArrowRight />}
    </a>
  );
}

export default IconLink;
