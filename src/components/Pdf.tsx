import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import { makeStyles } from "@material-ui/core/styles";
import { drupalUrl } from "../config";

interface PdfProps {
  url: string;
  title: string;
}

const useStyles = makeStyles((theme: any) => ({
  text: {
    fontSize: 16,
  },
  link: {
    color: "#0E00BF",
  },
}));

function Pdf(props: PdfProps) {
  const classes = useStyles();
  const { title, url } = props;
  const address = drupalUrl + url;

  return (
    <>
      <Link
        display="block"
        variant="body1"
        href={address}
        key={title}
        className={classes.link}
      >
        <Grid container spacing={1}>
          <Grid item>
            <Typography>
              <LaunchIcon />
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{title}</Typography>
          </Grid>
        </Grid>
      </Link>
    </>
  );
}

export default Pdf;
