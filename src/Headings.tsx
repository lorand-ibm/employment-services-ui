import PropTypes from "prop-types";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  main: (props: HeadingProps) => ({
    fontSize: 36,
    fontFamily: "HelsinkiGrotesk",
    fontWeight: "bold",
    [theme.breakpoints.only("xs")]: {
      fontSize: 24,
    },
    color: props.title_color,
  }),
  sub: (props: HeadingProps) => ({
    fontSize: 28,
    fontFamily: "HelsinkiGrotesk",
    fontWeight: "bold",
    [theme.breakpoints.only("xs")]: {
      fontSize: 18,
    },
    color: props.title_color,
  }),
}));

interface HeadingProps {
  title: string;
  title_color: string;
}

export function Mainheading(props: HeadingProps) {
  const classes = useStyles(props);
  const { title, title_color } = props;

  return (
    <React.Fragment>
      <Typography variant="h1" component="h1" className={classes.main} style={{ color: title_color }}>
        {title}
      </Typography>
    </React.Fragment>
  );
}

export function Subheading(props: HeadingProps) {
  const classes = useStyles(props);
  const { title, title_color } = props;

  return (
    <React.Fragment>
      <Typography variant="h2" component="h2" className={classes.sub} style={{ color: title_color }}>
        {title}
      </Typography>
    </React.Fragment>
  );
}
