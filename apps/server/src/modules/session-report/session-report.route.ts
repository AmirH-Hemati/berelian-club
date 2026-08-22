import express from "express";
import {
  createSessionReport,
  deleteSessionReport,
  getSessionReport,
} from "./session-report.controller.js";
import { sessionReportSchema } from "@repo/schema";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
import { convertDateFields } from "../../middlewares/convertDateFields.js";
import { validateZod } from "../../middlewares/validateZod.js";

const router = express.Router();

/// restrict for only admin
router.use(protectedRoute);
router.use(restrictTo("admin"));
router.post(
  "/",
  convertDateFields(["followUpDate"]),
  validateZod(sessionReportSchema),
  createSessionReport,
);
router.get("/:appointmentId", getSessionReport);

router.route("/:id").delete(deleteSessionReport);

export default router;
