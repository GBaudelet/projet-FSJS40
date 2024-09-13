import pool from "../config/db.js";

class User {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM user";
    return await pool.query(SELECT_ALL);
  }

  static async create(datas) {
    const INSERT =
      "INSERT INTO user (username, password,role_id) VALUES (?, ?,2)";

    return await pool.execute(INSERT, [...Object.values(datas)]);
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
    username = username !== undefined ? username : null;
    password = password !== undefined ? password : null;

    const UPDATE = "UPDATE user SET username = ?,  password = ? WHERE id = ?";

    return await pool.execute(UPDATE, [username, password, id]);
  }

  static async remove(id) {
    const DELETE = "DELETE FROM user WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default User;
