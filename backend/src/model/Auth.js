import pool from "../config/db.js";

class Auth {
  static async create(datas) {
    const INSERT =
      "INSERT INTO user (username, password,role_id) VALUES (?, ?,2)";

    return await pool.execute(INSERT, [...Object.values(datas)]);
  }

  static async findOneByUsername(username) {
    const SELECT =
      "SELECT id, username, password,role_id FROM `user` WHERE username = ?";
    return await pool.execute(SELECT, [username]);
  }

  static async findUserInfoById(id) {
    const SELECT = "SELECT username, role_id from `user` WHERE user.id = ?";
    return await pool.execute(SELECT, [id]);
  }
}

export default Auth;