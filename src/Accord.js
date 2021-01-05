import PropTypes from "prop-types";
import * as React from "react";
import {Accordion} from "hds-react/components/Accordion";

function Accord(props) {
    const { title, text } = props;

    return (
        <React.Fragment>
            <Accordion
              heading={title}
              theme={{'--header-font-color': '#0E00BF'}}
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
