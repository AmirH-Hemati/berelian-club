import "dotenv/config.js";
import mongoose from "mongoose";
import ReminderEngine from "./services/reminder/ReminderEngine.js";
import { server } from "./utils/setupSocket.js";

let DATABSE_URI = "";
if (process.env.APP_ENV === "development") {
  DATABSE_URI = process.env.DATABASE_URI as string;
} else if (process.env.APP_ENV === "production") {
  DATABSE_URI = (process.env.DATABASE_URI_PRODUCTION as string).replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD_PRODUCTION as string,
  );
}

mongoose
  .connect(DATABSE_URI)
  .then(() => console.log("✅✅connected to mongodb"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server listen on port ${port}`);
  ReminderEngine.start();
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:4001",
      "http://localhost:4002",
      "https://berelianclub.onrender.com",
      "https://berelianclub-admin.onrender.com",
    ],
    credentials: true,
  },
});

export { io };
