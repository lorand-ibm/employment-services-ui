import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    background: 'blue',
    fontFamily: 'HelsinkiGrotesk'
  },
  text: {
    fontSize: 16,
    fontFamily: 'HelsinkiGrotesk'
  },
  button: {
    color: 'black',
    background: 'white',
  }
}));

function SingleCard(props) {
    const classes = useStyles();
    const { title, text, button_text } = props;

    return (
        <React.Fragment>
            <Card
              heading={title}
              className={classes.title}
              >
              <Typography dangerouslySetInnerHTML={{__html: text}} className={classes.text} />
              <Button
                className={classes.button}
                variant="secondary"
              >
                {button_text}
              </Button>
            </Card>
        </React.Fragment>
    );
}

SingleCard.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default SingleCard;
