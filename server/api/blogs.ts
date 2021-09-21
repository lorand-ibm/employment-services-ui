import { Router } from "express";
import { getClient } from "../elasticsearchClient";

const client = getClient();
const blogsRouter = Router();

blogsRouter.get("/all/:lang/:index", async (req, res) => {
  const index = Number(req.params.index);
  const lang = String(req.params.lang);

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
      index: `blogs-${lang}`,
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
        const { path, date, title, imageUrl, alt, summary } = result._source;
        return { path, date, title, imageUrl, alt, summary };
      }),
    });
  } catch (err) {
    console.log('err', err)
    res.status(500).send();
  }
});

export default blogsRouter;
