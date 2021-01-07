import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Koros} from  "hds-react/components/Koros";

import {
  FiCard,
  FiCardActionArea,
  FiCardContent,
  FiCardMedia
} from "./FullImageCard";

/*
import grotesk from './HelsinkiGrotesk-Regular.woff';

const raleway = {
  fontFamily: 'HelsinkiGrotesk',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('HelsinkiGrotesk'),
    local('HelsinkiGrotesk-Regular'),
    url(${grotesk}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
*/

const useStyles = makeStyles({
  container: {
    sheight: 550
  },
  card: {
    backgroundColor: '#D0E6F7'
  },
  media: {
    sheight: 550
  },
 fiCardContent: {
    height: 550,
    color: 'black',
    width: '40%'
  },
  fiCardContentTextSecondary: {
    color: "black"
  },
  mediaPic : {
    clipPath: 'url(#koros)'
  },
  koro: {
    fill: '#D0E6F7',
    color: '#D0E6F7',
    background: 'transparent',
  },
});

function Hero(props) {
  const classes = useStyles();
  const { title, text } = props;

  return (
    <React.Fragment>
      <Hidden mdDown>
        <Container maxWidth="xl" className={classes.container}>
          <FiCard className={classes.card}>
            <FiCardActionArea>
              <FiCardMedia className={classes.mediaPic}
                           media="picture"
                           alt={title}
                           image="herokuva.jpg"
                           title={title}
                           height="550"
              />
              <FiCardContent className={classes.fiCardContent}>

                  <Typography gutterBottom variant="h2" component="h1" maxWidth={3} xs={3} justify="left">
                    {title}
                  </Typography>
                  <Typography maxWidth={3}
                    variant="h6"
                    className={classes.fiCardContentTextSecondary}
                    component="p"
                  >
                    {text}
                  </Typography>

              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
          <svg id="clip" width='0' height='0'  version="1.1">
            <defs>
              <polygon id="poly" points="0.39,1 0.69,0 1,0 1,1"/>
              <path fill="#9FC9EB" id="arch" transform="scale( .001049317943337 .001923076923077) " d="M953,520.000443 L0,520.000443 L0,520.000443 L2.15245491,515.412731 L2.15245491,515.412731 C5.6267527,508.865909 10.6009035,501.901614 18.327954,494.171617 C33.6299816,478.863754 45.9292894,474.327855 57.9128568,470.884628 L60.3061565,470.207684 L60.3061565,470.207684 L64.289253,469.097457 L64.289253,469.097457 L65.8846121,468.6448 C77.8605406,465.209215 90.1178352,460.715346 105.343475,445.4839 C120.230767,430.59093 124.855127,418.538119 128.259557,406.814501 L128.717085,405.217631 L128.717085,405.217631 L130.272907,399.640293 C130.347537,399.37452 130.422492,399.108652 130.497879,398.84266 L130.956225,397.24497 C134.367859,385.514145 139.025836,373.427704 153.97316,358.47468 C168.920484,343.521656 181.003509,338.86071 192.734034,335.443601 L194.331702,334.984492 L194.331702,334.984492 L195.926416,334.535703 L195.926416,334.535703 L199.909563,333.425426 L199.909563,333.425426 L201.505082,332.97261 L201.505082,332.97261 L203.104015,332.507171 C214.578656,329.114113 226.425411,324.355787 240.988681,309.786963 C256.229313,294.540519 260.728468,282.271548 264.163033,270.290763 L264.615516,268.694797 L264.615516,268.694797 L265.724973,264.710528 L265.724973,264.710528 L266.173436,263.11536 C269.644703,250.876209 274.02589,238.376166 289.653452,222.742645 C304.601554,207.788841 316.685016,203.127459 328.416008,199.709883 L330.01374,199.25071 L330.01374,199.25071 L331.608518,198.801856 L331.608518,198.801856 L335.59183,197.691415 C335.857555,197.616702 336.123364,197.541677 336.389285,197.466231 L337.986403,197.007672 C349.711996,193.595498 361.770257,188.959326 376.673359,174.05054 C391.57646,159.141755 396.370912,146.918787 399.890244,135.080224 L400.363079,133.46804 L400.363079,133.46804 L400.825084,131.859326 L400.825084,131.859326 L401.965382,127.844204 L401.965382,127.844204 L402.428682,126.237417 L402.428682,126.237417 L402.90355,124.628263 C406.360125,113.08441 411.091504,101.25828 425.342515,87.0018346 C439.262107,73.0769341 450.830249,68.2923862 462.09065,64.8929034 L463.697406,64.4158478 C463.964924,64.3376297 464.232322,64.2599875 464.499628,64.1828165 L466.102586,63.7246066 L466.102586,63.7246066 L470.109042,62.5955799 L470.109042,62.5955799 L471.714725,62.1373792 C483.769779,58.6647701 496.141872,54.2385152 511.34468,39.3199499 L512.435928,38.2340377 L512.435928,38.2340377 L512.996297,37.6392968 L512.996297,37.6392968 L513.74192,36.8194762 L513.74192,36.8194762 L514.551182,35.9013599 L514.551182,35.9013599 L515.308609,35.0181543 L515.308609,35.0181543 L515.9348,34.271363 L515.9348,34.271363 L516.377775,33.7341614 L516.377775,33.7341614 L517.077622,32.8704727 L517.077622,32.8704727 L517.566095,32.2567454 L517.566095,32.2567454 L518.070749,31.6131951 L518.070749,31.6131951 L518.59043,30.9402718 L518.59043,30.9402718 L519.123985,30.2384252 L519.123985,30.2384252 L519.67026,29.5081054 L519.67026,29.5081054 L520.228102,28.7497622 L520.228102,28.7497622 L520.796356,27.9638456 C520.891869,27.8305867 520.987767,27.6961976 521.084028,27.5606878 L521.665738,26.7342545 C521.763349,26.594299 521.861274,26.4532415 521.959489,26.3110914 L522.55206,25.4451537 L522.55206,25.4451537 L523.15043,24.5534421 C523.250577,24.4027006 523.350918,24.2509041 523.451429,24.0980617 L524.056333,23.1685328 L524.056333,23.1685328 L524.664152,22.2143548 C524.765634,22.053296 524.867189,21.8912289 524.968794,21.7281629 L525.578821,20.7378548 L525.578821,20.7378548 L526.188879,19.7240222 C527.611486,17.3313177 529.02492,14.7501714 530.363234,12.0063026 L530.932005,10.8204711 C532.529405,7.43281301 534.002149,3.81063965 535.232162,4.72937245e-11 L953,4.72937245e-11 L953,4.72937245e-11 L953,520.000443 Z"></path>
            </defs>
            <defs>
              <clipPath id="koros" clipPathUnits="objectBoundingBox">
                <use href="#arch" transform="translate(.2)" fill="yellow"/>
              </clipPath>
            </defs>
          </svg>
        </Container>
      </Hidden>
      <Hidden lgUp>
        <Typography className={classes.card}>
          <Typography gutterBottom variant="h2" component="h1" maxWidth={3} xs={3} justify="left">
            {title}
          </Typography>
          <Typography maxWidth={3}
                      variant="h6"
                      className={classes.fiCardContentTextSecondary}
                      component="p"
          >
            {text}
          </Typography>

          <FiCard className={classes.card}>
            <FiCardActionArea>
              <FiCardMedia className={classes.mediaPic}
                           media="picture"
                           alt={title}
                           image="herokuva.jpg"
                           title={title}
                           height="550"
              />
              <FiCardContent className={classes.fiCardContent}>



              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
        </Typography>
      </Hidden>
    </React.Fragment>
  );
}

Hero.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


export default Hero;
