import dotEnv from "dotenv";
import path from "path";
import cron from "node-cron";

import { syncElasticSearchEvents } from "./syncEvents";
import { syncElasticSearchNews } from "./syncNews";
import { syncElasticSearchBlogs } from "./syncBlogs";
import { syncLinkedEventsToDrupal } from "./linkedEventsSync";

dotEnv.config({ path: path.resolve(__dirname + "/../.env") });

const syncEvents = async () => {
  console.log("------");
  console.log("start", new Date());
  console.log("SYNC NEWS");
  await syncElasticSearchNews();
  console.log("SYNC BLOGS");
  await syncElasticSearchBlogs();
  console.log("SYNC LINKED EVENTS");
  const modified = await syncLinkedEventsToDrupal();
  if (modified) {
    console.log("SYNC ELASTICSEARCH");
    await syncElasticSearchEvents();
  } else {
    console.log("SYNC ELASTICSEARCH");
    console.log("nothing to do");
  }
};

syncEvents();

// Sync every half an hour
cron.schedule("*/30 * * * *", async () => {
  syncEvents();
});
