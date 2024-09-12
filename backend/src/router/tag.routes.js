import Router from "express";

import { getAll, create, update, remove } from "../controller/tag.js";

const router = Router();

router.get("/all", getAll);
router.post("/create", create);
router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
