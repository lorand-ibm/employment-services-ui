import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ImageWithCard} from "hds-react/components/ImageWithCard";
import {Button} from "hds-react/components/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: props => ({
    xbackgroundColor: props.card.bg_color,

  }),
  title: props => ({
      color: props.card.title_color,
      backgroundColor: props.card.bg_color,
      fontFamily: 'HelsinkiGrotesk',
      fontSize: 36,
      fontWeight: 'bold',
  }),
  text: props => ({
    fontSize: 18,
    fontFamily: 'HelsinkiGrotesk',
    backgroundColor: props.card.bg_color,
    mlineHeight: 27,
  }),
  button: props => ({
    color: 'black',
    backgroundColor: props.card.bg_color,
    borderColor: 'black',
  }),
  box: props => ({
    color: 'black',
    backgroundColor: props.card.bg_color,
    padding: 25,
    margin: -17,
    marginLeft: -65,
    height: 400,
    width: 450,
  }),
}));

function ImageAndCard(props) {
    const classes = useStyles(props);
    const { card, image, site } = props;
    const address = site + image;

    return (
        <React.Fragment>
          <ImageWithCard
            cardLayout="hover"
            cardAlignment="right"
            color={props.card.bg_color}
            src={address}
            className={classes.root}
          >
            <Box className={classes.box}>
              <Typography className={classes.title}>
                {card.title}
              </Typography>
              <Typography className={classes.text} dangerouslySetInnerHTML={{__html:card.text}}/>
              <Button
                className={classes.button}
                onClick={() => {
                  window.location.href = card.button_url
                }}
                style={{
                  borderColor: 'black',
                }}>
                {card.button_text}

              </Button>
            </Box>
          </ImageWithCard>

        </React.Fragment>
    );
}

ImageAndCard.propTypes = {
};


export default ImageAndCard;
