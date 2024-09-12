import User from "../model/User.js";
import express from "express";
import bcrypt from "bcrypt";

const app = express();
const SALT_ROUNDS = 10;

app.use(express.json());

const getAll = async (req, res) => {
  try {
    const [response] = await User.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Tous les champs sont requis" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userData = {
      username,
      email,
      password: hashedPassword,
    };

    const [userResponse] = await User.create(userData);
    const userId = userResponse.insertId;

    res.json({ msg: "User added", id: userId });
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur:", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

const update = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.params;

    console.log("Données reçues pour mise à jour:", {
      username,
      email,
      password,
    });

    if (!id) {
      return res.status(400).json({ msg: "ID utilisateur requis" });
    }

    let updateData = {
      username: username || null,
      email: email || null,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
    } else {
      updateData.password = null;
    }

    const [response] = await User.update(
      updateData.username,
      updateData.email,
      updateData.password,
      id
    );

    if (!response.affectedRows) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    res.json({ msg: "Utilisateur mis à jour" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
    res.status(500).json({ msg: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const [response] = await User.remove(req.params.id);
    if (!response.affectedRows) {
      res.status(404).json({ msg: "User not deleted" });
      return;
    }
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, create, update, remove };
