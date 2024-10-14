import pool from "../config/db.js";

class SheetTag {
  // Fonction statique pour associer des tags à une feuille
  static async addTagsToSheet(sheetId, selectedTags) {
    const query = "INSERT INTO sheet_tag (sheet_id, tag_id) VALUES (?, ?)";

    try {
      for (const tagId of selectedTags) {
        await pool.execute(query, [sheetId, tagId]);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default SheetTag;
