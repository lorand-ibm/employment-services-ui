import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  text: (props: TextProps) => ({
    fontSize: props.type === "Lead" ? 20 : 16,
    "& h2": {
      fontSize: 28,
    },
    "& h3": {
      fontSize: 24,
    },
    "& h4": {
      fontSize: 20,
    },
    "& h5": {
      fontSize: 18,
    },
    "& h6": {
      fontSize: 16,
    },
  }),
}));

interface TextProps {
  text: string;
  type: string;
}

function Text(props: TextProps): JSX.Element {
  const classes = useStyles(props);
  const { text, type } = props;

  return (
    <Typography
      className={classes.text}
      component="div"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export default Text;
