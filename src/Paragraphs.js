import PropTypes from "prop-types";
import * as React from "react";
import Accord from "./Accord";
import SingleCard from "./SingleCard";
import Subheading from "./Subheading";
import Info from "./Info";
import Pdf from "./Pdf";
import PhoneNumberBox from "./PhoneNumberBox";
import Text from "./Text";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';
import Image from "./Image";
import ImageAndCard from "./ImageAndCard";
import CardList from "./CardList";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    marginTop: 0,
    marginBottom: 16,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  accord: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  card: {
    padding: 0,
    marginTop: 32,
    marginBottom: 15,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  subheading: {
    padding: 0,
    marginTop: 32,
    marginBottom: 15,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  info: {
    marginTop: 36,
    marginBottom: 72,
    [theme.breakpoints.only("xs")]: {
      marginTop: 24,
      marginBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
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
    const { paragraphs, site, width } = props;
    console.log(width);
    const items = [];
    paragraphs.map((paragraph, index) => {

        switch(paragraph.type) {
            case 'Accordion':
                items.push(
                  <Grid container spacing={1} className={classes.accord} key={index}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                    <Grid item xs={12} sm={6} key={2}>
                        <Accord key={index} {...paragraph}></Accord>
                    </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
                  </Grid>
                );
                break;
            case 'Card':
              items.push(
                <Grid container spacing={1} className={classes.card} key={index}>
                  <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                  <Grid item xs={12} sm={6} key={2}>
                    <SingleCard key={index} {...paragraph}></SingleCard>
                  </Grid>
                  <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
                </Grid>
              );
              break;
          case 'CardList':
            items.push(
              <Grid container spacing={1} className={classes.card} key={index}>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                <Grid item xs={12} sm={12} key={2}>
                  <CardList key={index} {...paragraph}></CardList>
                </Grid>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
              </Grid>
            );
            break;
            case 'Subheading':
                items.push(
                  <Grid container spacing={1} className={classes.subheading} key={index}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                    <Grid item xs={12} sm={6} key={2}>
                        <Subheading key={index} {...paragraph}></Subheading>
                    </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
                  </Grid>
                );
                break;
            case 'Info':
                items.push(
                  <Grid container spacing={1} className={classes.info} key={index}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                      <Grid item xs={12} sm={7} key={2}>
                        <Info key={index} {...paragraph}></Info>
                      </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
                  </Grid>
                );
                break;
            case 'Pdf':
            case 'PDF':
                items.push(
                  <Grid container spacing={1} className={classes.pdf} key={index}>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                    <Grid item xs={12} sm={6} key={2}>
                        <Pdf key={index} {...paragraph} site={site}></Pdf>
                    </Grid>
                    <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
                  </Grid>
                    );
                break;
          case 'Image':
            items.push(
              <Grid container spacing={1} className={classes.info} key={index}>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                <Grid item xs={12} sm={6} key={2}>
                  <Image key={index} {...paragraph} site={site}></Image>
                </Grid>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
              </Grid>
            );
            break;
          case 'ImageAndCard':
            items.push(
              <Grid container spacing={1} className={classes.info} key={index}>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                <Grid item xs={12} sm={6} key={2}>
                  <ImageAndCard key={index} {...paragraph} site={site}></ImageAndCard>
                </Grid>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
              </Grid>
            );
            break;
          case 'PhoneNumberBox':
            items.push(
              <Grid container spacing={1} className={classes.card} key={index}>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                <Grid item xs={12} sm={6} key={2}>
                  <PhoneNumberBox key={index} {...paragraph}></PhoneNumberBox>
                </Grid>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
              </Grid>
            );
            break;
          case 'Text':
            items.push(
              <Grid container spacing={1} className={classes.accord} key={index}>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={1}></Grid></Hidden>
                <Grid item xs={12} sm={6} key={2}>
                    <Text key={index} {...paragraph}></Text>
                </Grid>
                <Hidden only={'xs'}><Grid item xs className={classes.sides} key={3}></Grid></Hidden>
              </Grid>
            );
            break;
          default: break;
        }
        return items;
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
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default Paragraphs;
