import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: any) => ({
  text: {
    fontSize: '16px',
  }
}));

interface TextProps {
  text: string;
}

function Text(props: TextProps) {
    const classes = useStyles();
    const { text } = props;

    return (
      <>
        <Typography className={classes.text} dangerouslySetInnerHTML={{__html:text}}>
        </Typography>
      </>
    );
}

export default Text;
