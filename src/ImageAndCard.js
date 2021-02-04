import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
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
    //const classes = useStyles();
    const { card, image, site } = props;
    const address = site + image;

    return (
        <React.Fragment>
          <ImageWithCard
            cardLayout="hover"
            cardAlignment="right"
            color={'White'}
            src={address}>

              <SingleCard
                {...card}
              >

              </SingleCard>
          </ImageWithCard>
        </React.Fragment>
    );
}

ImageAndCard.propTypes = {
};


export default ImageAndCard;
