//import logo from './logo.svg';
import './App.css';
import './fonts.css';

import Landing from './Landing';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import {findData, getFullRelease} from "./dataHelper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";

const axios = require('axios');


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
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState({});
  const testing = false;
  const site = process.env.REACT_APP_DRUPAL_URL;


  useEffect(() => {
    async function makeRequests() {
      setLoading(true);

      let d_url_fi = site + '/fi/apijson/node/prerelease_landing?include=field_prerelease_';
      let d_url_sv = site + '/sv/apijson/node/prerelease_landing?include=field_prerelease_';
      let d_url_en = site + '/apijson/node/prerelease_landing?include=field_prerelease_';
      const files = site + '/apijson/file/file';
      const media = site + '/apijson/media/image';
      const doc = site + '/apijson/media/document';
      const conf = site + '/apijson/config_pages/release_settings?fields[config_pages--release_settings]=field_prerelease_content,field_full_release_content';
      const menus = site + '/apijson/config_pages/release_settings?fields[config_pages--release_settings]=field_prerelease_content,field_full_release_content';
      const paths = site + '/apijson/path_alias/path_alias';

      let [f, m, d, configuration] = await Promise.all([
        axios.get(files),
        axios.get(media),
        axios.get(doc),
        axios.get(conf),
      ]);

      const fullRelease = getFullRelease(configuration);

      let [fi, sv, en,] = await Promise.all([
        axios.get(d_url_fi),
        axios.get(d_url_sv),
        axios.get(d_url_en),
      ]);

      console.log(en);

      let fiData = findData('fi', fi.data, f, m, d);
      let svData = findData('sv', sv.data, f, m, d);
      let enData = findData('en', en.data, f, m, d);
      console.log(en);
      //setError(false);
      console.log(svData);
      console.log(fiData);
      console.log(enData);
      console.log(configuration);
      setData({en: enData, fi: fiData, sv: svData, files: f, media: m, configuration: configuration, site: site});
      setLoading(false);
    }

    makeRequests();
  }, []);

  const enterRoute = (transition) => {
      console.log('enterRooutte');
      transition.redirect('/en');
  };

  return (

      <ThemeProvider theme={groteskTheme}>

          <Switch>
            <Route path="/:id/:restofit"
                   children={<Landing data={data} loading={loading} testing={testing} site={site}></Landing>}/>
            <Route path="/:id" onEnter={enterRoute}
                   children={<Landing data={data} loading={loading} testing={testing} site={site}></Landing>}/>
            <Redirect to={'/fi'}></Redirect>
          </Switch>

      </ThemeProvider>

  );
}

export default App;
