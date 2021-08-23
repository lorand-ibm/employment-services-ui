import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Koros } from "hds-react/components/Koros";
import { Container, Button as HDSButton, IconPlus } from "hds-react";
import { makeStyles } from "@material-ui/core/styles";
import { ParagraphGrid } from "./ParagraphGrid";
import CardList from "./CardList";
import { Mainheading } from "./Headings";
import { Lang } from "../types";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 0 60px",
    margin: "0 auto 0 auto",
    [theme.breakpoints.down(768)]: {
      paddingLeft: 16,
      paddingRight: 16,
      maxWidth: "100%",
    },
  },
  title: {
    paddingBottom: 20,
    paddingTop: 15,
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
    alt: string;
    startTime: string;
    endTime: string;
    location: string;
  }>;
}

interface EventListProps {
  title: string;
  // TODO:
  lang: Lang;
  bgColor: string;
}

function EventsList(props: EventListProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation();
  const { title, bgColor, lang } = props;

  const [eventsIndex, setEventsIndex] = useState<number>(0);
  const [events, setEvents] = useState<EventState>({ total: 0, results: [] });

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`/api/events/all/${eventsIndex}`);
      const newEvents = {
        total: res.data.total,
        results: [...events.results, ...res.data.results],
      };
      setEvents(newEvents);
    };
    fetchEvents();
  }, [eventsIndex]); // eslint-disable-line

  const loadMoreText = t("list.load_more");
  const eventsUrl = t("list.events_url");
  const resultsText = t("list.results_text");
  const isKoro = true;

  return (
    <div
      style={{
        paddingTop: isKoro ? "20px" : "40px",
        backgroundColor: bgColor,
        position: "relative",
      }}
    >
      <div style={{ backgroundColor: bgColor }}>
        {isKoro ? (
          <Koros
            type="basic"
            style={{ fill: bgColor, position: "absolute", top: "-15px" }}
          />
        ) : (
          <></>
        )}
        <Container className={classes.container} style={{ zIndex: 10 }}>
          <ParagraphGrid className={classes.cardList} paragraphWidth="Full">
            <div className={classes.title}>
              <Mainheading headingTag="h2" title={title} />
            </div>
            <div
              className={classes.results}
            >{`${events.total} ${resultsText}`}</div>
            <CardList
              lang={lang}
              cards={events.results.map((event) => ({
                type: "event",
                title: event.title,
                image: event.image,
                alt: event.alt,
                title_color: "#fd4f00",
                location: event.location,
                dateContent: {
                  startTime: event.startTime,
                  endTime: event.endTime,
                },
                url: `${eventsUrl}${event.path}`,
              }))}
            />
            {events.total > events.results.length && (
              <div className={classes.loadMore}>
                <HDSButton
                  variant="supplementary"
                  iconRight={<IconPlus />}
                  style={{ background: 'none' }}
                  onClick={() => {
                    if (events.total > events.results.length) {
                      setEventsIndex(eventsIndex + 1);
                    }
                  }}
                >
                  {loadMoreText}
                </HDSButton>
              </div>
            )}
          </ParagraphGrid>
        </Container>
      </div>
    </div>
  );
}
export default EventsList;
