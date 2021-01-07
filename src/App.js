//import logo from './logo.svg';
import './App.css';
import './fonts.css';

import Blog from './Blog';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
      <Blog></Blog>
    </ThemeProvider>
  );
}

export default App;
