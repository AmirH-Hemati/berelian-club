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
import { protectedRoute } from "../controllers/auth.controllers.js";
const router = express.Router();

// router.use(protectedRoute);
// restrictTo("admin")

router.route("/").get(getUsers).post(validateZod(createUserSchema), createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(validateZod(updateUserSchema), updateUser)
  .delete(deleteUser);

export default router;
