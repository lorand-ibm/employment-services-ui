import { Router } from "express";
import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: process.env.ELASTICSEARCH_URL });
const blogsRouter = Router();

blogsRouter.get("/all/:index", async (req, res) => {
  const index = Number(req.params.index);
  if (isNaN(index)) {
    res.send(400).send();
    return;
  }
  const body = {
    size: 9,
    from: (9*index),
    query: {
      match_all: {},
    },
  };

  try {
    const searchRes = await client.search({
      index: "blogs",
      body: body,
      sort: "date:desc",
    });

    const {
      body: {
        hits: { total, hits: hitsResults },
      },
    } = searchRes;

    res.send({
      total: total.value,
      results: hitsResults.map((result: any) => {
        const { path, date, title, imageUrl, summary } = result._source;
        return { path, date, title, imageUrl, summary };
      }),
    });
  } catch (err) {
    console.log('err', err.body.error)
    res.status(500).send();
  }
});

export default blogsRouter;
