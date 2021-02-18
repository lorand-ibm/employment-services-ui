import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconLocation } from "hds-react";

interface LocationProps {
  location: string;
}

const useStyles = makeStyles((theme: any) => ({
  container: () => ({
    display: "flex",
    color: "black",
  }),
  icon: () => ({
    marginRight: 5,
  }),
}));

function Location(props: LocationProps) {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <IconLocation className={classes.icon} />
      <div>Internet</div>
    </div>
  );
}

export default Location;
