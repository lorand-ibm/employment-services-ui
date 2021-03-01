import {Router} from 'express';

import eventsRouter from './events';

const apiRouter = Router();

apiRouter.use("/events", eventsRouter)

// TODO
apiRouter.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

export default apiRouter;