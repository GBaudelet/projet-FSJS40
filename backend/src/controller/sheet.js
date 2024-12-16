import Sheet from "../model/Sheet.js";
import SheetTag from "../model/SheetTag.js";
import Dropzone from "../model/Dropzone.js";
import Bible from "../model/Bible.js";
import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import express from "express";
const app = express();

app.use(express.json());

// pour la bible
const getAll = async (req, res) => {
  try {
    const [response] = await Sheet.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// pour l'admin
const getAllAdmin = async (req, res) => {
  try {
    const [response] = await Sheet.findAllAdmin();
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
// edit sheet
const getDropZoneDetails = async (req, res) => {
  try {
    const sheetId = req.params.id;
    if (!sheetId) {
      return res.status(400).json({ msg: "ID de feuille invalide" });
    }

    const dropZoneDetails = await Sheet.getDropZoneDetails(sheetId);

    if (dropZoneDetails.length === 0) {
      return res
        .status(404)
        .json({ msg: "Zone de dépôt non trouvée pour cette feuille" });
    }

    res.json(dropZoneDetails[0]);
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
    const userId = req.session.user.id;

    const existingSheets = await Sheet.findByTitleAndUserId(userId);
    if (existingSheets.length > 0) {
      return res.json(existingSheets);
    }
    return res.json([]);
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

    await connection.beginTransaction();

    // Créer une nouvelle entrée dans la table sheet
    const sheetId = await Sheet.create(
      {
        title,
        description,
        userId,
      },
      connection
    );

    // Associer les tags à la nouvelle feuille dans la table intermédiaire
    if (selectedTags && selectedTags.length > 0) {
      await SheetTag.addTagsToSheet(sheetId, selectedTags, connection);
    }

    // Créer la dropzone associée à la feuille
    await Dropzone.createDropzone(
      {
        backgroundColor,
        droppedItems,
        sheetId,
      },
      connection
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

      const imgEmplacement = `/${userId}/${path.basename(uniqueFilePath)}`;
      const insertId = await Bible.insertImagePath(imgEmplacement, sheetId);
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

const updateStatus = async (req, res) => {
  try {
    const { id: sheetId } = req.params;
    const { statut } = req.body;

    if (statut !== "0" && statut !== "1") {
      return res.status(400).json({
        msg: "Statut invalide. Utilisez '0' pour masqué ou '1' pour visible.",
      });
    }

    await Sheet.updateStatus(sheetId, statut);

    res.status(200).json({ msg: "Statut mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Fonction pour update feuille et ses tags associés

const update = async (req, res) => {
  const { title, description, selectedTags, userId, img_emplacement } =
    req.body;
  const { id: sheetId } = req.params;
  const connection = await pool.getConnection();

  try {
    const [oldSheet] = await connection.query(
      "SELECT title FROM sheet WHERE id = ?",
      [sheetId]
    );
    const oldTitle = oldSheet[0]?.title;

    await connection.beginTransaction();

    await Sheet.update({ title, description }, sheetId, connection);

    if (selectedTags && selectedTags.length > 0) {
      await SheetTag.updateTagsForSheet(sheetId, selectedTags, connection);
    }

    let imgEmplacement = null;
    if (title !== oldTitle) {
      const userDir = path.join(
        process.cwd(),
        "public",
        "sheet",
        String(userId)
      );
      const ext = path.extname(img_emplacement);
      const safeNewTitle = title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
      const safeOldTitle = oldTitle.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");

      const oldFilePath = path.join(userDir, `${safeOldTitle}${ext}`);
      const newFilePath = path.join(userDir, `${safeNewTitle}${ext}`);

      const fileExists = await fs.promises
        .access(oldFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

      if (fileExists && oldFilePath !== newFilePath) {
        await fs.promises.rename(oldFilePath, newFilePath);
        imgEmplacement = `/${userId}/${safeNewTitle}${ext}`;
      } else {
        console.log(
          "Le fichier ancien n'existe pas ou les chemins sont identiques."
        );
      }

      if (imgEmplacement) {
        await Bible.updateImagePath(imgEmplacement, sheetId);
      }
    }

    await connection.commit();
    res.status(200).send("Sheet updated successfully");
  } catch (error) {
    await connection.rollback();
    console.error("Erreur lors de la mise à jour :", error);
    res.status(500).send("Erreur lors de la mise à jour");
  } finally {
    connection.release();
  }
};

// Fonction pour delete feuille et ses tags associés
const remove = async (req, res) => {
  try {
    // Récupérer le chemin du fichier associé au sheet via la table `bible`
    const [fileData] = await Sheet.getFilePath(req.params.id);

    // Vérifier si le fichier existe et si l'enregistrement a un userId
    if (!fileData || !fileData[0]) {
      return res
        .status(404)
        .json({ msg: "Fichier introuvable dans la table bible" });
    }

    // Vérifier si userId est null (utilisateur supprimé)
    if (fileData[0].user_id === null) {
      console.log(
        "Utilisateur supprimé, mais suppression du fichier et du sheet continue."
      );
    }

    const filePath = path.join(
      process.cwd(),
      "public/sheet",
      fileData[0].img_emplacement
    );

    // Supprimer le fichier sur le serveur
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Erreur lors de la suppression du fichier:", err);
        return res
          .status(500)
          .json({ msg: "Erreur lors de la suppression du fichier" });
      }

      // Si le fichier est supprimé avec succès, supprimer ensuite l'enregistrement dans la base de données
      try {
        const [response] = await Sheet.remove(req.params.id);
        if (!response.affectedRows) {
          return res.status(404).json({ msg: "Sheet non supprimé" });
        }

        res.json({ msg: "Sheet et fichier supprimés" });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
  getAll,
  getAllAdmin,
  create,
  getAllUser,
  searchByTag,
  remove,
  searchByTitleAndUserId,
  update,
  updateStatus,
  getDropZoneDetails,
};
