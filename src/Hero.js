import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
}));

function Hero(props) {
  const classes = useStyles();
  const { title, text } = props;

  return (
    <React.Fragment>
      <Card width={1}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="440"
            image="herokuva.jpg"
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
}

Hero.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


export default Hero;
