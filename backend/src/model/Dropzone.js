class Dropzone {
  static async createDropzone(dropzoneData, connection) {
    const { backgroundColor, droppedItems, sheetId } = dropzoneData;

    try {
      const query = `
        INSERT INTO dropzone (backgroundColor, items, sheet_id) 
        VALUES (?, ?, ?)`;
      const values = [backgroundColor, JSON.stringify(droppedItems), sheetId];

      const [result] = await connection.execute(query, values);

      return result.insertId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Dropzone;
