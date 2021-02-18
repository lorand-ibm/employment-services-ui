import {Router} from 'express';

const apiRouter = Router();

// TODO
apiRouter.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

export default apiRouter;