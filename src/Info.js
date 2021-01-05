import PropTypes from "prop-types";
import * as React from "react";
import {Notification} from "hds-react/components/Notification";

function Info(props) {
    const { title, text } = props;

    return (
        <React.Fragment>
          <Notification label={title}>{text}</Notification>
        </React.Fragment>
    );
}

Info.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Info;
