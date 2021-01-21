//import logo from './logo.svg';
import './App.css';
import './fonts.css';

import Landing from './Landing';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

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
