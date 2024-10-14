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
  static async findByTitleAndUserId(title, userId) {
    const [rows] = await pool.query(
      "SELECT * FROM sheet WHERE title = ? AND user_id = ?",
      [title, userId]
    );
    return rows.length > 0 ? rows[0] : null; // Retourne la feuille si elle existe, sinon null
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

  //   static async update(name, id) {
  //     const UPDATE = "UPDATE Sheet SET name = ? WHERE id = ?";
  //     return await pool.execute(UPDATE, [name, id]);
  //   }

  static async remove(id) {
    const DELETE = "DELETE FROM sheet WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default Sheet;
