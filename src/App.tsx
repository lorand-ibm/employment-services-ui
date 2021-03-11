import "./App.css";
import "./fonts.css";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Nav from "./Nav";
import Content from "./Content";

import { LangParam, Lang } from "./types";

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

const strToLang = (langParam: LangParam): Lang => {
  switch (langParam) {
    case "fi":
      return "fi";
    case "sv":
      return "sv";
    default:
      return "en";
  }
};

function App() {
  const history = useHistory();
  const location = useLocation();

  const [, langPath] = location.pathname.split("/");
  const [lang, setLang] = useState<Lang>(strToLang(langPath));

  const changeLang = (newLang: Lang) => {
    const { pathname } = location;
    const [empty, , ...rest] = pathname.split("/");
    history.replace([empty, newLang, ...rest].join("/"));
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
        <Route path="/:id/:restofit" children={<Content lang={lang} />} />
        <Route path="/:id" children={<Content lang={lang} />} />
        <Redirect to={"/fi"}></Redirect>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
