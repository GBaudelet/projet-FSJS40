import pool from "../Config/db.js";

class Sheet {
  // bible
  static async findAll() {
    const SELECT_ALL = `SELECT id,title, description, statut, user_id,created_at,updated_at 
    FROM sheet 
    WHERE statut = 1`;
    return await pool.query(SELECT_ALL);
  }
  // admin
  static async findAllAdmin() {
    const SELECT_ALL = `SELECT sheet.id, sheet.title, sheet.description, sheet.statut, sheet.user_id, sheet.created_at, sheet.updated_at, bible.img_emplacement, user.username
    FROM sheet
    LEFT JOIN bible ON sheet.id = bible.sheet_id
     LEFT JOIN user ON sheet.user_id = user.id;
`;
    return await pool.query(SELECT_ALL);
  }
  // user
  static async findAllUser(userId) {
    const SELECT_BY_USER_ID = `SELECT sheet.id,sheet.title,sheet.description,GROUP_CONCAT(tag.name) AS tags,bible.img_emplacement 
    FROM sheet 
    LEFT JOIN sheet_tag ON sheet.id = sheet_tag.sheet_id 
    LEFT JOIN tag ON sheet_tag.tag_id = tag.id 
    LEFT JOIN bible ON sheet.id = bible.sheet_id 
    WHERE sheet.user_id = (?) AND sheet.statut = 1 
    GROUP BY sheet.id, bible.img_emplacement;`;
    return await pool.query(SELECT_BY_USER_ID, [userId]);
  }
  // recherche par tag
  static async findByTag(tag) {
    const query = `
    SELECT sheet.id
    FROM sheet
    JOIN sheet_tag ON sheet.id = sheet_tag.sheet_id
    JOIN tag ON sheet_tag.tag_id = tag.id
    WHERE tag.name IN (?) AND sheet.statut = 1
    GROUP BY sheet.id
  `;
    return await pool.query(query, [tag]);
  }

  // verification si l'user n'a pas déjà ce nom de fiche
  static async findByTitleAndUserId(userId) {
    const [rows] = await pool.query(
      "SELECT title FROM sheet WHERE user_id = ?",
      [userId]
    );
    return rows;
  }

  //
  static async create(sheetData) {
    const { title, description, userId } = sheetData;

    const query =
      "INSERT INTO sheet (title, description, user_id) VALUES (?, ?, ?)";
    const values = [title, description, userId];

    try {
      const [result] = await pool.execute(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //

  static async update(data, sheetId, connection) {
    const query = `
      UPDATE sheet SET 
        title = ?, 
        description = ? ,
        updated_at = NOW() 
        
      WHERE id = ?`;

    const values = [data.title, data.description, sheetId];
    await connection.query(query, values);
  }

  static async updateStatus(sheetId, statut) {
    const query = `
      UPDATE sheet SET 
        statut = ?, 
        updated_at = NOW() 
      WHERE id = ?`;

    const values = [statut, sheetId];

    const [result] = await pool.query(query, values);
    return result;
  }

  static async remove(id) {
    const DELETE = "DELETE FROM sheet WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
  static async getFilePath(id) {
    const GETFILE = "SELECT img_emplacement FROM bible WHERE sheet_id = ?";
    return await pool.execute(GETFILE, [id]);
  }
  static async getDropZoneDetails(sheetId) {
    const GET_DROPZONE_QUERY = `
      SELECT id, backgroundColor, items
      FROM dropzone
      WHERE sheet_id = ?`;

    const [result] = await pool.execute(GET_DROPZONE_QUERY, [sheetId]);
    return result;
  }
}

export default Sheet;
