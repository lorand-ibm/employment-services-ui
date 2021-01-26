import PropTypes from "prop-types";
import * as React from "react";
import {Notification} from "hds-react/components/Notification";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 16,
    paddingTop: 16,
  }
}));

function Info(props) {
    const classes = useStyles();
    const { title, text } = props;

    return (
        <React.Fragment>
          <Notification
            label={title}
            style={{
              'fontFamily':'HelsinkiGrotesk',
              'fontSize': '18px',
              'fontWeight': 'bold',
              'paddingTop': '32px',
              'paddingBottom': '24px',
            }}
          >
            <Typography className={classes.title} dangerouslySetInnerHTML={{__html:text}}>
            </Typography>
          </Notification>
        </React.Fragment>
    );
}

Info.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Info;
