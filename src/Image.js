import PropTypes from "prop-types";
import * as React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import "hds-core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'black',
    background: 'white',
    fontFamily: 'HelsinkiGrotesk',
    borderColor: 'red',
    marginBottom: 0,
    height: 400,
  },
  text: {
    color: 'black',
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
  },
  media: props => ({
    height: props.height ? props.height : 400,
  }),
}));

function Image(props) {
    const classes = useStyles(props);
    const { title, text, button_text, image, site, height } = props;

    const path = site + image;

    console.log (height);
    return (
        <React.Fragment>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={path}
                title="Image"
              />
            </CardActionArea>
          </Card>
        </React.Fragment>
    );
}

Image.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


export default Image;
