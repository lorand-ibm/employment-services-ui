//import logo from './logo.svg';
import './App.css';
import './fonts.css';

import Landing from './Landing';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const groteskTheme = createMuiTheme({
  typography: {
    "fontFamily": "HelsinkiGrotesk",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  overrides: {
    MuiCssBaseline: {
       body: {
         backgroundColor: "#fff",
         fontFamily: 'HelsinkiGrotesk',
        },
      },
    },
  });

function App() {
  const site = process.env.REACT_APP_DRUPAL_URL;

  return (

      <ThemeProvider theme={groteskTheme}>

          <Switch>
            <Route path="/QA">
              <Redirect to={'/fi/QA'}/>
            </Route>
            <Route path="/:id/:restofit"
                   children={<Landing loading={true} site={site}></Landing>}/>
            <Route path="/:id"
                   children={<Landing loading={true} site={site}></Landing>}/>
            <Redirect to={'/fi'}></Redirect>
          </Switch>

      </ThemeProvider>

  );
}

export default App;
