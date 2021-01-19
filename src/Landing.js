import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import FooterBottom from './FooterBottom';
import data_fi from './data_fi';
import data_sv from './data_sv';
import data_en from './data_en';
import Paragraphs from './Paragraphs';
import Hero from './Hero';
import {Navigation} from "hds-react/components/Navigation";
import {findData} from './dataHelper';

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

export default function Landing() {
  const lang = 'FI';
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
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

  useEffect(() => {
    setAppState({ loading: true });
    const d_url_fi = process.env.REACT_APP_DRUPAL_URL + '/fi/jsonapi/node/prerelease_landing?include=field_prerelease_';
    const d_url_sv = process.env.REACT_APP_DRUPAL_URL + '/sv/jsonapi/node/prerelease_landing?include=field_prerelease_';
    const d_url_en = process.env.REACT_APP_DRUPAL_URL + '/jsonapi/node/prerelease_landing?include=field_prerelease_';
    const files = process.env.REACT_APP_DRUPAL_URL + '/jsonapi/media/image';
    fetch(d_url_fi)
      .then((res) => res.json())
      .then((fijson) => {
        let data_fii = findData('fi', fijson);
        console.log(data_fii);
        setAppState({ loading: false, d_di:fijson  });
      });
    fetch(d_url_sv)
      .then((res) => res.json())
      .then((svjson) => {
        let data_svsv = findData('sv', svjson);
        setAppState({ loading: false, d_sv: svjson});
        console.log(data_svsv);
      });
    fetch(d_url_en)
      .then((res) => res.json())
      .then((enjson) => {
        let data_enen = findData('en', enjson);
        console.log(data_enen);
        setAppState({ loading: false, d_en: enjson });
      });
    fetch(files)
      .then((res) => res.json())
      .then((filejson) => {
        //let data_enen = findData('en', enjson);
        console.log('files:');
        console.log(filejson);
        setAppState({ loading: false, files: filejson });
      });
  }, [setAppState]);

  let setLang = (l) => {}
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
      <main className={classes.main}>
        <Hero
          title={data[0].title}
          text={data[0].text}
          className={classes.hero}
        />
         <Paragraphs paragraphs={data} className={classes.paragraphs}/>
      </main>
      <FooterBottom
        title={appName}
        description=""
        lang={logolang}
      />
    </React.Fragment>
  );
}
