import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Koros } from "hds-react/components/Koros";
import { Container, Button as HDSButton, IconPlus, IconCrossCircle } from "hds-react";
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
  tags: {
    display: "flex",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#ffdbeb",
    border: "none",
    color: "#1a1a1a",
    marginRight: "12px",
    marginBottom: "16px",
    width: "auto",
  },
  selected: {
    backgroundColor: "#00005e",
    border: "none",
    color: "#fff",
    marginRight: "12px",
    marginBottom: "16px",
    width: "auto",
  },
  supplementary: {
    backgroundColor: "none",
    border: "none",
    color: "#1a1a1a",
    marginBottom: "16px",
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
  filter: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "HelsinkiGrotesk",
    paddingTop: "16px",
    paddingBottom: "8px",
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
    tags: string[];
    locationExtraInfo: string;
  }>;
}

interface EventListProps {
  title: string;
  // TODO: lang when there are translated events.
  lang: Lang;
  bgColor: string;
}

function EventsList(props: EventListProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation();
  const { title, bgColor, lang } = props;

  const [filter, setFilter] = useState<any | null>(null);
  const [eventsIndex, setEventsIndex] = useState<number>(0);
  const [events, setEvents] = useState<EventState>({ total: 0, results: [] });
  const [tags, setTags] = useState<Array<string>>([]);
  const allowedTags = ["Maahan muuttaneet", "Nuoret", "Info", "Koulutus", "Messut", "Neuvonta", "Rekrytointi", "Työpajat", "Digitaidot", "Etätapahtuma", "Palkkatuki", "Työnhaku"];

  useEffect(() => {
    const fetchTags = async () => {
      const res = await axios.get(`/api/tags`);
      const taglist = res.data.results[0].tags.sort((a: string, b: string) => allowedTags.indexOf(a) - allowedTags.indexOf(b));
      taglist.push(t("search.clear"));
      setTags(taglist);
    };
    fetchTags();
  }, []); // eslint-disable-line

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`/api/events/${eventsIndex}/${filter}`);
      const newEvents = {
        total: res.data.total,
        results: eventsIndex !== 0 ? [...events.results, ...res.data.results] : res.data.results,
      };
      setEvents(newEvents);
    };
    fetchEvents();
  }, [eventsIndex, filter]); // eslint-disable-line

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
            <div className={classes.results}>
              {filter !== t("search.clear")  ? `${events.results.length} / ${events.total} ${resultsText}` : `${events.total} ${resultsText}`}
            </div>
            <div className={classes.filter}>{t("search.filter")}</div>
            <div className={classes.tags}>
              {tags && Object.values(tags).map((tag: any, i: number) => (
                tag === t("search.clear") ? (
                  <HDSButton
                    variant="supplementary"
                    iconLeft={<IconCrossCircle />}
                    className={classes.supplementary}
                    onClick={() => {setFilter(null)}}
                  >
                    {tag}
                  </HDSButton>
                )
                : (
                  <HDSButton
                    className={filter === tag ? classes.selected: classes.tag}
                    onClick={() => {
                      setFilter(tag)
                      setEventsIndex(0)
                    }}
                  >
                    {tag}
                  </HDSButton>
                )
                ))}
            </div>
            <CardList
              lang={lang}
              cards={events.results.map((event) => ({
                type: "event",
                title: event.title,
                image: event.image,
                alt: event.alt,
                title_color: "#fd4f00",
                location: event.location,
                tags: event.tags.slice(0,3),
                locationExtraInfo: event.locationExtraInfo,
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
