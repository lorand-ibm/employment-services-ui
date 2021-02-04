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
    fontFamily: 'HelsinkiGrotesk',
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: 'HelsinkiGrotesk',
  },
  button: {
    fontFamily: 'HelsinkiGrotesk',
    color: 'black',
    background: 'white',
    fontSize: 16
  }
}));

function SingleCard(props) {
    const classes = useStyles();
    const { title, text, button_text, button_url, width, height } = props;

    console.log('height' + height);
    console.log('singlecard:' + width);
    const goto = (url) => {
      window.location.href = url;
     }

     return (
        <React.Fragment>
            <Card
              heading={title}
              className={classes.title}
              style ={{
                width: width ? width : '-1',
                height: height ? height : '-1',
              }}
              >
              <Typography dangerouslySetInnerHTML={{__html: text}} className={classes.text} />
              <Button
                className={classes.button}
                variant="secondary"
                onClick={() => goto(button_url)}
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
