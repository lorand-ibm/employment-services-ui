//import logo from './logo.svg';
import './App.css';
import './fonts.css';

import Landing from './Landing';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import {findData} from "./dataHelper";
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

  useEffect(() => {
    async function makeRequests() {
      setLoading(true);

      const d_url_fi = process.env.REACT_APP_DRUPAL_URL + '/fi/apijson/node/prerelease_landing?include=field_prerelease_';
      const d_url_sv = process.env.REACT_APP_DRUPAL_URL + '/sv/apijson/node/prerelease_landing?include=field_prerelease_';
      const d_url_en = process.env.REACT_APP_DRUPAL_URL + '/apijson/node/prerelease_landing?include=field_prerelease_';
      const files = process.env.REACT_APP_DRUPAL_URL + '/apijson/file/file';
      const media = process.env.REACT_APP_DRUPAL_URL + '/apijson/media/image';
      const doc = process.env.REACT_APP_DRUPAL_URL + '/apijson/media/document';
      const conf = process.env.REACT_APP_DRUPAL_URL + '/apijson/config_pages/release_settings?fields[config_pages--release_settings]=field_prerelease_content,field_full_release_content';
      const menus = process.env.REACT_APP_DRUPAL_URL + '/apijson/config_pages/release_settings?fields[config_pages--release_settings]=field_prerelease_content,field_full_release_content';
      let [fi, sv, en, f, m, d, configuration] = await Promise.all([
        axios.get(d_url_fi),
        axios.get(d_url_sv),
        axios.get(d_url_en),
        axios.get(files),
        axios.get(media),
        axios.get(doc),
        axios.get(conf),
      ]);
      let fiData = findData('fi', fi.data, f, m, d);
      let svData = findData('sv', sv.data, f, m, d);
      let enData = findData('en', en.data, f, m, d);
      //setError(false);
      //console.log(svData);
      //console.log(fiData);
      //console.log(enData);
      console.log(configuration);
      setData({en: enData, fi: fiData, sv: svData, files: f, media: m, configuration: configuration});
      setLoading(false);
    }

    makeRequests();
  }, []);

  return (
      <ThemeProvider theme={groteskTheme}>
          <Landing data={data} loading={loading} testing={testing}></Landing>
      </ThemeProvider>
  );
}

export default App;
