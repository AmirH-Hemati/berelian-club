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

const router = express.Router();
router.use(protectedRoute);

router
  .route("/")
  .get(restrictTo("admin", "consultant"), getAppointments)
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

router.delete("/:id", deleteAppointment);
router.route("/:id").get(getAppointment);

// restrit for only admin
router.use(restrictTo("admin", "consultant"));

router.get("/userAppointments/:id/", getUserAppointmentsByParamsController);
router.patch("/:id/approve", approveAppointmentController);
router.patch("/:id/reject", rejectAppointmentController);
router.patch("/:id/complete", completeAppointmentController);
router.patch("/:id/reschedule", rescheduleAppointmentController);

export default router;
