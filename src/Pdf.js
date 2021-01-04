import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";
import * as React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

function Pdf(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
            <Link display="block" variant="body1" href={text} key={title}>
                <Grid container>
                    <Grid item xs={1}>
                        <Typography><LaunchIcon /></Typography>
                    </Grid>
                    <Grid item xs={1}>
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