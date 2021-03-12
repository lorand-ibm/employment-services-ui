import React from 'react';
import PropTypes from 'prop-types';
import {Footer} from  "hds-react/components/Footer";

import {drupalUrl} from "./config";

const footerTexts = {
  fi: { feedback: 'Anna palautetta', goup: 'Sivun alkuun', accessibility: 'Saavutettavuusseloste'},
  sv: { feedback: 'Ge respons', goup: 'Till början av sidan', accessibility: 'Tillgänglighetsutlåtande'},
  en: { feedback: 'Give feedback', goup: 'Back to the top', accessibility: 'Accessibility statement'},
}

function FooterBottom(props) {
  const { title, lang} = props;

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

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <React.Fragment>
        <Footer
          logoLanguage={lang ? 'sv' : 'fi'}
          title={title}
          theme={{
            '--footer-background': '#0E00BF',
            '--footer-divider-color': '#0172C6',
            '--footer-color': 'white',
            '--footer-focus-outline-color': 'var(--color-black-90)',
          }}
        >
          <Footer.Navigation navigationAriaLabel="{title} navigation"></Footer.Navigation>
          <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved">
              <Footer.Item href={`${drupalUrl}/sites/default/files/2021-02/saavutettavuusseloste%2026.2.2021.pdf`} label={texts.accessibility} />
              <Footer.Item href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/" label={texts.feedback} />
              <Footer.Item href="#" label={texts.goup} onClick={scrollToTop} />
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
