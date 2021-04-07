import { Router } from 'express';

import eventsRouter from './events';
import newsRouter from './news';

const apiRouter = Router();

apiRouter.use("/events", eventsRouter)
apiRouter.use("/news", newsRouter)

// TODO
apiRouter.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

export default apiRouter;