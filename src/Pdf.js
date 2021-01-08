import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import * as React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from '@material-ui/icons/Launch';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 16,
  },
  link: {
    color: '#0E00BF',
  }
}));

function Pdf(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
            <Link display="block" variant="body1" href={text} key={title} className={classes.link}>
                <Grid container spacing={1}>
                    <Grid item >
                        <Typography><LaunchIcon /></Typography>
                    </Grid>
                    <Grid item >
                        <Typography>{title} className={classes.text}</Typography>
                    </Grid>
                </Grid>
            </Link>
        </React.Fragment>
    );
}

Pdf.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Pdf;
