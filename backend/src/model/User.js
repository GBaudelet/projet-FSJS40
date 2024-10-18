import pool from "../config/db.js";

class User {
  // profil de tous les user
  static async findAll() {
    const SELECT_ALL = `
      SELECT user.id, user.username, user.role_id, role.name AS role, user.statut 
      FROM user
      JOIN role ON user.role_id = role.id
    `;

    const [rows] = await pool.query(SELECT_ALL); // rows contiendra les résultats
    return rows; // Retournez seulement les lignes
  }
  // profil de l'user
  static async findById(userId) {
    const SELECT_BY_ID = "SELECT * FROM user WHERE id = ?";
    return await pool.query(SELECT_BY_ID, [userId]);
  }
  static async update(username, password, email, statut, id) {
    let fields = [];
    let values = [];

    if (username) {
      fields.push("username = ?");
      values.push(username);
    }

    if (password) {
      fields.push("password = ?");
      values.push(password);
    }

    if (email) {
      fields.push("email = ?");
      values.push(email);
    }

    if (statut) {
      fields.push("statut = ?");
      values.push(statut);
    }

    if (!fields.length) {
      throw new Error("Nothing to update");
    }

    values.push(id);
    const UPDATE = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;

    return await pool.execute(UPDATE, values);
  }

  // delete user
  static async remove(id) {
    const DELETE = "DELETE FROM user WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default User;
