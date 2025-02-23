import pool from "../Config/db.js";

class Tag {
  // tous les tag
  static async findAll() {
    const SELECT_ALL = "SELECT id,name FROM tag";
    return await pool.query(SELECT_ALL);
  }
  // create tag
  static async create(datas) {
    const INSERT = "INSERT INTO tag (name) VALUES (?)";

    return await pool.execute(INSERT, [...Object.values(datas)]);
  }
  // update tag
  static async update(name, id) {
    const UPDATE = "UPDATE tag SET name = ? WHERE id = ?";
    return await pool.execute(UPDATE, [name, id]);
  }
  // delete tag
  static async remove(id) {
    const DELETE = "DELETE FROM tag WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default Tag;
