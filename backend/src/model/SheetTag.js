import pool from "../Config/db.js";

class SheetTag {
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

  static async updateTagsForSheet(sheetId, selectedTags, connection) {
    const tagIds = await Promise.all(
      selectedTags.map(async (tagName) => {
        const [result] = await connection.query(
          "SELECT id FROM tag WHERE name = ?",
          [tagName]
        );
        return result[0]?.id; //
      })
    );

    const validTagIds = tagIds.filter((id) => id !== undefined);

    // Vérifier si tous les tags ont des IDs valides
    if (validTagIds.length === 0) {
      throw new Error(`Aucun des tags fournis n'existe dans la table 'tag'.`);
    }

    // Supprimer les anciens tags associés à la feuille
    await connection.query("DELETE FROM sheet_tag WHERE sheet_id = ?", [
      sheetId,
    ]);

    // Réinsérer les nouveaux tags
    const tagPromises = validTagIds.map((tagId) => {
      return connection.query(
        "INSERT INTO sheet_tag (sheet_id, tag_id) VALUES (?, ?)",
        [sheetId, tagId]
      );
    });

    await Promise.all(tagPromises);
  }
}

export default SheetTag;
