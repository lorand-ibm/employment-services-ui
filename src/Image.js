import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import "hds-core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'black',
    background: 'white',
    fontFamily: 'HelsinkiGrotesk',
    borderColor: 'red',
    xxheight: 100,
    marginBottom: 0,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'HelsinkiGrotesk'
  },
  textArea: {
    margin:0,
    padding: 0,
  },
  button: {
    color: 'black',
    background: 'white',
  },
  icon: {
    marginTop: 15,
    xxwidth: 100,
    xxheight: 100,
  }
}));

function Image(props) {
    const classes = useStyles();
    const { title, text, button_text } = props;

    return (
        <React.Fragment>
            <Card
              border
              heading={'image '}
              className={classes.title}
              theme = {{
                'card-body-margin-bottom' : 0
              }}
              >
              <Grid container spacing={1}  justify="left" className={classes.textArea}>

                <Grid item> <Typography dangerouslySetInnerHTML={{__html: text}} className={classes.text} /> </Grid>
              </Grid>
            </Card>
        </React.Fragment>
    );
}

Image.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Image;
