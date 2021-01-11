import PropTypes from "prop-types";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '16px',
  }
}));

function Text(props) {
    const classes = useStyles();
    const { text } = props;

    return (
        <React.Fragment>
          <Typography className={classes.text}>
            {text}
          </Typography>
        </React.Fragment>
    );
}

Text.propTypes = {
    text: PropTypes.string.isRequired,
};


export default Text;
