import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import * as React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from '@material-ui/icons/Launch';

function Pdf(props) {
    const { title, text } = props;

    return (
        <React.Fragment>
            <Link display="block" variant="body1" href={text} key={title}>
                <Grid container spacing={1}>
                    <Grid item >
                        <Typography><LaunchIcon /></Typography>
                    </Grid>
                    <Grid item >
                        <Typography>{title}</Typography>
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
