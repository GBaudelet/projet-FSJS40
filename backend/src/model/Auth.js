import pool from "../config/db.js";

class Auth {
  static async create(datas) {
    const INSERT =
      "INSERT INTO user (username, password, role_id, email) VALUES (?, ?, 2, ?)";
    return await pool.execute(INSERT, [...Object.values(datas)]);
  }

  static async findOneByUsername(username) {
    const SELECT =
      "SELECT id, username, password, role_id, email FROM `user` WHERE username = ?";
    return await pool.execute(SELECT, [username]);
  }

  static async findOneByEmail(email) {
    const SELECT = "SELECT id FROM `user` WHERE email = ?";
    return await pool.execute(SELECT, [email]);
  }

  static async findUserInfoById(id) {
    const SELECT =
      "SELECT username, role_id, email FROM `user` WHERE user.id = ?";
    return await pool.execute(SELECT, [id]);
  }
  static async updateLastConnection(id) {
    const UPDATE = "UPDATE user SET last_connection = NOW() WHERE id = ?";
    return await pool.execute(UPDATE, [id]);
  }
}

export default Auth;
