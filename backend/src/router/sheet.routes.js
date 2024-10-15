import Router from "express";
import multer from "multer";
import {
  getAll,
  create,
  getAllUser,
  searchByTag,
  remove,
  searchByTitleAndUserId,
} from "../controller/sheet.js";

// Configurer multer pour stocker les fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.get("/all", getAll);
router.get("/allUser", getAllUser);
router.get("/search", searchByTag);
router.post("/create", upload.single("file"), create);
router.get("/titleUser", searchByTitleAndUserId);
// router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
