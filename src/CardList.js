import * as React from "react";
import {Card} from "hds-react/components/Card";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SingleCard from "./SingleCard";

const useStyles = makeStyles((theme) => ({
  title: {
    nocolor: 'white',
    nobackground: 'blue',
    fontFamily: 'HelsinkiGrotesk',
    fontSize: 36,
  },
}));

function CardList(props) {
    const classes = useStyles();
    const { title, cards } = props;

    return (
        <React.Fragment>
          <Card

            heading={title}
            theme = {{
              'card-body-margin-bottom' : 0
            }}
            className = {classes.title}
          >
            <Grid container spacing={3}  justify="left" className={classes.textArea}>
              {cards.map((item, i) => (
                  <Grid item>
                    <SingleCard
                      key={i}
                      {...item}
                      className={classes.title}
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
