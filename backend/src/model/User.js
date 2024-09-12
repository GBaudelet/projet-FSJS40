import pool from "../config/db.js";

class User {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM user";
    return await pool.query(SELECT_ALL);
  }

  static async create(datas) {
    const INSERT =
      "INSERT INTO user (username, email, password,role_id) VALUES (?, ?, ?,2)";

    return await pool.execute(INSERT, [...Object.values(datas)]);
  }

  static async update(username, email, password, id) {
    username = username !== undefined ? username : null;
    email = email !== undefined ? email : null;
    password = password !== undefined ? password : null;

    const UPDATE =
      "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?";

    return await pool.execute(UPDATE, [username, email, password, id]);
  }

  static async remove(id) {
    const DELETE = "DELETE FROM user WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default User;
