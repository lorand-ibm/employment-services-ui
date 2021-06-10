import React from "react";
import { useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "hds-react";
import { Params, Lang } from "../types";
import Footer from "../components/Footer";
import { getAppName } from "../config";

const notFoundTexts = {
  fi: {
    text: "Sivua ei valitettavasti löytynyt.",
    linkText: "Palaa etusivulle",
  },
  sv: { text: "Sidan hittades inte.", linkText: "Gå till startsidan" },
  en: {
    text: "Sorry! We can't find the page you were looking for.",
    linkText: "Return to our Homepage",
  },
};

interface NotFoundProps {
  lang: Lang;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "8em 0",
    margin: "0 auto 32px auto",
    textAlign: "center",
    [theme.breakpoints.down(768)]: {
      paddingLeft: 16,
      paddingRight: 16,
      maxWidth: "100%",
    },
  },
  main: {},
}));

function NotFound(props: NotFoundProps): JSX.Element {
  const classes = useStyles();
  const { langParam } = useParams<Params>();
  const { lang } = props;

  let texts = notFoundTexts.en;
  switch (lang) {
    case "sv":
      texts = notFoundTexts.sv;
      break;
    case "en":
      texts = notFoundTexts.en;
      break;
    case "fi":
    default:
      texts = notFoundTexts.fi;
      break;
  }

  return (
    <>
      <main className={classes.main}>
        <Container className={classes.container}>
          <Typography variant="h3" component="p" gutterBottom>
            {texts.text}
          </Typography>
          <Link display="block" variant="body1" href={`/${langParam}`}>
            {texts.linkText}
          </Link>
        </Container>
      </main>
      <Footer title={getAppName(lang)} lang={lang} lastParagraphColor="" />
    </>
  );
}

export default NotFound;
