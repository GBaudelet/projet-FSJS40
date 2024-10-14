class Dropzone {
  static async createDropzone(dropzoneData, connection) {
    const { backgroundColor, droppedItems, sheetId } = dropzoneData;

    try {
      const query = `
        INSERT INTO dropzone (backgroundColor, items, sheet_id) 
        VALUES (?, ?, ?)`;
      const values = [backgroundColor, JSON.stringify(droppedItems), sheetId];

      const [result] = await connection.execute(query, values); // Utilisez la connexion fournie

      return result.insertId; // Retourne l'ID de la nouvelle dropzone créée
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Dropzone;