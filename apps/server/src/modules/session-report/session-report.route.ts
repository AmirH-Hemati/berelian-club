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
import { authorize } from "../auth/authorization.middleware.js";

const router = express.Router();

/// restrict for only admin & consultant
router.use(protectedRoute);
router.use(restrictTo("admin", "consultant"));
router.post(
  "/",
  authorize("appointment", "createSessionReport", "appointment", "body"),
  convertDateFields(["followUpDate"]),
  validateZod(sessionReportSchema),
  createSessionReport,
);
router.get("/:appointmentId", getSessionReport);

router
  .route("/:id")
  .delete(authorize("sessionReport", "delete"), deleteSessionReport);

export default router;
