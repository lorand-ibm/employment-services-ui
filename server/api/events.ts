import { Router } from "express";
import { getClient } from "../elasticsearchClient";

const client = getClient();
const eventsRouter = Router();

eventsRouter.get("/:index", async (req, res) => {
  const index = Number(req.params.index);

  if (isNaN(index)) {
    res.send(400).send();
    return;
  }

  const body = {
    size: 9,
    from: (9*index),
    query: {
      range: {
        endTime: {
          gte: "now/d",
        }
      },
    },
  };

  try {
    const searchRes = await client.search({
      index: "events",
      body: body,
      sort: "endTime:asc",
    });

    const {
      body: {
        hits: { total, hits: hitsResults },
      },
    } = searchRes;

    res.send({
      total: total.value,
      results: hitsResults.map((result: any) => {
        const { title, path, image, alt, startTime, endTime, location, locationExtraInfo, tags } = result._source;
        return { title, path, image, alt, startTime, endTime, location, locationExtraInfo, tags };
      }),
    });
  } catch (err) {
    console.log('err', err)
    res.status(500).send();
  }
});

export default eventsRouter;
