import PropTypes from "prop-types";
import * as React from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  text: props => ({
    fontSize: 36,
    fontFamily: 'HelsinkiGrotesk',
    fontWeight: 'bold',
    [theme.breakpoints.only("xs")]: {
      fontSize: 24,
    },
    color: props.title_color,
  }),
}));

function Subheading(props) {
    const classes = useStyles();
    const { title, title_color } = props;

    return (
        <React.Fragment>
            <Typography variant="h3" component="h3" className={classes.text} style={{color:title_color}}>
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
