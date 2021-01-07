import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FooterBottom from './FooterBottom';
import data_fi from './data_fi';
import data_sv from './data_sv';
import data_en from './data_en';
import Paragraphs from './Paragraphs';
import Hero from './Hero';
import {Navigation} from "hds-react/components/Navigation";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  hero: {
    height: 550
  },
  font: {

  }
}));

let appNames = {
  fi: { name: 'Työllisyyspalvelut'},
  sv: { name: 'Arbetstjänster'},
  en: { name: 'Employment services'}
};

//const sections = [
//];

export default function Blog() {
  const [lang, setLang] = useState('FI');
  const classes = useStyles();

  let data = data_fi;
  let logolang = 'fi';
  let appName = appNames.fi.name;
  switch(lang) {
    case 'EN': data = data_en; logolang = 'en'; appName = appNames.en.name; break;
    case 'SV': data = data_sv; logolang = 'sv'; appName = appNames.sv.name; break;
    case 'FI':
    default:
      appName = appNames.fi.name;
      data = data_fi;
  }

  return (
    <React.Fragment>
      <CssBaseline />
        <Navigation
            logoLanguage={logolang}
            menuToggleAriaLabel="Menu"
            skipTo="#content"
            skipToContentLabel="Skip to main content"
            theme={{
              '--header-divider-color': 'white',
            }}
            title={appName}
            titleAriaLabel="Helsinki: Työllisyyspalvelut"
            titleUrl="https://tyollisyyspalvelut.hel.fi"
            style={{'--header-divider-color':'white'}}
        >
          <Navigation.Actions>
              <Navigation.LanguageSelector label={lang}>
                <Navigation.Item label="Suomeksi" onClick={() => setLang('FI')}/>
                <Navigation.Item label="På svenska" onClick={() => setLang('SV')}/>
                <Navigation.Item label="In English" onClick={() => setLang('EN')}/>
              </Navigation.LanguageSelector>
            </Navigation.Actions>
          </Navigation>
      <Typography paragraph={true} gutterBottom={true} className={classes.hero}>
        <Hero
          title={data[0].title}
          text={data[0].text}
          className={classes.hero}
        />
      </Typography>
      <Container maxWidth="xl">
        <main>

          <Paragraphs paragraphs={data}/>
        </main>
      </Container>
      <FooterBottom
        title={appName}
        description=""
        lang={logolang}
      />
    </React.Fragment>
  );
}
