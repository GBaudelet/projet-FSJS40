import Router from "express";

import { getAll, update, remove, getProfil } from "../Controller/user.js";
import authMiddleware from "../Middlewares/WithUserAuth.js";
import checkUserPermission from "../Middlewares/CheckId.js";

const router = Router();

router.get("/all", getAll);
router.get("/all/:id", getProfil);

router.patch(
  "/update/:id",
  authMiddleware([1, 2]),
  checkUserPermission("id"),
  update
);
router.delete(
  "/delete/:id",
  authMiddleware([1, 2]),
  checkUserPermission("id"),
  remove
);

export default router;
