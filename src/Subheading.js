import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";
import * as React from "react";
import Typography from '@material-ui/core/Typography';

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

function Subheading(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
            <Typography variant="h4" component="h4">
                {title}
            </Typography>
        </React.Fragment>
    );
}

Subheading.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Subheading;