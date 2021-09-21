import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Footer as HSDFooter } from  "hds-react/components/Footer";
import { useTranslation } from "react-i18next";
import { Lang } from "../types";
import deleteCookie from "../helpers/helpers";

const useStyles = makeStyles(() => ({
  footerWrapper: {
    paddingTop: 100,
  },
}));

interface FooterProps {
  title: string;
  lang: Lang;
  lastParagraphColor: string;
}

function Footer(props: FooterProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { title, lang, lastParagraphColor } = props;

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={classes.footerWrapper} style={{ backgroundColor: lastParagraphColor }}>
      <HSDFooter
        logoLanguage={lang === "sv" ? "sv" : "fi"}
        title={title}
        theme={{
          '--footer-background': '#0E00BF',
          '--footer-divider-color': '#0172C6',
          '--footer-color': 'white',
          '--footer-focus-outline-color': 'var(--color-white)',
        }}
      >
        <HSDFooter.Navigation navigationAriaLabel="{title} navigation" />
        <HSDFooter.Base copyrightHolder="Copyright" copyrightText="All rights reserved">
          <HSDFooter.Item href={t("footer.accessibilityLink")} label={t("footer.accessibility")} />
          <HSDFooter.Item href={t("cookies.url")} label={t("footer.cookies")} />
          <HSDFooter.Item href="#" label={t("footer.cookie_settings")} onClick={(e: any) => {
            deleteCookie(e ,'tyollisyyspalvelut_cookie_consent', history);
          }}/>
          <HSDFooter.Item href={t("footer.feedbackLink")} label={t("footer.feedback")} />
          <HSDFooter.Item href="#" label={t("footer.goup")} onClick={scrollToTop} />
        </HSDFooter.Base>
      </HSDFooter>
    </div>
  );
}

export default Footer;
