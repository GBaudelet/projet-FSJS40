import React, { useState, useEffect } from "react";

const SheetPage = () => {
  const [sheets, setSheets] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newSheet, setNewSheet] = useState({
    name: "",
  });
  const [editingSheet, setEditingSheet] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/sheet/all");
      const data = await response.json();
      setSheets(data);
    } catch (error) {
      console.error("Error fetching sheets:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/sheet/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSheet),
          credentials: "include", // Assurez-vous que les cookies sont inclus dans la requête
        }
      );
      const data = await response.json();
      setSheets([...sheets, data]);
      setNewSheet({ name: "" });
    } catch (error) {
      console.error("Error creating sheet:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/sheet/update/${editingSheet.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingSheet),
          credentials: "include", // Assurez-vous que les cookies sont inclus dans la requête
        }
      );
      const data = await response.json();
      setSheets(sheets.map((sheet) => (sheet.id === data.id ? data : sheet)));
      setIsEditing(null);
      setEditingSheet({ id: "", name: "" });
    } catch (error) {
      console.error("Error updating sheet:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:9000/api/v1/sheet/delete/${id}`, {
        method: "DELETE",
        credentials: "include", // Assurez-vous que les cookies sont inclus dans la requête
      });
      setSheets(sheets.filter((sheet) => sheet.id !== id));
    } catch (error) {
      console.error("Error deleting sheet:", error);
    }
  };

  return (
    <div className="sheets-page">
      <h2>Sheets</h2>

      {/* Form for creating a new sheet */}
      <div className="form-container">
        <h3>Create New sheet</h3>
        <input
          type="text"
          placeholder="Name"
          value={newSheet.name || ""}
          onChange={(e) => setNewSheet({ ...newSheet, name: e.target.value })}
        />

        <button onClick={handleCreate}>Create Sheet</button>
      </div>

      <div className="sheets-list">
        {sheets.map((sheet, index) => (
          <div key={sheet.id || index} className="sheet-item">
            <div className="sheet-details">
              <p>Name: {sheet.title}</p>
              <p>{sheet.description}</p>
              <p>créé le : {sheet.created_at}</p>
              <p>update le : {sheet.updated_at}</p>
              <p>statues : {sheet.statues}</p>
              <p>fait par l'utilisateur {sheet.user_id}</p>
            </div>
            <div className="sheet-actions">
              <button
                onClick={() => {
                  setIsEditing(sheet.id);
                  setEditingSheet(sheet);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(sheet.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="form-container">
          <h3>Edit Sheet</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingSheet.name}
            onChange={(e) =>
              setEditingSheet({ ...editingSheet, name: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Update Sheet</button>
        </div>
      )}
    </div>
  );
};

export default SheetPage;
