import { Router } from "express";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  completeFollowUp,
  deleteFollowUp,
  getAllFollowUps,
  getOverdueFollowUps,
  getTodayFollowUps,
} from "../controllers/followUps.controllers.js";

const router = Router();

router.use(protectedRoute);

router.get("/", getAllFollowUps);

router.get("/today", getTodayFollowUps);

router.get("/overdue", getOverdueFollowUps);

router.patch("/:id/complete", completeFollowUp);

router.route("/:id").delete(deleteFollowUp);

export default router;
