import express from "express";
import {
  getMessages,
  sendFileMessage,
  sendMessage,
} from "./message.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/:conversationId", getMessages);

router.post("/:conversationId", sendMessage);
router.post("/:conversationId/file", restrictTo("admin"), sendFileMessage);

export default router;
