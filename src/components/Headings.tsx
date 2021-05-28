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
    color: props.titleColor,
  }),
  sub: (props: HeadingProps) => ({
    fontSize: 28,
    fontFamily: "HelsinkiGrotesk",
    fontWeight: "bold",
    [theme.breakpoints.only("xs")]: {
      fontSize: 18,
    },
    color: props.titleColor,
  }),
}));

export interface HeadingProps {
  title: string;
  titleColor?: string;
  headingTag?: "h1" | "h2" | "h3";
  nodeData?: any;
  showDate?: boolean;
}

export function Mainheading(props: HeadingProps) {
  const classes = useStyles(props);
  const { title, titleColor, headingTag, nodeData, showDate } = props;
  const tag = headingTag || "h1";

  return (
    <>
      <Typography
        variant={tag}
        component={tag}
        className={classes.main}
        style={{ color: titleColor }}
      >
        {title}
      </Typography>
      {showDate && <DateComponent startTime={nodeData.created} size="large" />}
    </>
  );
}

export function Subheading(props: HeadingProps) {
  const classes = useStyles(props);
  const { title, titleColor, headingTag } = props;
  const tag = headingTag || "h2";

  return (
    <>
      <Typography
        variant={tag}
        component={tag}
        className={classes.sub}
        style={{ color: titleColor }}
      >
        {title}
      </Typography>
    </>
  );
}
