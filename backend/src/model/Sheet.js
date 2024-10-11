import pool from "../config/db.js";

class Sheet {
  // admin and bible
  static async findAll() {
    const SELECT_ALL = "SELECT * FROM sheet";
    return await pool.query(SELECT_ALL);
  }
  // user
  static async findAllUser(userId) {
    const SELECT_BY_USER_ID = "SELECT * FROM sheet WHERE user_id = ?";
    return await pool.query(SELECT_BY_USER_ID, [userId]);
  }
  // recherche par tag
  static async findByTag(tag) {
    const query = `
    SELECT bible.*
    FROM bible
    JOIN bible_tag ON bible.id = bible_tag.bible_id
    JOIN tag ON bible_tag.tag_id = tag.id
    WHERE tag.name IN (?)
    GROUP BY bible.id
  `;

    return await pool.query(query, [tag]);
  }
  //
  //
  // création de la fiche
  static async create(datas) {
    const INSERT_SHEET = `
    INSERT INTO sheet (title, description, created_at, updated_at, statues, user_id) 
    VALUES (?, ?, NOW(), NOW(), ?, ?)
  `;

    const INSERT_BIBLE = `
    INSERT INTO bible (img_emplacement, sheet_id) 
    VALUES (?, ?)
  `;

    const INSERT_DROPZONE = `
    INSERT INTO dropzone (backgroundColor, items, sheet_id) 
    VALUES (?, ?, ?)
  `;

    // Vous pouvez avoir une liste de tags à insérer
    const INSERT_SHEET_TAG = `
    INSERT INTO sheet_tag (sheet_id, tag_id) 
    VALUES (?, ?)
  `;

    try {
      // Démarrer une transaction
      await pool.getConnection(async (err, connection) => {
        if (err) throw err;

        await connection.beginTransaction();

        // Exécutez la requête d'insertion pour la table sheet
        const [sheetResult] = await connection.execute(INSERT_SHEET, [
          datas.title,
          datas.description,
          datas.statues,
          datas.user_id,
        ]);

        // Récupérer l'ID de la nouvelle fiche
        const lastSheetId = sheetResult.insertId;

        // Insérer dans la table bible
        await connection.execute(INSERT_BIBLE, [
          datas.img_emplacement, // Assurez-vous que cette valeur est fournie dans `datas`
          lastSheetId,
        ]);

        // Insérer les tags dans la table intermédiaire sheet_tag
        if (datas.tags && Array.isArray(datas.tags)) {
          for (const tag of datas.tags) {
            await connection.execute(INSERT_SHEET_TAG, [lastSheetId, tag]);
          }
        }

        // Insérer dans la table dropzone
        await connection.execute(INSERT_DROPZONE, [
          datas.backgroundColor, // Assurez-vous que cette valeur est fournie dans `datas`
          JSON.stringify(datas.items), // En supposant que `datas.items` est un objet ou un tableau
          lastSheetId,
        ]);

        // Valider la transaction
        await connection.commit();
        connection.release();

        return { id: lastSheetId }; // Retournez l'ID de la fiche créée
      });
    } catch (error) {
      // En cas d'erreur, faire un rollback
      await pool.getConnection(async (err, connection) => {
        if (err) throw err;
        await connection.rollback();
        connection.release();
      });
      console.error("Erreur lors de l'insertion dans la table sheet:", error);
      throw error;
    }
  }

  //   static async update(name, id) {
  //     const UPDATE = "UPDATE Sheet SET name = ? WHERE id = ?";
  //     return await pool.execute(UPDATE, [name, id]);
  //   }

  static async remove(id) {
    const DELETE = "DELETE FROM sheet WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default Sheet;
