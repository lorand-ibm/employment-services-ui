import { Router } from "express";

import { Client } from "@elastic/elasticsearch";
const client = new Client({ node: process.env.ELASTICSEARCH_URL });

const eventsRouter = Router();

eventsRouter.get("/all/:index", async (req, res) => {
  const index = Number(req.params.index);
  if (isNaN(index)) {
    res.send(400).send();
    return;
  }
  const body = {
    size: 9,
    from: (9*index-1),
    query: {
      match_all: {},
    },
  };

  try {
    const searchRes = await client.search({
      index: "events",
      body: body,
      sort: "startTime:asc",
    });

    const {
      body: {
        hits: { total, hits: hitsResults },
      },
    } = searchRes;

    res.send({
      total: total.value,
      results: hitsResults.map((result: any) => {
        const { title, path, image, startTime, endTime } = result._source;
        return { title, path, image, startTime, endTime };
      }),
    });
  } catch (err) {
    console.log('err', err.body.error)
    res.status(500).send();
  }
});

export default eventsRouter;
