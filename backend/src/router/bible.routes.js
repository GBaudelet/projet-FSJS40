import Router from "express";

import { getAll } from "../controller/bible.js";

const router = Router();

router.get("/all", getAll);

export default router;
