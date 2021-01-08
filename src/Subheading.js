import PropTypes from "prop-types";
import * as React from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '36px',
  }
}));

function Subheading(props) {
    const classes = useStyles();
    const { title } = props;

    return (
        <React.Fragment>
            <Typography variant="h3" component="h3" className={classes.text}>
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
