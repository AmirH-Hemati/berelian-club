import express from "express";
import userRoutes from "./modules/user/user.route.js";
import cors from "cors";
import morgan from "morgan";
import cookiePraser from "cookie-parser";
import { errorController } from "./controllers/errorController.js";
import { AppError } from "./utils/AppError.js";
import path from "path";
import { generalLimiter } from "./middlewares/rateLimiter.js";

import dashboardRoutes from "./modules/dashboard/dashboard.route.js";
import authRoutes from "./modules/auth/auth.route.js";
import requestRoutes from "./modules/request/request.route.js";
import appointmentRoutes from "./modules/appointment/appointment.route.js";
import notificationsRoutes from "./modules/notification/notification.route.js";
import fileRoutes from "./modules/file/file.route.js";
import userFilesRoutes from "./modules/userFile/userFile.route.js";
import sessionReportRoutes from "./modules/session-report/session-report.route.js";
import followUpsRoutes from "./modules/follow-up/follow-up.route.js";
import conversationsRoutes from "./modules/conversation/conversation.route.js";
import messagesRoutes from "./modules/message/message.route.js";

const app = express();
// throw new Error("this is error");

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       callback(null, true);
//     },
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: [
      "http://localhost:4001",
      "http://localhost:4002",
      "https://monorepo-bashgah-moshtarian-1.onrender.com",
      "https://monorepo-bashgah-moshtarian-2.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.static(path.join(process.cwd(), "/public")));
app.use(express.json());

app.use(cookiePraser());
// app.use(morgan("dev"));

app.use("/api", generalLimiter);

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/notifications", notificationsRoutes);
app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/userFiles", userFilesRoutes);
app.use("/api/v1/sessionReports", sessionReportRoutes);
app.use("/api/v1/followUps", followUpsRoutes);
app.use("/api/v1/conversations", conversationsRoutes);
app.use("/api/v1/messages", messagesRoutes);

app.use((req, res, next) => {
  next(new AppError(`مسیر ${req.originalUrl} پیدا نشد`, 404));
});

app.use(errorController);
export default app;
