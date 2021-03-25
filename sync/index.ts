import dotEnv from "dotenv";
import path from "path";
import cron from "node-cron";

import { syncElasticSearch } from "./syncEvents";
import { syncLinkedEvents } from "./linkedEventsSync";

dotEnv.config({ path: path.resolve(__dirname + "/../.env") });

const syncEvents = async () => {
  console.log("------");
  console.log("start", new Date());
  console.log("SYNC LINKED EVENTS");
  const modified = await syncLinkedEvents();
  if (modified) {
    console.log("SYNC ELASTICSEARCH");
    await syncElasticSearch();
  } else {
    console.log("SYNC ELASTICSEARCH");
    console.log("nothing to do");
  }
};

syncEvents();

// Sync every hour
cron.schedule("*/30 * * * *", async () => {
  syncEvents();
});
