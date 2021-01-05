import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";
import * as React from "react";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Accord from "./Accord";
import Subheading from "./Subheading";
import Info from "./Info";
import Pdf from "./Pdf";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

function Paragraphs(props) {
    const classes = useStyles();
    const { paragraphs } = props;
    console.log(paragraphs);
    const items = [];
    paragraphs.map((paragraph, index) => {

        switch(paragraph.type) {
            case 'Accordion':
                items.push(
                  <Container justify="center" xs={4}>
                    <Typography paragraph={true} gutterBottom={true} >
                      <Accord key={index} {...paragraph}></Accord>
                    </Typography>
                  </Container>
                );
                break;
            case 'Subheading':
                items.push(
                  <Container justify="center" xs={4}>
                    <Box bb={5} mt={5} pt={6}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Subheading key={index} {...paragraph}></Subheading>
                      </Typography>
                    </Box>
                  </Container>
                );
                break;
            case 'Info':
                items.push(
                  <Container justify="center" xs={8}>
                    <Typography paragraph={true} gutterBottom={true}>
                      <Info key={index} {...paragraph}></Info>
                    </Typography>
                  </Container>
                );
                break;
            case 'PDF':
                items.push(
                    <Container justify="center" xs={4}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Pdf key={index} {...paragraph}></Pdf>
                      </Typography>
                    </Container>
                    );
                break;
        }
    });
    return (
        <React.Fragment>
            {items}
        </React.Fragment>
    );
}

Paragraphs.propTypes = {
    paragraphs: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Paragraphs;
