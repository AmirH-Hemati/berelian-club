import express from "express";
import { protectedRoute, restrictTo } from "../controllers/auth.controllers.js";
import {
  getStats,
  getStatsAdminDashboard,
} from "../controllers/dashboardController.controllers.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/stats", getStats);

//restrict for only admin
router.use(restrictTo("admin"));
router.get("/adminDashboardStats", getStatsAdminDashboard);

export default router;
