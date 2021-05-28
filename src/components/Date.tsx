import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dateformat from "dateformat";
import { IconClock } from "hds-react";

const useStyles = makeStyles((theme: any) => ({
  container: () => ({
    display: "flex",
    color: "black",
  }),
  container2: () => ({
    color: "black",
    marginLeft: 10,
  }),
  icon: () => ({
    marginRight: 5,
  }),
  text: () => ({
    paddingTop: 1,
  }),
  date: (props: DateProps) => ({
    color: "#666",
    fontSize: props.size === "large" ? 18 : 16,
    lineHeight: 1.6875,
    paddingTop: 16,
  }),
}));

export interface DateProps {
  startTime: string;
  endTime?: string;
  size?: string;
}

export function DateWithIcon(props: DateProps) {
  const classes = useStyles(props);

  const { startTime, endTime = "" } = props;

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const isSameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

  const noEndTime = !endTime;

  if (noEndTime) {
    return (
      <div className={classes.container}>
        <IconClock className={classes.icon} />
        <div className={classes.text}>{`${dateformat(
          startTime,
          "dd.mm.yyyy  -  HH:MM"
        )}`}</div>
      </div>
    );
  }

  if (isSameDay) {
    return (
      <div className={classes.container}>
        <IconClock className={classes.icon} />
        <div className={classes.text}>{`${dateformat(
          startTime,
          "dd.mm.yyyy  -  HH:MM"
        )} - ${dateformat(endTime, "HH:MM")}`}</div>
      </div>
    );
  }
  return (
    <>
      <div className={classes.container}>
        <IconClock className={classes.icon} />
        <div className={classes.text}>
          {dateformat(startTime, "dd.mm.yyyy  - HH:MM")}
        </div>
      </div>
      <div className={classes.container2}>{`-  ${dateformat(
        endDate,
        "dd.mm.yyyy  - HH:MM"
      )}`}</div>
    </>
  );
}

export function DateComponent(props: DateProps) {
  const classes = useStyles(props);
  const { startTime } = props;

  return (
    <div className={classes.container}>
      <div className={classes.date}>{`${dateformat(
        startTime,
        "dd.mm.yyyy · HH:MM"
      )}`}</div>
    </div>
  );
}
