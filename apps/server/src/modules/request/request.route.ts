import express from "express";
import {
  deleteRequest,
  createRequest,
  getRequest,
  getRequests,
  updateRequest,
  setRequestUserId,
  approveRequest,
  rejectRequest,
  getUserRequests,
  getTodayRequests,
  completeRequest,
} from "../controllers/requests.controllers.js";
import { protectedRoute, restrictTo } from "../controllers/auth.controllers.js";
import { validateZod } from "../middlewares/validateZod.js";
import { createRequestSchema } from "@repo/schema";

const router = express.Router();
router.use(protectedRoute);

router
  .route("/")
  .get(restrictTo("admin"), getRequests)
  .post(validateZod(createRequestSchema), setRequestUserId, createRequest);

router.get("/myRequests", getUserRequests);
router.get("/:id", getRequest);
router.delete("/:id", deleteRequest);

// restrit for only admin
router.use(restrictTo("admin"));

router.get("/today", getTodayRequests);
router.get("/userRequests/:id/", getUserRequests);
router.patch("/:id/complete", completeRequest);
router.patch("/:id/approve", approveRequest);
router.patch("/:id/reject", rejectRequest);
router.route("/:id").patch(updateRequest);

export default router;
