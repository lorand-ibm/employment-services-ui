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
      <Landing></Landing>
    </ThemeProvider>
  );
}

export default App;
