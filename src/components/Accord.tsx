import React from "react";
import { Accordion } from "hds-react/components/Accordion";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "16px",
  },
}));

function Accord(props: { text: string; title: string }) {
  const classes = useStyles();
  const { title, text } = props;

  return (
    <>
      <Accordion
        heading={title}
        theme={{
          "--header-font-color": "#0E00BF",
          "--header-font-size": "18px",
        }}
      >
        <Typography dangerouslySetInnerHTML={{ __html: text }} component="div" className={classes.text} />
      </Accordion>
    </>
  );
}

export default Accord;
