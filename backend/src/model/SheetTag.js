import pool from "../config/db.js";

class SheetTag {
  // associer des tags à une feuille
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
    // Récupérer les tags actuels associés à la feuille
    const [currentTags] = await connection.query(
      "SELECT tag_id FROM sheet_tag WHERE sheet_id = ?",
      [sheetId]
    );

    // Créer un tableau d'ID de tags actuels
    const currentTagIds = currentTags.map((tag) => tag.tag_id);

    // Comparer les tags actuels avec les nouveaux tags
    if (JSON.stringify(currentTagIds) === JSON.stringify(selectedTags)) {
      // Si les tags ne changent pas, ne rien faire
      return;
    }

    // Supprimer les anciens tags associés à la feuille
    await connection.query("DELETE FROM sheet_tag WHERE sheet_id = ?", [
      sheetId,
    ]);

    // Réinsérer les nouveaux tags
    const tagPromises = selectedTags.map((tagId) => {
      return connection.query(
        "INSERT INTO sheet_tag (sheet_id, tag_id) VALUES (?, ?)",
        [sheetId, tagId]
      );
    });

    await Promise.all(tagPromises);
  }
}

export default SheetTag;
