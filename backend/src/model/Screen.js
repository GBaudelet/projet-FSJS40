import pool from "../config/db.js";

class BibleModel {
  // Fonction pour insérer un nouvel enregistrement dans la table bible
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

export default BibleModel;
