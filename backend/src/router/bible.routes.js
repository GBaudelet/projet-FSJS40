import Router from "express";

import { all, getAll, getByTag, getByTitle } from "../controller/bible.js";

const router = Router();

router.get("/all", all); // Pour récupérer toutes les sheets
router.get("/getAll", getAll); // Pour récupérer toutes les sheets avec images
router.get("/title", getByTitle); // Rechercher des sheets par titre
router.get("/tag", getByTag); // Rechercher des sheets par tags

export default router;
