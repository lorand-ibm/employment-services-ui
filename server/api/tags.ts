import { Router } from "express";
import { getClient } from "../elasticsearchClient";

const client = getClient();
const tagsRouter = Router();

tagsRouter.get("/", async (req, res) => {
  const body = {
    query: {
      match_all: {},
    },
  };

  try {
    const searchRes = await client.search({
      index: "tags",
      body: body,
    });

    const {
      body: {
        hits: { hits: hitsResults },
      },
    } = searchRes;
    
    res.send({
      results: hitsResults.map((result: any) => {
        const { tags } = result._source;
        return { tags };
      }),
    });
  } catch (err) {
    console.log('err', err)
    res.status(500).send();
  }
});

export default tagsRouter;
