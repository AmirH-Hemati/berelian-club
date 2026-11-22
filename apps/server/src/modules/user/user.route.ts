import express from "express";
import {
  deleteUser,
  createUser,
  getUser,
  getUsers,
  updateUser,
  setUserId,
  getUsersByRole,
} from "./user.controller.js";
import { validateZod } from "../../middlewares/validateZod.js";

import { createUserSchema, updateUserSchema } from "@repo/schema";
import { convertDateFields } from "../../middlewares/convertDateFields.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
const router = express.Router();

router.use(protectedRoute);
router.get("/me", setUserId, getUser);

router
  .route("/")
  .get(restrictTo("admin" , "consultant" , "reception"), getUsers)
  .post(
    restrictTo("admin"),
    convertDateFields(["birthDate", "contractStartDate", "contractEndDate"]),
    validateZod(createUserSchema),
    createUser,
  );
router.get("/by-role/:role", restrictTo("admin"), getUsersByRole);
router
  .route("/:id")
  .get(restrictTo("admin", "consultant" , "reception"), getUser)
  .patch(
    restrictTo("admin"),
    convertDateFields(["birthDate", "contractStartDate", "contractEndDate"]),
    validateZod(updateUserSchema),
    updateUser,
  )
  .delete(restrictTo("admin"), deleteUser);

export default router;
