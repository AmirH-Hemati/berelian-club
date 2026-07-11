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
const router = express.Router();

router.post("/sendOtp", validateZod(phoneSchema), handleSendOtp);
router.post("/verifyOtp", validateZod(verifyOtpSchema), handleVerifyOtp);

router.use(protectedRoute);
router.patch("/updateMe", uploadUserImage, resizeUserImage, updateMe);
router.get("/me", setUserId, getUser);
router.post("/logout", logout);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
