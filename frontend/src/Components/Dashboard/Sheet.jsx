import React, { useState, useEffect } from "react";

const SheetPage = ({ userId }) => {
  const [sheets, setSheets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/sheet/allAdmin",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fiches");
        }

        const data = await response.json();
        setSheets(data);
      } catch (error) {
        console.error("Erreur: ", error);
        setErrorMessage(error.message);
      }
    };

    fetchSheets();
  }, [userId]);

  const handleStatusChange = async (sheetId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/sheet/update/statut/${sheetId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ statut: newStatus }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.msg || "Erreur lors de la mise à jour du statut de la fiche"
        );
      }

      const updatedSheet = await response.json();
      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.id === updatedSheet.id
            ? { ...sheet, statut: updatedSheet.statut }
            : sheet
        )
      );
    } catch (error) {
      console.error("Erreur: ", error);
      setErrorMessage(error.message);
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
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="sheet-page">
      <h2>Sheets</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {sheets.map((sheet) => {
        const fullPath = `http://localhost:9000/sheet${sheet.img_emplacement}`;

        return (
          <div key={sheet.id} className="sheet-item">
            <h3>{sheet.title}</h3>
            <p>créé le : {sheet.created_at}</p>
            <p>update le : {sheet.updated_at}</p>
            <img src={fullPath} alt={sheet.title} />
            <div>
              <label>Statut:</label>
              <select
                value={sheet.statut.toString()}
                onChange={(e) => handleStatusChange(sheet.id, e.target.value)}
              >
                <option value="1">Visible</option>
                <option value="0">Masqué</option>
              </select>
            </div>

            <p>fait par l'utilisateur {sheet.username}</p>
            <button onClick={() => handleDeleteClick(sheet.id)}>
              Supprimer
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SheetPage;
