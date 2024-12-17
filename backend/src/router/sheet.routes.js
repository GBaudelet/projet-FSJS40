import Router from "express";
import multer from "multer";
import {
  getAll,
  create,
  getAllUser,
  searchByTag,
  remove,
  searchByTitleAndUserId,
  update,
  getAllAdmin,
  updateStatus,
  getDropZoneDetails,
} from "../controller/sheet.js";
import checkUserPermission from "../middlewares/checkId.js";

// Configurer multer pour stocker les fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.get("/all", getAll);
router.get("/allUser", getAllUser);
router.get("/allAdmin", getAllAdmin);
router.get("/search", searchByTag);
router.get("/edit/:id", getDropZoneDetails);
router.get("/titleUser", searchByTitleAndUserId);

router.post("/create", upload.single("file"), create);

router.patch("/update/:id", checkUserPermission("id"), update);
router.patch("/update/statut/:id", checkUserPermission("id"), updateStatus);
router.delete("/delete/:id", checkUserPermission("id"), remove);

export default router;
