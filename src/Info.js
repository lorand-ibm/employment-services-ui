import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";
import * as React from "react";
import Box from "@material-ui/core/Box";
import {Notification} from "hds-react/components/Notification";
import Alert from "@material-ui/lab/Alert";
import Typography from '@material-ui/core/Typography';
import { borders } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

function Info(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
          <Box borderLeft={10}>
            <Alert severity="info" >
              <Typography variant="h6" component="h6">{title}</Typography>
              <Typography variant="h7" component="h7">{text}</Typography>
            </Alert>
          </Box>
        </React.Fragment>
    );
}

Info.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Info;
