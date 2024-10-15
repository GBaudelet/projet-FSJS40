import pool from "../config/db.js";

class Bible {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM bible";
    return await pool.query(SELECT_ALL);
  }
}

export default Bible;
