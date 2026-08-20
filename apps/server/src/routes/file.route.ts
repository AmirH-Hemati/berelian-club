import express from "express";
import { protectedRoute, restrictTo } from "../controllers/auth.controllers.js";
import {
  deleteFile,
  downloadFileById,
  getAllFiles,
  uploadFile,
} from "../controllers/file.controllers.js";
import { upload } from "../config/multer.config.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/downloadById/:id", downloadFileById);

router.use(restrictTo("admin"));
router.route("/").get(getAllFiles).post(upload.single("file"), uploadFile);
router.route("/:id").delete(deleteFile);

export default router;
