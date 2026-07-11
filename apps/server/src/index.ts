import "dotenv/config.js";
import app from "./app.js";
import mongoose from "mongoose";
import ReminderEngine from "./services/reminder/ReminderEngine.js";
let DATABSE_URI = (process.env.DATABASE_URI_PRODUCTION as string).replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD_PRODUCTION as string,
);

// if (process.env.NODE_ENV === "development") {
//   DATABSE_URI = process.env.DATABASE_URI as string;
// } else if (process.env.NODE_ENV === "production") {
//   DATABSE_URI = (process.env.DATABASE_URI_PRODUCTION as string).replace(
//     "<db_password>",
//     process.env.DATABASE_PASSWORD_PRODUCTION as string,
//   );
// }

mongoose
  .connect(DATABSE_URI)
  .then(() => console.log("✅✅connected to mongodb"))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
  ReminderEngine.start();
});
