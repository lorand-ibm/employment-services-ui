import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SingleCard from "./SingleCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    nocolor: "white",
    nobackground: "blue",
    fontFamily: "HelsinkiGrotesk",
    fontSize: 36,
    paddingBottom: 25,
    paddingTop: 15,
    fontWeight: "bold",
  },
}));

interface CardListProps {
  title?: string;
  cards: any;
  site: string;
  // TODO!!!
  isKoro?: boolean;
}

function CardList(props: CardListProps) {
  const classes = useStyles(props);
  const { title, cards, site } = props;

  return (
    <>
      <Grid container style={{ zIndex: 10 }}>
        {title && (
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
        )}
        <Grid container direction={"row"} spacing={3} className={""}>
          {cards.map((item: any, i: number) => (
            <Grid item xs={12} md={4} key={i}>
              <SingleCard key={i} {...item} site={site} className={classes.title}></SingleCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default CardList;
