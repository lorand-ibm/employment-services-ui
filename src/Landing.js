import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import FooterBottom from './FooterBottom';
import data_fi from './data_fi';
import data_sv from './data_sv';
import data_en from './data_en';
import Paragraphs from './Paragraphs';
import Hero from './Hero';
import {Navigation} from "hds-react/components/Navigation";


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  hero: {
    height: 550,
  },
  main: {
    marginBottom: 100,
  },
  paragraphs: {
    marginTop: 72
  }
}));

let appNames = {
  fi: { name: 'Työllisyyspalvelut'},
  sv: { name: 'Arbetstjänster'},
  en: { name: 'Employment services'}
};

export default function Landing(props) {
  const [lang, setLang] = useState('FI');
  const classes = useStyles();

  const { data, loading, testing } = props;
  let useData = data.fi;
  if (testing) {
    useData = {en: data_en, sv: data_sv, fi: data_fi,};
  }

  let logolang = 'fi';
  let appName = appNames.fi.name;

  switch (lang) {
    case 'EN':
      useData = data.en;
      logolang = 'en';
      appName = appNames.en.name;
      break;
    case 'SV':
      useData = data.sv;
      logolang = 'sv';
      appName = appNames.sv.name;
      break;
    case 'FI':
    default:
      useData = data.fi;
      appName = appNames.fi.name;
  }

  const heroTitle = loading ? 'loading' : useData[0].title;
  const heroText = loading ? 'loading' : useData[0].text;
  const heroUrl = loading ? 'loading' : useData[0].url;
  if (loading) {
    return <div></div>;
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
      {loading ? <div></div> :
        <main className={classes.main}>
          <Hero
            title={heroTitle}
            text={heroText}
            url={heroUrl}
            className={classes.hero}
          />
          <Paragraphs paragraphs={useData} className={classes.paragraphs}/>
          }
        </main>
      }
      <FooterBottom
        title={appName}
        description=""
        lang={logolang}
      />
    </React.Fragment>
  );
}
