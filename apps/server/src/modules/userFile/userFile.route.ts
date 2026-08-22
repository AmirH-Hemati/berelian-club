import express from "express";
import {
  downloadUserFile,
  getUserFiles,
  sendFileToAllInvestors,
  sendFileToUser,
} from "./userFile.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/myFiles", getUserFiles);
router.get("/download/:id", downloadUserFile);

router.use(restrictTo("admin"));

router.route("/").post(sendFileToUser);
router.post("/send-to-all", sendFileToAllInvestors);

export default router;
