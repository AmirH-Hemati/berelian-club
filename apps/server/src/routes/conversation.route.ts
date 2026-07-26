import express from "express";

import { protectedRoute } from "../controllers/auth.controllers.js";
import { getConversationByRequest } from "../controllers/conversation.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/request/:requestId", getConversationByRequest);

export default router;