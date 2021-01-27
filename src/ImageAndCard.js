import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import "hds-core";
import Grid from "@material-ui/core/Grid";
import {ImageWithCard} from "hds-react/components/ImageWithCard";
import SingleCard from "./SingleCard";

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

function ImageAndCard(props) {
    const classes = useStyles();
    const { title, text, image, site } = props;
    const address = site + image;

    console.log(address);

    return (
        <React.Fragment>
          <ImageWithCard
            cardLayout="hover"
            cardAlignment="right"
            src={address}>{'image and card'}
            >
              <SingleCard {...props}>

              </SingleCard>
          </ImageWithCard>
        </React.Fragment>
    );
}

ImageAndCard.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default ImageAndCard;
