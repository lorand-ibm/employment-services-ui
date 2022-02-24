import { Router } from "express";
import { getClient } from "../elasticsearchClient";

const client = getClient();
const searchRouter = Router();

searchRouter.get("/:lang/:query", async (req, res) => {
  // const index = Number(req.params.index);
  const lang = String(req.params.lang);
  const query = String(req.params.query);
  console.log('QUERY', query);

  if (!query) {
    res.send(400).send();
    return;
  }

  const body = {
    size: 9,
    // from: (9*index),
    query: {
      // match_all: {},
      multi_match: {
        query: `${query}*`,
        fields: ['title', 'summary'],
        // summary: query
      }
    },
    // query: {
    //   wildcard: {
    //     tag_name: {
    //       value: `*${value}*`,
    //       boost: 1.0,
    //       rewrite: 'constant_score',
    //     },
    //   },
    // },
  };

  try {
    const searchRes = await client.search({
      index: [`blogs-${lang}`, `news-${lang}`, 'events'],
      body: body,
      // sort: "date:desc",
    });

    console.log('searchRes', searchRes)


    const {
      body: {
        hits: { total, hits: hitsResults },
      },
    } = searchRes;

    console.log('HTIS', hitsResults)

    // res.send({
    //   query: req.params.query,
    //   results: []
    // });

    res.send({
      total: total.value,
      results: hitsResults.map((result: any) => {
        const { path, date, title, imageUrl, alt, summary } = result._source;
        return { path, date, title, imageUrl, alt, summary };
      }),
    });
  } catch (err) {
    console.log('err', err)
    res.status(500).send();
  }
});

export default searchRouter;
