import pool from "../config/db.js";

class Tag {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM tag";
    return await pool.query(SELECT_ALL);
  }

  static async create(datas) {
    const INSERT = "INSERT INTO tag (name) VALUES (?)";

    return await pool.execute(INSERT, [...Object.values(datas)]);
  }

  static async update(name, id) {
    const UPDATE = "UPDATE tag SET name = ? WHERE id = ?";
    return await pool.execute(UPDATE, [name, id]);
  }

  static async remove(id) {
    const DELETE = "DELETE FROM tag WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default Tag;
