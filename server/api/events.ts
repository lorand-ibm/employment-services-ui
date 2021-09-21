import { Router } from "express";
import { getClient } from "../elasticsearchClient";

const client = getClient();
const eventsRouter = Router();

eventsRouter.get("/all/:index", async (req, res) => {
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
        const { title, path, image, alt, startTime, endTime, location } = result._source;
        return { title, path, image, alt, startTime, endTime, location };
      }),
    });
  } catch (err) {
    console.log('err', err)
    res.status(500).send();
  }
});

export default eventsRouter;
