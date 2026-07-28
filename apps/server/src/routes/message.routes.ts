import express from "express";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  getMessages,
  sendFileMessage,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.post("/:conversationId", sendMessage);
router.post("/:conversationId/file", sendFileMessage);

router.get("/:conversationId", getMessages);

export default router;
