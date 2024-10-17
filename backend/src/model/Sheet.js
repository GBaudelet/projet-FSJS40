import pool from "../config/db.js";

class Sheet {
  // admin and bible
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM sheet";
    return await pool.query(SELECT_ALL);
  }
  // user
  static async findAllUser(userId) {
    const SELECT_BY_USER_ID = "SELECT * FROM sheet WHERE user_id = ?";
    return await pool.query(SELECT_BY_USER_ID, [userId]);
  }
  // recherche par tag
  static async findByTag(tag) {
    const query = `
    SELECT bible.*
    FROM bible
    JOIN bible_tag ON bible.id = bible_tag.bible_id
    JOIN tag ON bible_tag.tag_id = tag.id
    WHERE tag.name IN (?)
    GROUP BY bible.id
  `;

    return await pool.query(query, [tag]);
  }
  // verification si l'user n'a pas déjà ce nom de fiche
  static async findByTitleAndUserId(userId) {
    const [rows] = await pool.query(
      "SELECT title FROM sheet WHERE user_id = ?",
      [userId]
    );
    return rows; // Retourne les titres de l'utilisateur
  }

  //
  static async create(sheetData) {
    const { title, description, userId } = sheetData;

    const query =
      "INSERT INTO sheet (title, description, user_id) VALUES (?, ?, ?)";
    const values = [title, description, userId];

    try {
      const [result] = await pool.execute(query, values);
      return result.insertId; // Retourne l'ID de la nouvelle feuille créée
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //

  static async update(sheetData, id) {
    const { title, description } = sheetData; // Vous pouvez ajouter d'autres champs à mettre à jour si nécessaire

    const query = `
      UPDATE sheet
      SET title = ?, description = ?
      WHERE id = ?
    `;
    const values = [title, description, id];

    try {
      const [result] = await pool.execute(query, values);
      return result.affectedRows; // Retourne le nombre de lignes affectées
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async remove(id) {
    const DELETE = "DELETE FROM sheet WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
  static async getFilePath(id) {
    const GETFILE = "SELECT img_emplacement FROM bible WHERE sheet_id = ?";
    return await pool.execute(GETFILE, [id]);
  }
}

export default Sheet;
