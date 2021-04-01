import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DateComponent } from "./Date";

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
  title_color?: string;
  headingTag?: "h1" | "h2" | "h3";
  nodeData?: any;
  showDate?: boolean;
}

export function Mainheading(props: HeadingProps) {
  const classes = useStyles(props);
  const { title, title_color, headingTag, nodeData, showDate } = props;
  const tag = headingTag ? headingTag : "h1";

  return (
    <>
      <Typography variant={tag} component={tag} className={classes.main} style={{ color: title_color }}>
        {title}
      </Typography>
      {showDate && <DateComponent startTime={nodeData.created} />}
    </>
  );
}

export function Subheading(props: HeadingProps) {
  const classes = useStyles(props);
  const { title, title_color, headingTag } = props;
  const tag = headingTag ? headingTag : "h2";

  return (
    <>
      <Typography variant={tag} component={tag} className={classes.sub} style={{ color: title_color }}>
        {title}
      </Typography>
    </>
  );
}
