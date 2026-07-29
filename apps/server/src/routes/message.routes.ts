import express from "express";
import {
  protectedRoute,
  restrictTo,
} from "../controllers/auth.controllers.js";
import {
  getMessages,
  sendFileMessage,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/:conversationId", getMessages);

router.post("/:conversationId", sendMessage);
router.post("/:conversationId/file", restrictTo("admin"), sendFileMessage);

export default router;
