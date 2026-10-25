import http from "http";
import "dotenv/config.js";
import mongoose from "mongoose";

import { createSocketServer } from "./config/socket.js";
import { initializeSocketServices } from "./container/index.js";

import app from "./app.js";

import ReminderEngine from "./services/reminder/ReminderEngine.js";

const server = http.createServer(app);

let DATABASE_URI = "";
if (process.env.APP_ENV === "development") {
  DATABASE_URI = process.env.DATABASE_URI as string;
} else if (process.env.APP_ENV === "production") {
  DATABASE_URI = (process.env.DATABASE_URI_PRODUCTION as string).replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD_PRODUCTION as string,
  );
}

mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("✅✅connected to mongodb"))
  .catch((err) => console.log(err));

const io = createSocketServer(server);
initializeSocketServices(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server listen on port ${port}`);
  ReminderEngine.start();
});
