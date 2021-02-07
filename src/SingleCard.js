import PropTypes from "prop-types";
import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Button} from "hds-react/components/Button";

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.bgColor,
    color: theme.color,
    maxWidth: props.width,
  }),
  title: {
    color: 'white',
    background: 'blue',
    fontFamily: 'HelsinkiGrotesk',
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: 'HelsinkiGrotesk',
  },
  button: {
    fontFamily: 'HelsinkiGrotesk',
    color: 'black',
    background: 'white',
    fontSize: 16
  }
}));



function SingleCard(props) {
    const classes = useStyles(props);
    const { title, text, button_text, button_url, width, height, bgColor } = props;

    console.log(width);

     return (
        <React.Fragment>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="herokuva.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
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
            <CardActions>
              <Button size="small" color="primary"
                      className={classes.button}>
                {button_text}
              </Button>
            </CardActions>
          </Card>
        </React.Fragment>
    );
}

SingleCard.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default SingleCard;
