import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import * as React from "react";
import Accord from "./Accord";
import Subheading from "./Subheading";
import Info from "./Info";
import Pdf from "./Pdf";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    marginTop: 0,
    marginBottom: 16,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddiingRight: 16
    },
  },
  accord: {
    padding: 0,
    marginTop: 0,
    marginBottom: 10,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  subheading: {
    padding: 0,
    marginTop: 32,
    marginBottom: 24,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  info: {
    marginTop: 32,
    marginBottom: 32,
    [theme.breakpoints.only("xs")]: {
      marginTop: 24,
      marginBottom: 24,
    },
  },
  pdf: {
    marginBottom: 10,
    padding: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  sides: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  }
}));

function Paragraphs(props) {
    const classes = useStyles();
    const { paragraphs } = props;
    console.log(paragraphs);
    const items = [];
    paragraphs.map((paragraph, index) => {

        switch(paragraph.type) {
            case 'Accordion':
                items.push(
                  <Grid container spacing={1} className={classes.accord}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                    <Grid item xs={12} sm={6}>
                      <Typography paragraph={true} gutterBottom={false} >
                        <Accord key={index} {...paragraph}></Accord>
                      </Typography>
                    </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                  </Grid>
                );
                break;
            case 'Subheading':
                items.push(
                  <Grid container spacing={1} className={classes.subheading}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                    <Grid item xs={12} sm={6}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Subheading key={index} {...paragraph}></Subheading>
                      </Typography>
                    </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                  </Grid>
                );
                break;
            case 'Info':
                items.push(
                  <Grid container spacing={1} className={classes.container}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                    <Typography paragraph={true} gutterBottom={true}>
                      <Info key={index} {...paragraph}></Info>
                    </Typography>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                  </Grid>
                );
                break;
            case 'PDF':
                items.push(
                  <Grid container spacing={1} className={classes.pdf}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                    <Grid item xs={12} sm={6}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Pdf key={index} {...paragraph}></Pdf>
                      </Typography>
                    </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides}></Grid></Hidden>
                  </Grid>
                    );
                break;
          default: break;
        }
    });
    return (
        <React.Fragment>
            {items}
        </React.Fragment>
    );
}

Paragraphs.propTypes = {
    paragraphs: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Paragraphs;
