import Router from "express";

import { getAll, update, remove, getProfil } from "../controller/user.js";
import authMiddleware from "../middlewares/withUserAuth.js";

const router = Router();

router.get("/all", getAll);
router.get("/all/:id", getProfil);

router.patch("/update/:id", authMiddleware([1, 2]), update);
router.delete("/delete/:id", authMiddleware([1, 2]), remove);

export default router;
