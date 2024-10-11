import multer from "multer";
import path from "path";
import fs from "fs";

// Configurer multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId;

    const dir = `${process.cwd()}/public/sheet/${userId}`;
    // Vérifie si le répertoire existe, sinon le crée
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return cb(err);
      }
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `dropzone_${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
