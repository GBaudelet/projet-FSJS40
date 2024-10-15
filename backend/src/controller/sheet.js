import Sheet from "../model/Sheet.js";
import SheetTag from "../model/SheetTag.js";
import Dropzone from "../model/Dropzone.js";
import BibleModel from "../model/Screen.js";
import pool from "../config/db.js";
import fs from "fs";
import path from "path";
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
// recherche par id et title
const searchByTitleAndUserId = async (req, res) => {
  try {
    const userId = req.session.user.id; // Vérifiez que l'utilisateur est connecté

    const existingSheets = await Sheet.findByTitleAndUserId(userId);
    if (existingSheets.length > 0) {
      return res.json(existingSheets); // Retourne les titres existants
    }
    return res.json([]); // Si aucun titre n'existe, renvoie un tableau vide
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Fonction pour créer une nouvelle feuille et ses tags associés
const create = async (req, res) => {
  const {
    title,
    description,
    selectedTags,
    userId,
    droppedItems,
    backgroundColor,
  } = JSON.parse(req.body.data);

  const connection = await pool.getConnection(); // Obtenez une connexion à partir du pool

  try {
    // Vérifiez si le titre existe déjà pour cet utilisateur

    await connection.beginTransaction(); // Commencez la transaction

    // Créer une nouvelle entrée dans la table sheet
    const sheetId = await Sheet.create(
      {
        title,
        description,
        userId,
      },
      connection // Passez la connexion à la méthode
    );

    // Associer les tags à la nouvelle feuille dans la table intermédiaire
    if (selectedTags && selectedTags.length > 0) {
      await SheetTag.addTagsToSheet(sheetId, selectedTags, connection); // Passez la connexion
    }

    // Créer la dropzone associée à la feuille
    await Dropzone.createDropzone(
      {
        backgroundColor,
        droppedItems,
        sheetId,
      },
      connection // Passez la connexion
    );

    // Sauvegarder la capture d'écran si un fichier est présent
    if (req.file) {
      const screenshotBuffer = req.file.buffer;
      const userDir = path.join(
        process.cwd(),
        "public",
        "sheet",
        String(userId)
      );

      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      const ext = path.extname(req.file.originalname);
      const safeTitle = title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
      const fileName = `${safeTitle}${ext}`;
      const filePath = path.join(userDir, fileName);

      let count = 1;
      let uniqueFilePath = filePath;
      while (fs.existsSync(uniqueFilePath)) {
        uniqueFilePath = path.join(userDir, `${safeTitle}(${count})${ext}`);
        count++;
      }

      await fs.promises.writeFile(uniqueFilePath, screenshotBuffer);

      const imgEmplacement = `/public/sheet/${userId}/${path.basename(
        uniqueFilePath
      )}`;
      const insertId = await BibleModel.insertImagePath(
        imgEmplacement,
        sheetId
      );
    }

    await connection.commit(); // Validez la transaction

    return res.status(201).json({
      message: "Sheet and dropzone created successfully",
      sheetId: sheetId,
    });
  } catch (error) {
    await connection.rollback(); // Annulez la transaction en cas d'erreur
    console.error(error);
    return res.status(500).json({
      message: "Error creating sheet",
      error: error.message,
    });
  } finally {
    connection.release(); // Libérez la connexion
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

export {
  getAll,
  create,
  getAllUser,
  searchByTag,
  remove,
  searchByTitleAndUserId,
};
