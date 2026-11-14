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
  getUserRequestsByParams,
} from "./request.controller.js";
import { createRequestSchema } from "@repo/schema";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
import { validateZod } from "../../middlewares/validateZod.js";

const router = express.Router();
router.use(protectedRoute);

router
  .route("/")
  .get(restrictTo("admin", "reception"), getRequests)
  .post(validateZod(createRequestSchema), setRequestUserId, createRequest);

router.get("/myRequests", getUserRequests);
router.get("/:id", getRequest);
router.delete("/:id", deleteRequest);

// restrit for only admin
router.use(restrictTo("admin", "reception"));

router.get("/today", getTodayRequests);
router.get("/userRequests/:id/", getUserRequestsByParams);
router.patch("/:id/complete", completeRequest);
router.patch("/:id/approve", approveRequest);
router.patch("/:id/reject", rejectRequest);
router.route("/:id").patch(updateRequest);

export default router;
