import express from "express";
import {
  deleteUser,
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";
import { validateZod } from "../middlewares/validateZod.js";

import { createUserSchema, updateUserSchema } from "@repo/schema";
import { convertDateFields } from "../middlewares/convertDateFields.js";
import { protectedRoute, restrictTo } from "../controllers/auth.controllers.js";
const router = express.Router();

router.use(protectedRoute);
router.use(restrictTo("admin"));

router
  .route("/")
  .get(getUsers)
  .post(
    convertDateFields(["birthDate", "contractStartDate", "contractEndDate"]),
    validateZod(createUserSchema),
    createUser,
  );
router.get("/me", setUserId, getUser);

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
