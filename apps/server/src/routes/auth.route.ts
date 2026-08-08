import express from "express";

import { phoneSchema, verifyOtpSchema } from "@repo/schema";
import {
  getUser,
  handleSendOtp,
  handleVerifyOtp,
  logout,
  protectedRoute,
  resizeUserImage,
  setUserId,
  updateMe,
  uploadUserImage,
} from "../controllers/auth.controllers.js";
import { validateZod } from "../middlewares/validateZod.js";
import {
  sendOtpLimiter,
  verifyOtpLimiter,
} from "../middlewares/rateLimiter.js";
const router = express.Router();

router.post(
  "/sendOtp",
  sendOtpLimiter,
  validateZod(phoneSchema),
  handleSendOtp,
);
router.post(
  "/verifyOtp",
  verifyOtpLimiter,
  validateZod(verifyOtpSchema),
  handleVerifyOtp,
);

router.use(protectedRoute);
router.patch("/updateMe", uploadUserImage, resizeUserImage, updateMe);
router.get("/me", setUserId, getUser);
router.post("/logout", logout);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
