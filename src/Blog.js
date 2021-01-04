import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import FooterBottom from './FooterBottom';
import data_fi from './data_fi';
import Paragraphs from './Paragraphs';
import {Navigation} from "hds-react/components/Navigation";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const data_sv = [
  { 'type': "Info", 'title': "Sivut aukeavat", 'text': "sillä välin voit selata"},
];


const sections = [

];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

const posts = [];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();

  console.log(data_fi);

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
