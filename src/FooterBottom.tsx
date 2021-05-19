import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from  "hds-react/components/Footer";
import { useTranslation } from "react-i18next";
import { Lang } from "./types";
import { deleteCookie } from "../src/helpers/helpers";

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
  const { t } = useTranslation();
  const history = useHistory();
  const { title, lang, lastParagraphColor = '' } = props;

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
          logoLanguage={lang === "sv" ? "sv" : "fi"}
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
            <Footer.Item href={t("footer.accessibilityLink")} label={t("footer.accessibility")} />
            <Footer.Item href={t("cookies.url")} label={t("footer.cookies")} />
            <Footer.Item href="#" label={t("footer.cookie_settings")} onClick={(e: any) => {
              deleteCookie(e ,'tyollisyyspalvelut_cookie_consent', history);
            }}/>
            <Footer.Item href={t("footer.feedbackLink")} label={t("footer.feedback")} />
            <Footer.Item href="#" label={t("footer.goup")} onClick={scrollToTop} />
          </Footer.Base>
        </Footer>
      </div>
    </>
  );
}

export default FooterBottom;
