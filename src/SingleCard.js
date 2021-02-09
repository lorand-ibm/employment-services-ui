import PropTypes from "prop-types";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {Button} from "hds-react/components/Button";
//import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { positions } from '@material-ui/system';

const defaultWidth = 300;
const defaultHeight = 270;
const imageHeight = 221;
const defaultContentHeight = 180;

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.bg_color,
    color: theme.color,
    width: props.width ? props.width : defaultWidth,
    height: props.height ? props.height : defaultHeight,
  }),
  title: props => ({
    color: props.title_color,
    backgroundColor: props.bg_color,
    fontFamily: 'HelsinkiGrotesk',
    fontSize: props.image ? 20 : 24,
    fontWeight: 'bold',
  }),
  text: props => ({
    fontSize: props.image ? 16 : 18,
    fontFamily: 'HelsinkiGrotesk',
    backgroundColor: props.bg_color,
    color: props.text_color,
  }),
  button: props => ({
    fontFamily: 'HelsinkiGrotesk',
    color: 'black',
    backgroundColor: props.button_bg_color,
    fontSize: 16,
  }),
  media: {
    height: 221,
  },
  content: props => ({
    backgroundColor: props.bg_color,
    padding: 25,
    height: props.image ? (props.height?props.height:defaultContentHeight) : defaultContentHeight,
  }),
  buttonArea: props => ({
    backgroundColor: props.bgColor,
    paddingLeft: 20,
  }),
}));


function SingleCard(props) {
  const classes = useStyles(props);
  const { site, image, title, text, button_url, width, height, button_text } = props;

  console.log('Card text:' + props.text_color);
  console.log('Card title:' + props.title_color);
  console.log('Card bg:' + props.bg_color);

  const imageAddress = image ? site + image : '';
  console.log(imageAddress);

  let button =
        <Box position={"bottom"} className={classes.buttonArea}>
          <Button
            className={classes.button}
            onClick={() => {
              window.location.href = button_url
            }}>
            {button_text}
          </Button>
        </Box>;

  if (!button_text) {
    button = "";
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {image ? <CardMedia
          component="img"
          className={classes.media}
          image={imageAddress}
          title="-"
        /> : <></> }
        <CardContent className={classes.content} >
          <Typography
            gutterBottom variant="h5" component="h2"
            className={classes.title}>
            {title}
          </Typography>
          <Typography
            variant="body2" color="textSecondary"
            className={classes.text}
            dangerouslySetInnerHTML={{__html:text}}/>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.csontent}>
        {button}
        </CardActions>
    </Card>
  );
}

SingleCard.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SingleCard;
