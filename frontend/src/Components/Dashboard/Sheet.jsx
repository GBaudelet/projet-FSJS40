import React, { useState, useEffect } from "react";

const SheetPage = ({ userId }) => {
  const [sheets, setSheets] = useState([]);
  const [editingSheetId, setEditingSheetId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    statut: "1",
    userId: userId,
  });

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/v1/sheet/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fiches");
        }

        const data = await response.json();
        setSheets(data);
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };

    fetchSheets();
  }, [userId]);

  const handleEditClick = (sheet) => {
    setEditingSheetId(sheet.id);
    setFormData({
      id: sheet.id,
      name: sheet.name,
      statut: sheet.statut.toString(),
      userId: sheet.user_id,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/sheet/update/${formData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la fiche");
      }

      const updatedSheet = await response.json();
      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.id === updatedSheet.id ? updatedSheet : sheet
        )
      );
      setEditingSheetId(null);
    } catch (error) {
      console.error("Erreur: ", error);
    }
  };

  const handleDeleteClick = async (sheetId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette fiche ?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/sheet/delete/${sheetId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de la fiche");
        }

        setSheets((prevSheets) =>
          prevSheets.filter((sheet) => sheet.id !== sheetId)
        );
      } catch (error) {
        console.error("Erreur: ", error);
      }
    }
  };

  return (
    <div className="sheet-page">
      <h2>Sheets</h2>
      {sheets.map((sheet) => (
        <div key={sheet.id} className="sheet-item">
          <h3>{sheet.name}</h3>
          <p>créé le : {sheet.created_at}</p>
          <p>update le : {sheet.updated_at}</p>
          <p>statut : {sheet.statut === 1 ? "Visible" : "Masqué"}</p>
          <p>fait par l'utilisateur {sheet.user_id}</p>
          <button onClick={() => handleEditClick(sheet)}>Modifier</button>
          <button onClick={() => handleDeleteClick(sheet.id)}>Supprimer</button>

          {editingSheetId === sheet.id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
            >
              <div>
                <label>Nom:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label>Statut:</label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleFormChange}
                >
                  <option value="1">Visible</option>
                  <option value="0">Masqué</option>
                </select>
              </div>
              <button type="submit">Enregistrer les modifications</button>
              <button type="button" onClick={() => setEditingSheetId(null)}>
                Annuler
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default SheetPage;
