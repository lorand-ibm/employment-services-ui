import PropTypes from "prop-types";
import * as React from "react";
import Typography from '@material-ui/core/Typography';

function Subheading(props) {
    const { title } = props;

    return (
        <React.Fragment>
            <Typography variant="h3" component="h3">
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
