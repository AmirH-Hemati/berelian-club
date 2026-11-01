import express from "express";
import {
  getConsultantDashboardController,
  getReceptionDashboardController,
  getStatsAdminDashboard,
} from "./dashboard.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);
// router.get("/stats", getStats);

router.get("/admin", restrictTo("admin"), getStatsAdminDashboard);

router.get(
  "/reception",
  restrictTo("reception"),
  getReceptionDashboardController,
);
router.get(
  "/consultant",
  restrictTo("consultant"),
  getConsultantDashboardController,
);
export default router;
