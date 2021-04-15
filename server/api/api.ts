import { Router } from 'express';

import eventsRouter from './events';
import newsRouter from './news';
import blogsRouter from './blogs';

const apiRouter = Router();

apiRouter.use("/events", eventsRouter)
apiRouter.use("/news", newsRouter)
apiRouter.use("/blogs", blogsRouter)

// TODO
apiRouter.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

export default apiRouter;