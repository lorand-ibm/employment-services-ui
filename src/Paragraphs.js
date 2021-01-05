import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import * as React from "react";
import Accord from "./Accord";
import Subheading from "./Subheading";
import Info from "./Info";
import Pdf from "./Pdf";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Paragraphs(props) {
    const { paragraphs } = props;
    console.log(paragraphs);
    const items = [];
    paragraphs.map((paragraph, index) => {

        switch(paragraph.type) {
            case 'Accordion':
                items.push(
                  <Container justify="center" xs={3}>
                    <Typography paragraph={true} gutterBottom={true} >
                      <Accord key={index} {...paragraph}></Accord>
                    </Typography>
                  </Container>
                );
                break;
            case 'Subheading':
                items.push(
                  <Container justify="center" xs={3}>
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
                  <Container justify="center" xs={4}>
                    <Typography paragraph={true} gutterBottom={true}>
                      <Info key={index} {...paragraph}></Info>
                    </Typography>
                  </Container>
                );
                break;
            case 'PDF':
                items.push(
                    <Container justify="center" xs={3}>
                      <Typography paragraph={true} gutterBottom={true}>
                        <Pdf key={index} {...paragraph}></Pdf>
                      </Typography>
                    </Container>
                    );
                break;
          default: break;
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
