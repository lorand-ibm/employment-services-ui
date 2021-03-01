import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CallIcon from '@material-ui/icons/CallOutlined';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'black',
    background: 'white',
    fontFamily: 'HelsinkiGrotesk',
    borderColor: 'red',
    marginBottom: 0,
  },
  text: {
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
  }
}));

function PhoneNumberBox(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
            <Card
              border
              heading={title}
              className={classes.title}
              theme = {{
                'card-body-margin-bottom' : 0
              }}
              >
              <Grid container spacing={1}  justify="left" className={classes.textArea}>
                <Grid item> <CallIcon className={classes.icon} /> </Grid>
                <Grid item> <Typography dangerouslySetInnerHTML={{__html: text}} className={classes.text} /> </Grid>
              </Grid>
            </Card>
        </React.Fragment>
    );
}

PhoneNumberBox.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default PhoneNumberBox;
