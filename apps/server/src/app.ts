import express from "express";
import userRoutes from "./routes/user.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import authRoutes from "./routes/auth.route.js";
import requestRoutes from "./routes/requests.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import notificationsRoutes from "./routes/notification.routes.js";
import fileRoutes from "./routes/file.route.js";
import userFiles from "./routes/userFile.route.js";
import sessionReportRoutes from "./routes/sessionReport.routes.js";
import followUpsRoutes from "./routes/followUp.route.js";
import cors from "cors";
import morgan from "morgan";
import cookiePraser from "cookie-parser";
import { errorController } from "./controllers/errorController.js";
import { AppError } from "./utils/AppError.js";
import path from "path";
const app = express();

// throw new Error("this is error");

app.use(
  cors({
    origin: [
      "http://localhost:4001",
      "http://localhost:4002",
      "https://monorepo-bashgah-moshtarian-2.onrender.com/",
      "https://monorepo-bashgah-moshtarian-1.onrender.com/",
    ],
    credentials: true,
  }),
);

app.use(express.static(path.join(process.cwd(), "/public")));
app.use(express.json());

app.use(cookiePraser());
app.use(morgan("dev"));

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/notifications", notificationsRoutes);
app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/userFiles", userFiles);
app.use("/api/v1/sessionReports", sessionReportRoutes);
app.use("/api/v1/followUps", followUpsRoutes);

app.use((req, res, next) => {
  next(new AppError(`مسیر ${req.originalUrl} پیدا نشد`, 404));
});

app.use(errorController);
export default app;
