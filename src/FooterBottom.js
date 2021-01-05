import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Footer} from  "hds-react/components/Footer";

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
    backgroundColor: theme.palette.background.paper,
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
        theme={{
          '--footer-background': 'var(--color-engel)',
          '--footer-color': 'var(--color-black-90)',
          '--footer-divider-color': 'var(--color-black-90)',
          '--footer-focus-outline-color': 'var(--color-black-90)'
        }}
      >
          <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved">
          </Footer.Base>
      </Footer>
    </footer>
  );
}

FooterBottom.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
