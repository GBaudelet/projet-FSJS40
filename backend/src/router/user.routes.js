import Router from "express";

import { getAll, update, remove } from "../controller/user.js";
// import withUserAuth from "../middlewares/withUserAuth.js";
// import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();

router.get("/all", getAll);

router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
