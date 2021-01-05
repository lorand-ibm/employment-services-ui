import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Main from './Main';
import FooterBottom from './FooterBottom';
import data_fi from './data_fi';
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

const data_sv = [
  { 'type': "Info", 'title': "Sivut aukeavat", 'text': "sillä välin voit selata"},
];

const sections = [
];

export default function Blog() {
  const classes = useStyles();

  //console.log(data_fi);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Navigation
            logoLanguage="fi"
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
              <Navigation.LanguageSelector label="FI">
                <Navigation.Item
                    as="a"
                    href="#"
                    label="Suomeksi"
                    onClick={function noRefCheck(){}}
                />
                <Navigation.Item
                    as="a"
                    href="#"
                    label="På svenska"
                    onClick={function noRefCheck(){}}
                />
                <Navigation.Item
                    as="a"
                    href="#"
                    label="In English"
                    onClick={function noRefCheck(){}}
                />
              </Navigation.LanguageSelector>
            </Navigation.Actions>
          </Navigation>
        <main>
          <Typography paragraph={true} gutterBottom={true} className={classes.hero}>
            <Hero
              title={'Työllisyyden kuntakokeilu alkaa 2021'}
              text={'Helsingin työllisyyspalveluiden tavoitteena on edistää nykyistä tehokkaammin työttömien työnhakijoiden työllistymistä ja koulutukseen ohjautumista, sekä tuoda uusia ratkaisuja osaavan työvoiman saatavuuteen.'}
              className={classes.hero}
            />
          </Typography>
          <Paragraphs paragraphs={data_fi}/>
        </main>
      </Container>
      <FooterBottom
        title="Työllisyyspalvelut"
        description=""
      />
    </React.Fragment>
  );
}
