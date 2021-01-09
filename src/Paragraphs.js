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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    marginTop: 0,
    marginBottom: 16,
  },
  accord: {
    padding: 0,
    marginTop: 0,
    marginBottom: 10,
  },
  subheading: {
    padding: 0,
    marginTop: 32,
    marginBottom: 24,
  },
  info: {
    marginTop: 32,
    marginBottom: 32,
  },
  pdf: {
    marginBottom: 10,
    padding: 0,
    [theme.breakpoints.only("xs")]: {

    },
  },
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
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                      <Typography paragraph={true} gutterBottom={false} >
                        <Accord key={index} {...paragraph}></Accord>
                      </Typography>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                );
                break;
            case 'Subheading':
                items.push(
                  <Grid container spacing={1} className={classes.subheading}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Subheading key={index} {...paragraph}></Subheading>
                      </Typography>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                );
                break;
            case 'Info':
                items.push(
                  <Grid container spacing={1} className={classes.container}>
                    <Grid item xs></Grid>
                    <Grid item xs={7}>
                    <Typography paragraph={true} gutterBottom={true}>
                      <Info key={index} {...paragraph}></Info>
                    </Typography>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                );
                break;
            case 'PDF':
                items.push(
                  <Grid container spacing={1} className={classes.pdf}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Pdf key={index} {...paragraph}></Pdf>
                      </Typography>
                    </Grid>
                    <Grid item xs></Grid>
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
