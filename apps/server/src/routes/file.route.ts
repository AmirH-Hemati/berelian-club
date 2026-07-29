import express from "express";
import { protectedRoute, restrictTo } from "../controllers/auth.controllers.js";
import {
  downloadFileById,
  getAllFiles,
  uploadFile,
} from "../controllers/file.controllers.js";
import { upload } from "../config/multer.config.js";

const router = express.Router();

router.use(protectedRoute);
// router.get("/my-files", getUserFiles);
// router.get("/download/:id", downloadFile);

// restrictTo("admin")
router.use(restrictTo("admin"));
router.route("/").get(getAllFiles).post(upload.single("file"), uploadFile);
router.get("/downloadById/:id", downloadFileById);
// router.route("/:id").delete(deleteFile);
// router.post("/send-to-user", sendFileToUser);

export default router;
