import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";
import * as React from "react";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from "@material-ui/core/Box";
import {Accordion} from "hds-react/components/Accordion";

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

function Accord(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
            <Accordion
              heading={title}
              theme={{'--header-font-color': 'var(--color-coat-of-arms)'}}
              >
              {text}
            </Accordion>
        </React.Fragment>
    );
}

Accord.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Accord;
