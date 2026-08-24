import express from "express";

import { phoneSchema, verifyOtpSchema } from "@repo/schema";
import {
  handleSendOtp,
  handleVerifyOtp,
  logout,
  resizeUserImage,
  updateMe,
  uploadUserImage,
} from "./auth.controller.js";
import { validateZod } from "../../middlewares/validateZod.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import {
  sendOtpLimiter,
  verifyOtpLimiter,
} from "../../middlewares/rateLimiter.js";

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
router.post("/logout", logout);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
