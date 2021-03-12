import "./App.css";
import "./fonts.css";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Nav from "./Nav";

import { Lang } from "./types";

import Landing from "./pages/Landing";
import Page from "./pages/Page";
import Event from "./pages/Event";

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
    </ThemeProvider>
  );
}

export default App;
