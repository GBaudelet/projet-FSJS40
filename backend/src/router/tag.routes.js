import Router from "express";
import authMiddleware from "../middlewares/withUserAuth.js";

import { getAll, create, update, remove } from "../controller/tag.js";
import checkUserPermission from "../middlewares/checkId.js";

const router = Router();

router.get("/all", getAll);
router.post("/create", authMiddleware([1]), create);
router.patch(
  "/update/:id",
  authMiddleware([1]),
  checkUserPermission("id"),
  update
);
router.delete(
  "/delete/:id",
  authMiddleware([1]),
  checkUserPermission("id"),
  remove
);

export default router;
