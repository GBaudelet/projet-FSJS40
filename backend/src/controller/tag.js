import Tag from "../Model/Tag.js";
import express from "express";
const app = express();

app.use(express.json());

const getAll = async (req, res) => {
  try {
    const [response] = await Tag.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Tous les champs sont requis" });
    }

    const tagData = {
      name,
    };

    const [tagResponse] = await Tag.create(tagData);
    const tagId = tagResponse.insertId;

    res.json({ msg: "tag added", id: tagId });
  } catch (err) {
    console.error("Erreur lors de la création du tag:", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

const update = async (req, res) => {
  try {
    const [response] = await Tag.update(
      req.body.name,

      req.params.id
    );
    if (!response.affectedRows) {
      res.status(404).json({ msg: "tag not updated" });
      return;
    }
    res.json({ msg: "tag updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const [response] = await Tag.remove(req.params.id);
    if (!response.affectedRows) {
      res.status(404).json({ msg: "tag not deleted" });
      return;
    }
    res.json({ msg: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, create, update, remove };
