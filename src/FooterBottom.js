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
        <br />
        <Footer.Utilities backToTopLabel="Back to top">
          <Footer.Item label="Contact us" />
          <Footer.Item label="Give feedback" />
        </Footer.Utilities>
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
