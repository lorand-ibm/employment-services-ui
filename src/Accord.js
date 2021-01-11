import PropTypes from "prop-types";
import * as React from "react";
import {Accordion} from "hds-react/components/Accordion";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '16px',
  }
}));

function Accord(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
            <Accordion
              heading={title}
              theme={{
                '--header-font-color': '#0E00BF',
                '--header-font-size': '18px',
                '--header-font-family': 'HelsinkiGrotesk',
                '--header-font-weigth': 'bold',
              }}
              >
              <Typography className={classes.text} >
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Typography>
            </Accordion>
        </React.Fragment>
    );
}

Accord.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Accord;
