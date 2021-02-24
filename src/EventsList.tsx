import React, { useEffect, useState } from "react";
import axios from "axios";

import { Koros } from "hds-react/components/Koros";
import { Container, Button as HDSButton, IconPlus } from "hds-react";
import Grid from "@material-ui/core/Grid";

import { ParagraphGrid } from "./Paragraphs";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import CardList from "./CardList";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    margin: "0 auto 32px auto",
    [theme.breakpoints.down(768)]: {
      paddingLeft: 16,
      paddingRight: 16,
      maxWidth: "100%",
    },
  },
  title: {
    nocolor: "white",
    nobackground: "blue",
    fontFamily: "HelsinkiGrotesk",
    fontSize: 36,
    paddingBottom: 25,
    fontWeight: "bold",
  },
  cardList: {
    width: "100%",
  },
  results: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "HelsinkiGrotesk",
    paddingBottom: "20px",
  },
  loadMore: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 30,
  },
}));

interface EventState {
  total: number;
  results: Array<{
    title: string;
    path: string;
    image: string;
    startTime: string;
    endTime: string;
  }>;
}

interface EventListProps {
  site: string;
  lang: string;
  bgColor: string;
}

function EventsList(props: EventListProps) {
  const classes = useStyles();
  const { lang, site, bgColor } = props;

  const [eventsIndex, setEventsIndex] = useState<number>(0);
  const [events, setEvents] = useState<EventState>({ total: 0, results: [] });

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/api/events/all/" + eventsIndex);
      const newEvents = {
        total: res.data.total,
        results: [...events.results, ...res.data.results],
      }
      setEvents(newEvents);
    };
    fetchEvents();
  }, [eventsIndex]);

  const isKoro = true;
  return (
    <div style={{ paddingTop: "50px" }}>
      <div
        style={{
          paddingTop: isKoro ? "20px" : "40px",
          paddingBottom: "20px",
          backgroundColor: bgColor,
          position: "relative",
        }}
      >
        <div style={{ backgroundColor: bgColor }}>
          {isKoro ? <Koros type="basic" style={{ fill: bgColor, position: "absolute", top: "-20px" }} /> : <></>}
          <Container className={classes.container} style={{ zIndex: 10 }}>
            <ParagraphGrid className={classes.cardList} paragraphWidth={"Full"}>
              <h1>Tapahtumakalenteri</h1>
              <div className={classes.results}>{events.total + ""} hakutulosta</div>
              <CardList
                cards={events.results.map((event) => ({
                  type: "event",
                  title: event.title,
                  image: event.image,
                  title_color: "#fd4f00",
                  dateContent: { startTime: event.startTime, endTime: event.endTime },
                  button_url: "/fi/tapahtuma/" + event.path,
                }))}
                site={site}
              ></CardList>
              {events.total > events.results.length && (
                <div className={classes.loadMore}>
                  <HDSButton
                    variant="supplementary"
                    iconRight={<IconPlus />}
                    onClick={() => {
                      if (events.total > events.results.length) {
                        setEventsIndex(eventsIndex+1);
                      }
                    }}
                  >
                    Lataa enemmän
                  </HDSButton>
                </div>
              )}
            </ParagraphGrid>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default EventsList;
