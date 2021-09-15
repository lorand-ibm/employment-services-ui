import React from "react";
import { Notification } from "hds-react/components/Notification";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  infoText: () => ({
    wordBreak: "break-word",
  }),
}));

interface InfoProps {
  title: string;
  text: string;
}

function Info(props: InfoProps): JSX.Element {
  const classes = useStyles();
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
        <Typography 
          className={classes.infoText}
          dangerouslySetInnerHTML={{ __html: text }} />
      </Notification>
    </>
  );
}

export default Info;
