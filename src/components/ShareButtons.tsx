import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { IconLink, IconFacebook, IconLinkedin, IconTwitter } from "hds-react";
import Box from "@material-ui/core/Box";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import { getAppName } from "../config";
import { Lang } from "../types";

const useStyles = makeStyles(() => ({
  box: {
    display: "inline-block",
    marginRight: 20,
  },
  button: {
    color: '#000',
    padding: 0,
    verticalAlign: "baseline",
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
}));

export interface ShareButtonsProps {
  lang: Lang;
  pageSummary: string;
  pageTitle: string;
}

function ShareButtons(props: ShareButtonsProps): JSX.Element {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { lang, pageSummary, pageTitle } = props;
  const url = window.location.href;

  const handleClick = (pageUrl: string) => {
    console.log(pageUrl)
    navigator.clipboard.writeText(pageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={classes.box}>
        <IconButton
          className={classes.button}
          onClick={() => {
            handleClick(url);
          }}
          aria-label="copy page url">
          <IconLink size="m" />
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} variant="filled" severity="success" color="success">
            { t('link_copied') }
          </Alert>
        </Snackbar>
      </Box>
      <Box className={classes.box}>
        <FacebookShareButton url={url}>
          <IconFacebook size="m" />
        </FacebookShareButton>
      </Box>
      <Box className={classes.box}>
        <TwitterShareButton url={url} title={pageTitle}>
          <IconTwitter size="m" />
        </TwitterShareButton>
      </Box>
      <Box className={classes.box}>
        <LinkedinShareButton url={url} title={pageTitle} source={`${getAppName(lang)} | Helsinki`} {...(pageSummary && { summary: pageSummary } )}>
          <IconLinkedin size="m" />
        </LinkedinShareButton>
      </Box>
    </>
  );
}

export default ShareButtons;
