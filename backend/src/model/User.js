import pool from "../config/db.js";

class User {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM user";
    return await pool.query(SELECT_ALL);
  }

  static async findOneByUsername(username) {
    const SELECT =
      "SELECT id, username, password FROM `user` WHERE username = ?";
    return await pool.execute(SELECT, [username]);
  }

  static async findUserInfoById(id) {
    const SELECT = "SELECT username WHERE user.id = ?";
    return await pool.execute(SELECT, [id]);
  }

  static async update(username, password, id) {
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

    if (!fields.length) {
      throw new Error("Nothing to update");
    }

    values.push(id); // Ajouter l'id à la fin pour la clause WHERE
    const UPDATE = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;

    return await pool.execute(UPDATE, values);
  }

  static async remove(id) {
    const DELETE = "DELETE FROM user WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default User;
