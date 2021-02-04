import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LaunchIcon from "@material-ui/icons/Launch";
import Link from "@material-ui/core/Link";

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
    const { title, text, button_text, button_url, width } = props;

    console.log(button_url);

    let button = [];
    if (button_text) {
      button =
          <Link href={button_url} key={button_text}>
            <Grid container spacing={1}>
              <Grid item >
                <Typography>{button_text}</Typography>
              </Grid>
            </Grid>
          </Link>
    }

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
                {button}
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
