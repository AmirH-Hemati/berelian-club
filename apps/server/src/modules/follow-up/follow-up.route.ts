import { Router } from "express";

import {
  completeFollowUp,
  deleteFollowUp,
  getAllFollowUps,
  getOverdueFollowUps,
  getTodayFollowUps,
} from "./follow-up.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = Router();

router.use(protectedRoute);
router.use(restrictTo("admin"));

router.get("/", getAllFollowUps);

router.get("/today", getTodayFollowUps);

router.get("/overdue", getOverdueFollowUps);

router.patch("/:id/complete", completeFollowUp);

router.route("/:id").delete(deleteFollowUp);

export default router;
