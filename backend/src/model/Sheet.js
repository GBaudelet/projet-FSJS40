import pool from "../config/db.js";

class Sheet {
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM sheet";
    return await pool.query(SELECT_ALL);
  }

  static async create(datas) {
    const INSERT =
      "INSERT INTO sheet (title,description,created_at,updated_at,user_id) VALUES (?,?,NOW(),NOW(),?)";

    return await pool.execute(INSERT, [...Object.values(datas)]);
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
