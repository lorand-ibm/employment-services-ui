import * as React from "react";
import {Card} from "hds-react/components/Card";
import {Koros} from "hds-react/components/Koros";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SingleCard from "./SingleCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: props => ({
    backgroundColor: props.bgColor,
    paddingBottom: 50,
  }),
  koros: props => ({
    fill: props.bgColor,
  }),
  title: {
    nocolor: 'white',
    nobackground: 'blue',
    fontFamily: 'HelsinkiGrotesk',
    fontSize: 36,
    paddingBottom: 25,
    fontWeight: 'bold',
  },
}));

function CardList(props) {
    const classes = useStyles(props);
    const { title, cards, site, isKoro } = props;

    console.log(cards);
    return (
        <React.Fragment>
          <Grid container >
            {isKoro ? <Koros type="basic" className={classes.koros}/> : <></>}
            <Grid container className={classes.root}>
              <Typography
                gutterBottom variant="h5" component="h2"
                className={classes.title}>
                {title}
              </Typography>
                  <Grid container direction={"row"} spacing={3}  justify="left" className={classes.textArea}>
                    {cards.map((item, i) => (
                        <Grid item key={i}>
                          <SingleCard
                            key = {i}
                            {...item}
                            site = {site}
                            className={classes.title}
                          >
                          </SingleCard>
                        </Grid>
                      ))}
                  </Grid>
              </Grid >
          </Grid>
        </React.Fragment>
    );
}

CardList.propTypes = {};

export default CardList;
