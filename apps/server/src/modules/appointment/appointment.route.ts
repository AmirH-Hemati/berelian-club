import express from "express";
import { createAppointmentSchema } from "@repo/schema";

import { validateZod } from "../../middlewares/validateZod.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { convertDateFields } from "../../middlewares/convertDateFields.js";

import {
  approveAppointmentController,
  completeAppointmentController,
  createAppointmentController,
  deleteAppointment,
  getAppointment,
  getAppointments,
  getTodayAppointmentsController,
  getUserAppointmentsByParamsController,
  getUserAppointmentsController,
  rejectAppointmentController,
  rescheduleAppointmentController,
  setAppointmentUserId,
} from "./appointment.controller.js";
import { authorize } from "../auth/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router
  .route("/")
  .get(restrictTo("admin", "consultant", "reception"), getAppointments)
  .post(
    convertDateFields(["appointmentDate"]),
    validateZod(createAppointmentSchema),
    setAppointmentUserId,
    createAppointmentController,
  );

router.get(
  "/today",
  restrictTo("admin", "consultant"),
  getTodayAppointmentsController,
);

router.get("/myAppointments", getUserAppointmentsController);

router.get("/:id", authorize("appointment", "read"), getAppointment);

router.delete("/:id", authorize("appointment", "delete"), deleteAppointment);

router.use(restrictTo("admin", "consultant"));

router.get("/userAppointments/:id/", getUserAppointmentsByParamsController);

router.patch(
  "/:id/approve",
  authorize("appointment", "approve"),
  approveAppointmentController,
);

router.patch(
  "/:id/reject",
  authorize("appointment", "reject"),
  rejectAppointmentController,
);

router.patch(
  "/:id/complete",
  authorize("appointment", "complete"),
  completeAppointmentController,
);

router.patch(
  "/:id/reschedule",
  authorize("appointment", "reschedule"),
  rescheduleAppointmentController,
);

export default router;
