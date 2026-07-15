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
  setUserIdToParams,
  getTodayRequests,
} from "../controllers/requests.controllers.js";
import { protectedRoute } from "../controllers/auth.controllers.js";
import { validateZod } from "../middlewares/validateZod.js";
import { createRequestSchema } from "@repo/schema";

const router = express.Router();

router
  .route("/")
  .get(getRequests)
  .post(
    validateZod(createRequestSchema),
    protectedRoute,
    setRequestUserId,
    createRequest,
  );
router.use(protectedRoute);
router.get("/myRequests", getUserRequests);

// restrit for only admin
// restrictTo("admin"),
router.get("/today", getTodayRequests);
router.get("/userRequests/:id/", getUserRequests);
router.patch("/:id/approve", approveRequest);
router.patch("/:id/reject", rejectRequest);
router.route("/:id").get(getRequest).patch(updateRequest).delete(deleteRequest);

export default router;
