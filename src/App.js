//import logo from './logo.svg';
import './App.css';
import './fonts.css';

import Landing from './Landing';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
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

async function makeRequests() {
  /*let [u1, u2] = await Promise.all([
    //axios.get('https://tyollisyys.docker.sh/sv/jsonapi/node/landing/'),
    axios.get('https://tyollisyys.docker.sh/jsonapi/file/file/')
  ]);


  //console.log(u1);
  console.log(u2);
*/
}

function App() {

  makeRequests();
  return (
      <ThemeProvider theme={groteskTheme}>
          <Helmet htmlAttributes={{lang: 'fi'}}>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:url" content={"url"} />
            <meta property="og:image" content={'image'} />
            <meta property="og:description" content={'description'} />
            <meta name="twitter:description" content={'description'} />
            <meta name="description" content={'description'} />
            <meta property="og:image:width" content="1980" />
            <meta property="og:image:height" content="900" />
          </Helmet>

          <Landing></Landing>
      </ThemeProvider>

  );
}

export default App;
