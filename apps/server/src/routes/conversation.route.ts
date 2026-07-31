import express from "express";

import { protectedRoute } from "../controllers/auth.controllers.js";
import { closeConversation, getConversationByRequest } from "../controllers/conversation.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/request/:requestId", getConversationByRequest);
router.patch("/:conversationId/close", closeConversation);

export default router;
