import express from "express";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  deleteNotification,
  getMyNotifications,
  markAllAsRead,
  markAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/", getMyNotifications);
router.patch("/:id/read", markAsRead);
router.patch("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
