import React from "react";
import { Card } from "hds-react/components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CallIcon from "@material-ui/icons/CallOutlined";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: any) => ({
  title: {
    color: "black",
    background: "white",
    fontFamily: "HelsinkiGrotesk",
    borderColor: "red",
    marginBottom: 0,
  },
  text: {
    fontSize: 16,
    fontFamily: "HelsinkiGrotesk",
  },
  textArea: {
    margin: 0,
    padding: 0,
  },
  button: {
    color: "black",
    background: "white",
  },
  icon: {
    marginTop: 15,
  },
}));

interface PhoneNumberBoxProps {
  text: string;
  title: string;
}

function PhoneNumberBox(props: PhoneNumberBoxProps) {
  const classes = useStyles();
  const { title, text } = props;

  return (
    <>
      <Card border heading={title} className={classes.title}>
        <Grid
          container
          spacing={1}
          justify="flex-start"
          className={classes.textArea}
        >
          <Grid item>
            {" "}
            <CallIcon className={classes.icon} />{" "}
          </Grid>
          <Grid item>
            {" "}
            <Typography
              dangerouslySetInnerHTML={{ __html: text }}
              className={classes.text}
            />{" "}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default PhoneNumberBox;
