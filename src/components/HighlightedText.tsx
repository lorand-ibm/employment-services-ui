import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: any) => ({
  text: {
    borderLeft: "4px solid #fd4f00",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 1.5,
    padding: "8px 0 8px 2em",
  },
}));

interface HighlightedTextProps {
  text: string;
}

function HighlightedText(props: HighlightedTextProps) {
  const classes = useStyles();
  const { text } = props;

  return (
    <Typography
      className={classes.text}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export default HighlightedText;
