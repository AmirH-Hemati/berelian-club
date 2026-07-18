import express from "express";
import { createAppointmentSchema } from "@repo/schema";
import { validateZod } from "../middlewares/validateZod.js";
import { protectedRoute } from "../controllers/auth.controllers.js";
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
  setAppointmentUserId,
} from "../controllers/appointments.controllers.js";
import { convertDateFields } from "../middlewares/convertDateFields.js";

const router = express.Router();

router
  .route("/")
  .get(getAppointments)
  .post(
    convertDateFields(["appointmentDate"]),
    validateZod(createAppointmentSchema),
    protectedRoute,
    setAppointmentUserId,
    createAppointment,
  );

router.get("/myAppointments", protectedRoute, getUserAppointments);

router.delete("/:id", deleteAppointment);
// restrit for only admin

router.get("/today", getTodayAppointments);
router.patch("/:id/approve", approveAppointment);
router.patch("/:id/reject", rejectAppointment);
router.patch("/:id/complete", completeAppointment);
router.route("/:id").get(getAppointment);

// .patch(updateRequest).delete(deleteRequest);

export default router;
