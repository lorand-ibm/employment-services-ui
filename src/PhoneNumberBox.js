import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "hds-core";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'black',
    background: 'white',
    fontFamily: 'HelsinkiGrotesk',
    borderColor: 'red',
  },
  text: {
    fontSize: 16,
    fontFamily: 'HelsinkiGrotesk'
  },
  button: {
    color: 'black',
    background: 'white',
  },
  icon: {
    width: 100,
    height: 100,
  }
}));

function PhoneNumberBox(props) {
    const classes = useStyles();
    const { title, text, button_text } = props;

    return (
        <React.Fragment>
            <Card
              border
              heading={title}
              className={classes.title}
              >
              <div classNames={'hds-icon--photo', classes.icon} ></div>
              <Typography dangerouslySetInnerHTML={{__html: text}} className={classes.text} />

            </Card>
        </React.Fragment>
    );
}

PhoneNumberBox.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default PhoneNumberBox;
