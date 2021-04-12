import "./App.css";
import "./fonts.css";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Helmet } from "react-helmet";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

import Nav from "./Nav";
import { Lang } from "./types";
import Landing from "./pages/Landing";
import Page from "./pages/Page";
import Event from "./pages/Event";
import { getAppName } from "./config";

const groteskTheme = createMuiTheme({
  typography: {
    fontFamily: "HelsinkiGrotesk",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  overrides: {},
});

const strToLang = (langParam: string): Lang => {
  switch (langParam) {
    case "en":
      return "en";
    case "sv":
      return "sv";
    default:
      return "fi";
  }
};

function App() {
  const location = useLocation();
  const [, langPath] = location.pathname.split("/");
  const [lang, setLang] = useState<Lang>(strToLang(langPath));

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
  };

  return (
    <ThemeProvider theme={groteskTheme}>
      <Helmet>
        <html lang={lang} />
        <title>{getAppName(lang)}</title>
      </Helmet>
      <Nav lang={lang} changeLang={changeLang} />
      <CssBaseline />
      <Switch>
        <Route path="/QA">
          <Redirect to={"/fi/QA"} />
        </Route>
        <Route path="/fi/tapahtuma/:urlAlias" strict children={<Event lang={lang} />} />
        <Route path="/en/event/:urlAlias" strict children={<Event lang={lang} />} />
        <Route path="/sv/evenemang/:urlAlias" strict children={<Event lang={lang} />} />
        <Route path="/:langParam/:urlAlias" strict children={<Page lang={lang} />} />
        <Route path="/:langParam" strict children={<Landing lang={lang} />} />
        <Redirect to={"/fi"}></Redirect>
      </Switch>
      <CookieConsent
        location="bottom"
        buttonText="Hyväksy evästeet"
        ariaAcceptLabel="Hyväksy evästeet"
        enableDeclineButton
        declineButtonText="Kieltäydy evästeistä"
        ariaDeclineLabel="Kieltäydy evästeistä"
        cookieName="tyollisyyspalvelut_cookie_consent"
        style={{ background: "#0000bf", color: "#fff", fontSize: "18px", padding: "32px 120px", alignItems: "center" }}
        buttonStyle={{ background: "#fff", color: "#0000bf", fontSize: "16px", fontWeight: "500", lineHeight: "1.5", border: "2px solid #fff", padding: "16px 24px", margin: "0 8px 16px" }}
        declineButtonStyle={{ background: "#0000bf", color: "#fff", fontSize: "16px", fontWeight: "500", lineHeight: "1.5", border: "2px solid #fff", padding: "16px 24px", margin: "0 8px 16px" }}
        expires={180}
        disableStyles={false}
        flipButtons={true}
        debug={true}
      >
      Tämä sivusto käyttää evästeitä yleisen käytön seurantaan. Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi ja analytiikkaan. <a href="#" style={{ color: "#fff" }}>Lue lisää evästeistä</a>
      </CookieConsent>
    </ThemeProvider>
  );
}

export default App;
