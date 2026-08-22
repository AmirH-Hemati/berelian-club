import express from "express";
import { getStats, getStatsAdminDashboard } from "./dashboard.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/stats", getStats);

//restrict for only admin
router.use(restrictTo("admin"));
router.get("/adminDashboardStats", getStatsAdminDashboard);

export default router;
