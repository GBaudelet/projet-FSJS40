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
  // creation de la fiche
  static async create(datas) {
    const INSERT = `
      INSERT INTO sheet (title, description, created_at, updated_at, statues, user_id) 
      VALUES (?, ?, NOW(), NOW(), ?, ?)
    `;

    try {
      // Exécutez la requête d'insertion
      const [result] = await pool.execute(INSERT, [
        datas.title,
        datas.description,
        datas.statues,
        datas.user_id,
      ]);
      return result;
    } catch (error) {
      console.error("Erreur lors de l'insertion dans la table sheet:", error);
      throw error;
    }
  }
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
