import pool from "../config/db.js";

class Sheet {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM sheet";
    return await pool.query(SELECT_ALL);
  }

  // static async create(datas) {
  //   const INSERT =
  //     "INSERT INTO sheet (title,description,created_at,updated_at,user_id) VALUES (?,?,NOW(),NOW(),?)";

  //   return await pool.execute(INSERT, [...Object.values(datas)]);
  // }
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
      return result; // Retourner le résultat de l'insertion
    } catch (error) {
      console.error("Erreur lors de l'insertion dans la table sheet:", error);
      throw error; // Lancer l'erreur pour la gestion dans le contrôleur
    }
  }
  //   static async update(name, id) {
  //     const UPDATE = "UPDATE Sheet SET name = ? WHERE id = ?";
  //     return await pool.execute(UPDATE, [name, id]);
  //   }

  //   static async remove(id) {
  //     const DELETE = "DELETE FROM Sheet WHERE id = ?";
  //     return await pool.execute(DELETE, [id]);
  //   }
}

export default Sheet;
