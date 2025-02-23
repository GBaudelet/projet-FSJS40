import { Router } from "express";

import { create, login, logout, check_auth } from "../Controller/auth.js";
import { validationResult } from "express-validator";
import validateRegister from "../Middlewares/ValidateRegister.js";
const router = Router();

router.post(
  "/register",
  validateRegister,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  create
);
router.post("/login", login);

router.post("/logout", logout);

router.get("/check-auth", check_auth);

export default router;
