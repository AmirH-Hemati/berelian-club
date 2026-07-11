import express from "express";
import {
  downloadUserFile,
  getUserFiles,
  sendFileToUser,
} from "../controllers/userFile.controllers.js";
import { protectedRoute } from "../controllers/auth.controllers.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/myFiles", getUserFiles);
router.get("/download/:id", downloadUserFile);
// restrictTo("admin")
router.route("/").post(sendFileToUser);

export default router;
