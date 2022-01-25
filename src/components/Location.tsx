import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconLocation } from "hds-react";

interface LocationProps {
  location: string;
  locationExtraInfo: string;
}

const useStyles = makeStyles(() => ({
  container: () => ({
    display: "flex",
    color: "black",
  }),
  icon: () => ({
    marginRight: 5,
  }),
  extra: () => ({
    display: 'block',
  }),
}));

function Location(props: LocationProps): JSX.Element {
  const classes = useStyles(props);
  const { location, locationExtraInfo } = props;

  return (
    <>
      <div className={classes.container}>
        <IconLocation className={classes.icon} />
        <div>
          {location}
          { locationExtraInfo && 
            <span className={classes.extra}>{locationExtraInfo}</span>
          } 
        </div>
      </div>
    </>
  );
}

export default Location;
