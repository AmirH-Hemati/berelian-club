import express from "express";
import { protectedRoute } from "../../middlewares/auth.middleware.js";

import {
  createPermission,
  deletePermissionn,
  getAllPermission,
  getDefaultPermissions,
  getOnePermission,
  updatePermission,
} from "./permission.controller.js";

import { requiredPermissions } from "../../middlewares/require-permission.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router
  .route("/")
  .get(requiredPermissions("permissions.manage"), getAllPermission)
  .post(
    requiredPermissions("permissions.manage"),
    //   validate(createPermissionSchema),

    createPermission,
  );

router.get("/defaults/:role", restrictTo("admin"), getDefaultPermissions);

router
  .route("/:id")
  .get(requiredPermissions("permissions.manage"), getOnePermission)
  .patch(
    requiredPermissions("permissions.manage"),
    //   validate(updatePermissionSchema),
    updatePermission,
  )
  .delete(requiredPermissions("permissions.manage"), deletePermissionn);

export default router;
