import express from "express";
import {
  countUnreadNotifications,
  deleteNotification,
  getMyNotifications,
  markAllAsRead,
  markAsRead,
} from "./notification.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/", getMyNotifications);
router.get("/unread-count",  countUnreadNotifications);
router.patch("/:id/read", markAsRead);
router.patch("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
