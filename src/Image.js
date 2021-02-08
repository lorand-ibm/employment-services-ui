import * as React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: props => ({
    height: props.height ? props.height : 400,
  }),
}));

function Image(props) {
    const classes = useStyles(props);
    const { image, site } = props;

    const path = site + image;

    return (
        <React.Fragment>
          <Card>
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
};


export default Image;
