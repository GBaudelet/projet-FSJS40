import Auth from "../model/Auth.js";
import bcrypt from "bcrypt";
const SALT = 10;

import { validationResult } from "express-validator";

const create = async (req, res) => {
  // Vérifier les erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, email } = req.body;

    // Vérification si l'utilisateur existe déjà par username ou email
    const [[existingUser]] = await Auth.findOneByUsername(username);
    const [[existingEmail]] = await Auth.findOneByEmail(email);

    if (existingUser) {
      return res.status(400).json({ msg: "Le nom d'utilisateur existe déjà" });
    }

    if (existingEmail) {
      return res.status(400).json({ msg: "L'adresse e-mail existe déjà" });
    }

    // Hachage du mot de passe
    const hash = await bcrypt.hash(password, SALT);
    const [response] = await Auth.create({ username, hash, email });

    if (response.affectedRows === 1) {
      res.status(201).json({ msg: "Utilisateur créé" });
    } else {
      res.status(500).json({ msg: "Utilisateur non créé" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [[user]] = await Auth.findOneByUsername(username);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      await Auth.updateLastConnection(user.id);

      const userSessionData = {
        id: user.id,
        username: user.username,
        role_id: user.role_id,
      };

      req.session.user = userSessionData;
      res.status(200).json({
        msg: "User logged in",
        isLogged: true,
        user: userSessionData,
      });
    } else {
      res.status(400).json({ msg: "Username or Password invalid" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).json({ msg: "User logged out", isLogged: false });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const check_auth = async (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({ isLogged: true, user });
  } else {
    res.status(401).json({ isLogged: false });
  }
};

export { create, login, logout, check_auth };
