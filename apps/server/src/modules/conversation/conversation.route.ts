import express from "express";

import {
  closeConversation,
  getConversationByRequest,
} from "./conversation.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/request/:requestId", getConversationByRequest);
router.patch("/:conversationId/close", closeConversation);

export default router;
