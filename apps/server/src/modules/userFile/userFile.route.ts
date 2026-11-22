import express from "express";
import {
  deleteUserFile,
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
router.get("/downloadById/:id", downloadUserFile);
router.delete("/:id", deleteUserFile);

router.use(restrictTo("admin" ,  "consultant"));

router.route("/").post(sendFileToUser);
router.post("/send-to-all", sendFileToAllInvestors);

export default router;
