import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Footer} from  "hds-react/components/Footer";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#0E00BF',
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

function FooterBottom(props) {
  const classes = useStyles();
  //const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Footer
        title="Työllisyyspalvelut"
        className={classes.footer}
        >
      </Footer>
    </footer>
  );
}

FooterBottom.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
