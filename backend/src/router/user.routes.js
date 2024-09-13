import Router from "express";

import { getAll, create, update, remove, login } from "../controller/user.js";

const router = Router();

router.get("/all", getAll);
router.post("/create", create);
router.post("/login", login);
router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
