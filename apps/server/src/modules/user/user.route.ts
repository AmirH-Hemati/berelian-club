import express from "express";
import {
  deleteUser,
  createUser,
  getUser,
  getUsers,
  updateUser,
  setUserId,
} from "./user.controller.js";
import { validateZod } from "../../middlewares/validateZod.js";

import { createUserSchema, updateUserSchema } from "@repo/schema";
import { convertDateFields } from "../../middlewares/convertDateFields.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
const router = express.Router();

router.use(protectedRoute);
router.get("/me", setUserId, getUser);

router.use(restrictTo("admin"));

router
  .route("/")
  .get(getUsers)
  .post(
    convertDateFields(["birthDate", "contractStartDate", "contractEndDate"]),
    validateZod(createUserSchema),
    createUser,
  );

router
  .route("/:id")
  .get(getUser)
  .patch(
    convertDateFields(["birthDate", "contractStartDate", "contractEndDate"]),
    validateZod(updateUserSchema),
    updateUser,
  )
  .delete(deleteUser);

export default router;
