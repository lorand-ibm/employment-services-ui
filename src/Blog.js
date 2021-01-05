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

//const sections = [
//];

export default function Blog() {
  const [lang, setLang] = useState('FI');
  const classes = useStyles();

  let data = data_fi;
  let logolang = 'fi';
  switch(lang) {
    case 'EN': data = data_en; break;
    case 'SV': data = data_sv; logolang = 'sv'; break;
    case 'FI':
    default:
      data = data_fi;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Navigation
            logoLanguage={logolang}
            menuToggleAriaLabel="Menu"
            skipTo="#content"
            skipToContentLabel="Skip to main content"
            theme="light"
            title="Työllisyyspalvelut"
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
        <main>
          <Typography paragraph={true} gutterBottom={true} className={classes.hero}>
            <Hero
              title={data[0].title}
              text={data[0].text}
              className={classes.hero}
            />
          </Typography>
          <Paragraphs paragraphs={data}/>
        </main>
      </Container>
      <FooterBottom
        title="Työllisyyspalvelut"
        description=""
      />
    </React.Fragment>
  );
}
