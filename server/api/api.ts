import { Router } from 'express';

import eventsRouter from './events';
import newsRouter from './news';
import blogsRouter from './blogs';
import searchRouter from './search';

const apiRouter = Router();

apiRouter.use("/events", eventsRouter)
apiRouter.use("/news", newsRouter)
apiRouter.use("/blogs", blogsRouter)
apiRouter.use("/search", searchRouter)

export default apiRouter;
