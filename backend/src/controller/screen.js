import fs from "fs";
import path from "path";
import multer from "multer";
import BibleModel from "../model/Screen.js"; // Importez votre modèle

// Configurer multer pour stocker les fichiers
const storage = multer.memoryStorage(); // Utilisation de memoryStorage pour accéder directement au buffer

const upload = multer({ storage });

// Fonction pour sauvegarder une image
const saveScreenshot = async (req, res) => {
  const { userId, sheetId } = req.body; // Récupérer userId et sheetId à partir du corps de la requête

  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier téléchargé." });
  }

  const screenshotBuffer = req.file.buffer; // Accéder au buffer du fichier téléchargé
  const userDir = path.join(process.cwd(), "public", "sheet", userId);

  // Vérifier si le répertoire de l'utilisateur existe, sinon le créer
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  // Créer un nom de fichier unique avec un horodatage
  const ext = path.extname(req.file.originalname);
  const fileName = `dropzone_${Date.now()}${ext}`; // Nom de fichier unique
  const filePath = path.join(userDir, fileName); // Utilisation du nom de fichier unique

  // Écrire le buffer de l'image dans le fichier
  fs.writeFile(filePath, screenshotBuffer, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la sauvegarde de l'image." });
    }

    // Insérer le chemin dans la base de données
    try {
      const imgEmplacement = filePath.replace(/\\/g, "/"); // Remplacer les backslashes par des slashes pour le chemin
      const insertId = await BibleModel.insertImagePath(
        imgEmplacement,
        sheetId
      );
      res.status(200).json({
        message:
          "Image sauvegardée et chemin inséré dans la base de données avec succès.",
        insertId,
      });
    } catch (dbError) {
      console.error(
        "Erreur lors de l'insertion dans la base de données:",
        dbError
      );
      res.status(500).json({
        message: "Erreur lors de l'insertion dans la base de données.",
      });
    }
  });
};

// Exportez le middleware upload et la fonction saveScreenshot
export { upload, saveScreenshot };
