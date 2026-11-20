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
import { authorize } from "../auth/authorization.middleware.js";


const router = express.Router();

router.use(protectedRoute);

router
  .route("/")
  .get(restrictTo("admin", "reception"), getRequests)
  .post(validateZod(createRequestSchema), setRequestUserId, createRequest);

router.get("/myRequests", getUserRequests);

router.get("/today", restrictTo("admin", "reception"), getTodayRequests);

router.get(
  "/userRequests/:id",
  restrictTo("admin", "reception"),
  getUserRequestsByParams,
);

router.get("/:id", authorize("request", "read"), getRequest);

router.delete("/:id", authorize("request", "delete"), deleteRequest);

router.use(restrictTo("admin", "reception"));

router.patch(
  "/:id/complete",
  authorize("request", "complete"),
  completeRequest,
);

router.patch("/:id/approve", authorize("request", "approve"), approveRequest);

router.patch("/:id/reject", authorize("request", "reject"), rejectRequest);

router.patch("/:id", updateRequest);

export default router;
