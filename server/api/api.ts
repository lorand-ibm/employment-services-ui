import { Router } from 'express';

import eventsRouter from './events';
import newsRouter from './news';
import blogsRouter from './blogs';
import tagsRouter from './tags';

const apiRouter = Router();

apiRouter.use("/events", eventsRouter)
apiRouter.use("/news", newsRouter)
apiRouter.use("/blogs", blogsRouter)
apiRouter.use("/tags", tagsRouter)

// TODO
apiRouter.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

export default apiRouter;