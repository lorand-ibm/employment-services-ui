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

const footerTexts = {
  fi: { feedback: 'Anna palautetta', goup: 'Sivun alkuun'},
  sv: { feedback: 'Ge respons', goup: 'Till början av sidan'},
  en: { feedback: 'Give feedback', goup: 'Back to the top'},
}

function FooterBottom(props) {
  const classes = useStyles();
  const { title, lang } = props;

  let texts = footerTexts.en;
  switch(lang) {
    case 'SV':
    case 'sv':
      texts = footerTexts.sv;
      break;
    case 'EN':
    case 'en':
      texts = footerTexts.en;
      break;
    case 'fi':
    default:
      texts = footerTexts.fi;
      break;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const gotoUrl = () => {
    window.location = "https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/";
  };

  return (
    <React.Fragment>
        <Footer
          logoLanguage={lang}
          title={title}
          theme={{
            '--footer-background': '#0E00BF',
            '--footer-divider-color': '#0E00BF',
            '--footer-color': 'white',
            '--footer-focus-outline-color': 'var(--color-black-90)',
          }}
        >
          <Footer.Navigation navigationAriaLabel="{title} navigation"></Footer.Navigation>
          <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved">
              <div onClick={gotoUrl}><Footer.Item label={texts.feedback} /></div>
              <div onClick={scrollToTop}><Footer.Item label={texts.goup} /></div>
          </Footer.Base>
        </Footer>
    </React.Fragment>
  );
}

FooterBottom.propTypes = {
  lang: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FooterBottom;
