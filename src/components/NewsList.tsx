import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Koros } from "hds-react/components/Koros";
import {
  Container,
  Button as HDSButton,
  IconPlus,
  IconArrowRight,
} from "hds-react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { ParagraphGrid } from "./ParagraphGrid";
import CardList from "./CardList";
import { Mainheading } from "./Headings";
import { Lang } from "../types";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 0 110px",
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
  box: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: 40,
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
    date: string;
    title: string;
    imageUrl: string;
    alt: string;
    summary: string;
  }>;
}

interface NewsListProps {
  title: string;
  lang: Lang;
  bgColor: string;
  isKoro: boolean;
  titleColor: string;
  limit: boolean;
}

function NewsList(props: NewsListProps): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const { title, bgColor, lang, isKoro, titleColor, limit } = props;

  const [newsIndex, setNewsIndex] = useState<number>(0);
  const [news, setNews] = useState<NewsState>({ total: 0, results: [] });

  useEffect(() => {}, []);

  useEffect(() => {
    const [, langPath] = location.pathname.split("/");

    const fetchNews = async () => {
      const res = await axios.get(`/api/news/all/${lang}/${newsIndex}`);
      const results = limit ? res.data.results.slice(0, 3) : res.data.results;
      const total = limit ? res.data.results.length : res.data.total;

      const newNews = {
        total,
        results: lang !== langPath ? results : [...news.results, ...results],
      };
      setNews(newNews);
    };
    fetchNews();
  }, [newsIndex, lang]); // eslint-disable-line

    const loadMoreText = t("list.load_more");
    const readMoreText = t("list.read_more_news");
    const newsUrl = t("list.news_url");

  if (news.total === 0) {
    return <></>;
  }

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
            <CardList
              lang={lang}
              type="listItem"
              cards={news.results.map((n) => ({
                type: "news",
                title: n.title,
                title_color: titleColor,
                imageUrl: n.imageUrl,
                alt: n.alt,
                text: n.summary,
                dateContent: { startTime: n.date },
                url: `${newsUrl}${n.path}`,
              }))}
            />
            {limit && (
              <Box className={classes.box}>
                <HDSButton
                  iconRight={<IconArrowRight />}
                  onClick={() => {
                    history.replace(newsUrl);
                  }}
                >
                  {readMoreText}
                </HDSButton>
              </Box>
            )}
            {!limit && news.total > news.results.length && (
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
