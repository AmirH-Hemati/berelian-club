import { Router } from "express";

import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/authorization.middleware.js";
import {
  deleteContract,
  createContract,
  getAllContracts,
  getContract,
  updateContract,
} from "./contract.controller.js";

const router = Router();

router.use(protectedRoute);
router.use(restrictTo("admin"));

router.route("/").get(getAllContracts).post(createContract);

router
  .route("/:id")
  .get(getContract)
  .patch(updateContract)
  .delete(deleteContract);

export default router;
