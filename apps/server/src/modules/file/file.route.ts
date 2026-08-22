import express from "express";
import {
  deleteFile,
  downloadFileById,
  getAllFiles,
  uploadFile,
} from "./file.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
import { upload } from "../../config/multer.config.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/downloadById/:id", downloadFileById);

router.use(restrictTo("admin"));
router.route("/").get(getAllFiles).post(upload.single("file"), uploadFile);
router.route("/:id").delete(deleteFile);

export default router;
