import PropTypes from "prop-types";
import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Button} from "hds-react/components/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LaunchIcon from "@material-ui/icons/Launch";
import Link from "@material-ui/core/Link";
import SingleCard from "./SingleCard";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    background: 'blue',
    fontFamily: 'HelsinkiGrotesk'
  },
  text: {
    fontSize: 16,
    fontFamily: 'HelsinkiGrotesk'
  },
  button: {
    color: 'black',
    background: 'white',
  }
}));

function CardList(props) {
    const classes = useStyles();
    const { title, bgColor, isKoro, cards } = props;

    return (
        <React.Fragment>
          <Card
            border
            heading={'Card list: ' + title}
            className={classes.title}
            theme = {{
              'card-body-margin-bottom' : 0
            }}
          >
            <Grid container spacing={1}  justify="left" className={classes.textArea}>
              {cards.map((item, i) => (
                  <Grid item>
                    <SingleCard
                      key={i}
                      {...item}
                    >

                    </SingleCard>
                  </Grid>
                ))}
            </Grid>
          </Card>
        </React.Fragment>
    );
}

CardList.propTypes = {};


export default CardList;
