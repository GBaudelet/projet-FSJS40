import User from "../model/User.js";
import express from "express";
import bcrypt from "bcrypt";

const app = express();
const SALT = 10;

app.use(express.json());

const getAll = async (req, res) => {
  try {
    const [response] = await User.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { id } = req.params;

    console.log("Données reçues pour mise à jour:", {
      username,
      password,
    });

    if (!id) {
      return res.status(400).json({ msg: "ID utilisateur requis" });
    }

    let updateData = {
      username: username || null,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, SALT);
    } else {
      updateData.password = null;
    }

    const [response] = await User.update(
      updateData.username,
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

export { getAll, update, remove };
