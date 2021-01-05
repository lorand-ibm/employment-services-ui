import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Footer} from  "hds-react/components/Footer";
import {Base} from  "hds-react/components/Base";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#0E00BF',
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

function FooterBottom(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Footer
        title="Työllisyyspalvelut"
        className={classes.footer}
        >
        <Base />
      </Footer>
    </footer>
  );
}

FooterBottom.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
