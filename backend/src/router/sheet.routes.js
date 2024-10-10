import Router from "express";

import {
  getAll,
  create,
  getAllUser,
  searchByTag,
} from "../controller/sheet.js";

const router = Router();

router.get("/all", getAll);
router.get("/allUser", getAllUser);
router.get("/search", searchByTag);
router.post("/create", create);
// router.patch("/update/:id", update);
// router.delete("/delete/:id", remove);

export default router;
