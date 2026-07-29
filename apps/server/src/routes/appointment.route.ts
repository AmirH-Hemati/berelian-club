import express from "express";
import { createAppointmentSchema } from "@repo/schema";
import { validateZod } from "../middlewares/validateZod.js";
import { protectedRoute, restrictTo } from "../controllers/auth.controllers.js";
import {
  approveAppointment,
  completeAppointment,
  createAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
  getTodayAppointments,
  getUserAppointments,
  rejectAppointment,
  rescheduleAppointment,
  setAppointmentUserId,
} from "../controllers/appointments.controllers.js";
import { convertDateFields } from "../middlewares/convertDateFields.js";

const router = express.Router();
router.use(protectedRoute);
router
  .route("/")
  .get(restrictTo("admin"), getAppointments)
  .post(
    convertDateFields(["appointmentDate"]),
    validateZod(createAppointmentSchema),
    setAppointmentUserId,
    createAppointment,
  );

router.get("/today", restrictTo("admin"), getTodayAppointments);
router.get("/myAppointments", getUserAppointments);

router.delete("/:id", deleteAppointment);
router.route("/:id").get(getAppointment);

// restrit for only admin
router.use(restrictTo("admin"));

router.patch("/:id/approve", approveAppointment);
router.patch("/:id/reject", rejectAppointment);
router.patch("/:id/complete", completeAppointment);
router.patch("/:id/reschedule", rescheduleAppointment);

export default router;
