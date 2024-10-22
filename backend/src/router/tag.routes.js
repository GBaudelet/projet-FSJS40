import Router from "express";
import authMiddleware from "../middlewares/withUserAuth.js";

import { getAll, create, update, remove } from "../controller/tag.js";

const router = Router();

router.get("/all", getAll);
router.post("/create", authMiddleware([1]), create);
router.patch("/update/:id", authMiddleware([1]), update);
router.delete("/delete/:id", authMiddleware([1]), remove);

export default router;
