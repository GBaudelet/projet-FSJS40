import Sheet from "../model/Sheet.js";
import express from "express";
const app = express();

app.use(express.json());

// pour l'admin et la bible
const getAll = async (req, res) => {
  try {
    const [response] = await Sheet.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// pour l'user
const getAllUser = async (req, res) => {
  try {
    const userId = req.session.user.id;

    if (!userId) {
      return res.status(400).json({ msg: "Utilisateur non authentifié" });
    }

    const [response] = await Sheet.findAllUser(userId);
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// recherche par tag
const searchByTag = async (req, res) => {
  try {
    const { tags } = req.query;

    if (!tags || tags.length === 0) {
      return res
        .status(400)
        .json({ msg: "Aucun tag fourni pour la recherche" });
    }

    const [response] = await Sheet.findByTag(tags.split(","));
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Vérifiez si les champs sont fournis
    if (!title || !description) {
      return res.status(400).json({ msg: "Tous les champs sont requis" });
    }

    // Récupérer l'ID de l'utilisateur depuis la session
    const userId = req.session.user.id;

    // Préparer les données pour l'insertion
    const sheetData = {
      title,
      description,
      statues: 1,
      user_id: userId,
    };

    // Insérer la feuille dans la base de données
    const result = await Sheet.create(sheetData);
    res
      .status(201)
      .json({ msg: "Feuille créée avec succès", sheetId: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création de la feuille:", error);
    res.status(500).json({ msg: "Erreur lors de la création de la feuille" });
  }
};

// const update = async (req, res) => {
//   try {
//     const [response] = await Sheet.update(
//       req.body.name,

//       req.params.id
//     );
//     if (!response.affectedRows) {
//       res.status(404).json({ msg: "sheet not updated" });
//       return;
//     }
//     res.json({ msg: "sheet updated" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

const remove = async (req, res) => {
  try {
    const [response] = await Sheet.remove(req.params.id);
    if (!response.affectedRows) {
      res.status(404).json({ msg: "sheet not deleted" });
      return;
    }
    res.json({ msg: "sheet deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, create, getAllUser, searchByTag, remove };
