import express from "express";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  createSessionReport,
  deleteSessionReport,
  getSessionReport,
} from "../controllers/sessionReport.controllers.js";
import { validateZod } from "../middlewares/validateZod.js";
import { sessionReportSchema } from "@repo/schema";
import { convertDateFields } from "../middlewares/convertDateFields.js";

const router = express.Router();

router.use(protectedRoute);

/// restrict for only admin
router.post(
  "/",
  convertDateFields(["followUpDate"]),
  validateZod(sessionReportSchema),
  createSessionReport,
);
router.get("/:appointmentId", getSessionReport);

router.route("/:id").delete(deleteSessionReport);

export default router;
