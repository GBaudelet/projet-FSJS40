import Sheet from "../model/Sheet.js";
import express from "express";
const app = express();

app.use(express.json());

const getAll = async (req, res) => {
  try {
    const [response] = await Sheet.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, description } = req.body; // Récupérer le titre et la description

    // Vérification si les champs requis sont présents
    if (!title || !description) {
      return res.status(400).json({ msg: "Tous les champs sont requis" });
    }

    // Récupérer l'ID de l'utilisateur connecté
    const userId = req.session.userId || req.user.id; // À ajuster selon votre implémentation d'authentification

    // Préparer les données pour l'insertion
    const sheetData = {
      title,
      description,
      created_at: new Date(), // Utiliser la date actuelle pour created_at
      updated_at: new Date(), // Utiliser la date actuelle pour updated_at
      statues: 1, // Valeur par défaut pour statues
      user_id: userId, // Récupérer l'ID de l'utilisateur connecté
    };

    // Insérer les données dans la table
    const [sheetResponse] = await Sheet.create(sheetData);
    const sheetId = sheetResponse.insertId; // Récupérer l'ID de la nouvelle entrée

    // Réponse en cas de succès
    res.json({ msg: "Sheet added", id: sheetId });
  } catch (err) {
    console.error("Erreur lors de la création du sheet:", err);
    res.status(500).json({ msg: "Erreur serveur" });
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

// const remove = async (req, res) => {
//   try {
//     const [response] = await Sheet.remove(req.params.id);
//     if (!response.affectedRows) {
//       res.status(404).json({ msg: "sheet not deleted" });
//       return;
//     }
//     res.json({ msg: "sheet deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

export { getAll, create };
