import pool from "../config/db.js";

class Bible {
  // Récupérer toutes les images
  static async all() {
    const SELECT_ALL = "SELECT * FROM bible";
    return await pool.query(SELECT_ALL);
  }

  // Récupérer toutes les sheets avec leurs tags
  static async findAll() {
    const SELECT_ALL_SHEETS = `
      SELECT sheet.id, sheet.title, sheet.description, bible.img_emplacement, GROUP_CONCAT(tag.name) AS tags
      FROM sheet
      LEFT JOIN Sheet_Tag ON sheet.id = Sheet_Tag.sheet_id
      LEFT JOIN tag ON Sheet_Tag.tag_id = tag.id
      LEFT JOIN bible ON sheet.id = bible.sheet_id
      WHERE sheet.statut = 1  -- Ajout de la condition sur le statut
      GROUP BY sheet.id
    `;
    try {
      const [rows] = await pool.query(SELECT_ALL_SHEETS);
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des sheets");
    }
  }

  // Récupérer les sheets filtrées par tag donné
  static async findByTag(tagIds) {
    const SELECT_BY_TAG = `
        SELECT sheet.id, sheet.title, sheet.description, bible.img_emplacement, GROUP_CONCAT(tag.name) AS tag
        FROM sheet
        LEFT JOIN Sheet_Tag ON sheet.id = Sheet_Tag.sheet_id
        LEFT JOIN tag ON Sheet_Tag.tag_id = tag.id
        LEFT JOIN bible ON sheet.id = bible.sheet_id
        WHERE tag.id IN (?) AND sheet.statut = 1  -- Ajout de la condition sur le statut
        GROUP BY sheet.id
    `;
    try {
      const [rows] = await pool.query(SELECT_BY_TAG, [tagIds]);
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des sheets par tag");
    }
  }

  // Récupérer les sheets filtrées par nom
  static async findByTitle(title) {
    const SELECT_BY_TITLE = `
      SELECT sheet.id, sheet.title, sheet.description, bible.img_emplacement, GROUP_CONCAT(tag.name) AS tags
      FROM sheet
      LEFT JOIN Sheet_Tag ON sheet.id = Sheet_Tag.sheet_id
      LEFT JOIN tag ON Sheet_Tag.tag_id = tag.id
      LEFT JOIN bible ON sheet.id = bible.sheet_id
      WHERE sheet.title LIKE ? AND sheet.statut = 1  -- Ajout de la condition sur le statut
      GROUP BY sheet.id
    `;
    try {
      const [rows] = await pool.query(SELECT_BY_TITLE, [`%${title}%`]);
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des sheets par titre");
    }
  }

  // insertion du chemin dans la table Bible
  static async insertImagePath(img_emplacement, sheet_id) {
    try {
      const [result] = await pool.query(
        "INSERT INTO bible (img_emplacement, sheet_id) VALUES (?, ?)",
        [img_emplacement, sheet_id]
      );
      return result.insertId; // Retourne l'ID de l'enregistrement inséré
    } catch (error) {
      console.error("Erreur lors de l'insertion dans la table bible:", error);
      throw error; // Lance l'erreur pour gestion ultérieure
    }
  }
}

export default Bible;
