import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from  "hds-react/components/Footer";
import { drupalUrl } from "./config";
import { Lang } from "./types";


const footerTexts = {
  fi: { feedback: 'Anna palautetta', feedbackLink: 'https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/', goup: 'Sivun alkuun', accessibility: 'Saavutettavuusseloste'},
  sv: { feedback: 'Ge respons', feedbackLink: 'https://www.hel.fi/helsinki/sv/stad-och-forvaltning/delta/feedback', goup: 'Till början av sidan', accessibility: 'Tillgänglighetsutlåtande'},
  en: { feedback: 'Give feedback', feedbackLink: 'https://www.hel.fi/helsinki/en/administration/participate/feedback', goup: 'Back to the top', accessibility: 'Accessibility statement'},
}

const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    paddingTop: 100,
  },
}));

interface FooterProps {
  title: string;
  lang: Lang;
  lastParagraphColor?: string;
}

function FooterBottom(props: FooterProps) {
  const classes = useStyles();
  const { title, lang, lastParagraphColor = '' } = props;

  let texts = footerTexts.en;
  switch(lang) {
    case 'sv':
      texts = footerTexts.sv;
      break;
    case 'en':
      texts = footerTexts.en;
      break;
    case 'fi':
    default:
      texts = footerTexts.fi;
      break;
  }

  const scrollToTop = (event: any) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className={classes.footerWrapper} style={{ backgroundColor: lastParagraphColor }}>
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
              <Footer.Item href={texts.feedbackLink} label={texts.feedback} />
              <Footer.Item href="#" label={texts.goup} onClick={scrollToTop} />
          </Footer.Base>
        </Footer>
      </div>
    </>
  );
}

export default FooterBottom;
