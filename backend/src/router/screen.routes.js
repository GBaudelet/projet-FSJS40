// backend/routes/screenshotRoutes.js

import { Router } from "express";
import { saveScreenshot, upload } from "../controller/screen.js";

const router = Router();

// Route pour gérer l'upload
router.post("/save", upload.single("file"), saveScreenshot);

export default router;
