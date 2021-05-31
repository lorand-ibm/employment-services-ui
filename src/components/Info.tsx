import React from "react";
import { Notification } from "hds-react/components/Notification";
import Typography from "@material-ui/core/Typography";

interface InfoProps {
  title: string;
  text: string;
}

function Info(props: InfoProps): JSX.Element {
  const { title, text } = props;

  return (
    <>
      <Notification
        label={title}
        style={{
          fontFamily: "HelsinkiGrotesk",
          fontSize: "18px",
          fontWeight: "bold",
          paddingTop: "32px",
          paddingBottom: "24px",
        }}
      >
        <Typography dangerouslySetInnerHTML={{ __html: text }} />
      </Notification>
    </>
  );
}

export default Info;
