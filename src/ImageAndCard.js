import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "hds-react/components/Card";
import { Button } from "hds-react/components/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: props => ({
    backgroundColor: props.card.bg_color,

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
    backgroundColor: 'transparent',
    mlineHeight: 27,
  }),
  button: props => ({
    color: 'black',
    backgroundColor: props.card.bg_color,
    borderColor: 'black',
  }),
  box: props => ({
    backgroundColor: props.card.bg_color,
    position: 'absolute',
    top: '9%',
    right: '0',
    width: 450,
    height: 430,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down("1248")]: {
      top: '32%',
      right: 'auto',
    },
    [theme.breakpoints.down("960")]: {
      position: 'initial',
      width: '100%',
      height: 'auto',
    }
  }),
  wrapper: props => ({
    position: 'relative',
    [theme.breakpoints.down("1248")]: {
      minHeight: 590,
    }
  }),
  imageWrapper: props => ({
    width: '70%',
    [theme.breakpoints.down("1248")]: {
      width: '100%'
    }
  })
}));

function ImageAndCard(props) {
  const classes = useStyles(props);
  const { card, image, site } = props;
  const address = site + image;

  let button =
    <Button
      className={classes.button}
      onClick={() => {
        window.location.href = card.button_url
      }}
      style={{
        borderColor: 'black',
      }}>
      {card.button_text}
    </Button>;

  if (!card.button_text) {
    button = "";
  }

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <div className={classes.imageWrapper}>
          <div style={{
            paddingBottom: '62%',
            height: 0,
            overflow: 'hidden'
          }}>
            <img style={{ width: '100%' }} src={address}></img>
          </div>
        </div>
        <Card backgroundColor={props.card.bg_color} className={classes.box}>
          <div>
            <Typography className={classes.title}>
              {card.title}
            </Typography>
            <Typography className={classes.text} dangerouslySetInnerHTML={{ __html: card.text }} />
          </div>
          {button}
        </Card>
      </div>

    </React.Fragment>
  );
}

ImageAndCard.propTypes = {
};


export default ImageAndCard;
