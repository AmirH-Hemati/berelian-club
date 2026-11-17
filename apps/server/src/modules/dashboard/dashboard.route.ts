import express from "express";
import {
  getConsultantDashboardController,
  getReceptionDashboardController,
  getStatsAdminDashboard,
  getStatsInvestorDashboard,
} from "./dashboard.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/investor", restrictTo("investor"), getStatsInvestorDashboard);

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
