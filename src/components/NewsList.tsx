import React, { useEffect, useState } from "react";
import axios from "axios";
import { Koros } from "hds-react/components/Koros";
import { Container, Button as HDSButton, IconPlus } from "hds-react";
import { ParagraphGrid } from "../Paragraphs";
import { makeStyles } from "@material-ui/core/styles";
import CardList from "./CardList";
import { Mainheading } from "./Headings";
import { Lang } from "../types";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
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
  loadMore: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 30,
  },
}));

interface NewsState {
  total: number;
  results: Array<{
    path: string;
    title: string;
    summary: string;
    date: string;
  }>;
}

interface NewsListProps {
  title: string;
  // TODO:
  lang: Lang;
  bgColor: string;
}

function NewsList(props: NewsListProps) {
  const classes = useStyles();
  const { title, bgColor, lang } = props;

  const [newsIndex, setNewsIndex] = useState<number>(0);
  const [news, setNews] = useState<NewsState>({ total: 0, results: [] });

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get("/api/news/all/" + newsIndex);
      const newNews = {
        total: res.data.total,
        results: [...news.results, ...res.data.results],
      };
      setNews(newNews);
    };
    fetchNews();
  }, [newsIndex]);

  const loadMoreText = lang === "fi" ? "Lataa lisää" : lang === "sv" ? "Visa fler" : "Show more";
  const newsUrl = lang === "fi" ? "/fi/uutiset" : lang === "sv" ? "/sv/nyheter" : "/en/news";

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
        {isKoro ? <Koros type="basic" style={{ fill: bgColor, position: "absolute", top: "-15px" }} /> : <></>}
        <Container className={classes.container} style={{ zIndex: 10 }}>
          <ParagraphGrid className={classes.cardList} paragraphWidth={"Full"}>
            <div className={classes.title}>
              <Mainheading headingTag={"h2"} title={title} />
            </div>
            <CardList
              lang={lang}
              cards={news.results.map((news) => ({
                type: "news",
                title: news.title,
                title_color: "#1a1a1a",
                dateContent: { startTime: news.date },
                button_url: `${newsUrl}${news.path}`,
              }))}
            ></CardList>
            {news.total > news.results.length && (
              <div className={classes.loadMore}>
                <HDSButton
                  variant="supplementary"
                  iconRight={<IconPlus />}
                  onClick={() => {
                    if (news.total > news.results.length) {
                      setNewsIndex(newsIndex + 1);
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
export default NewsList;
