import React, { useEffect, useState } from "react";

const UserSheets = ({ userId }) => {
  const [sheets, setSheets] = useState([]);
  const [tags, setTags] = useState([]);
  const [editingSheetId, setEditingSheetId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedTags: [],
    userId: userId,
    sheetId: null,
    img_emplacement: "",
  });

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/sheet/allUser`,
          {
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
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/v1/tag/all`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tags");
        }

        const tagData = await response.json();
        setTags(tagData);
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };

    fetchSheets();
    fetchTags();
  }, [userId]);

  const handleEditClick = (sheet) => {
    setEditingSheetId(sheet.id);
    setFormData({
      title: sheet.title,
      description: sheet.description,
      selectedTags: sheet.tags ? sheet.tags.split(",") : [],
      userId: userId,
      sheetId: sheet.id,
      img_emplacement: sheet.img_emplacement || "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    const checked = e.target.checked;

    setFormData((prevData) => {
      const updatedTags = checked
        ? [...prevData.selectedTags, tag]
        : prevData.selectedTags.filter((t) => t !== tag);

      return { ...prevData, selectedTags: updatedTags };
    });
  };

  const handleSaveChanges = async (sheetId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/sheet/update/${formData.sheetId}`,
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

      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.id === formData.sheetId ? { ...sheet, ...formData } : sheet
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
    <div className="user-sheets">
      <h2>Vos fiches</h2>
      {sheets.map((sheet) => {
        const fullPath = sheet.img_emplacement
          ? `http://localhost:9000/sheet${sheet.img_emplacement}`
          : null;

        return (
          <div key={sheet.id} className="sheet">
            <h3>{sheet.title}</h3>
            <p>{sheet.description}</p>
            <p>
              Tags:{" "}
              {sheet.tags ? sheet.tags.split(",").join(", ") : "Aucun tag"}
            </p>

            {fullPath ? (
              <img src={fullPath} alt={`Image for ${sheet.title}`} />
            ) : (
              <p>Pas d'image disponible</p>
            )}

            <button onClick={() => handleEditClick(sheet)}>Modifier</button>
            <button onClick={() => handleDeleteClick(sheet.id)}>
              Supprimer
            </button>

            {/* Formulaire de modification */}
            {editingSheetId === sheet.id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveChanges(sheet.id);
                }}
              >
                <div>
                  <label>Titre:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label>Tags:</label>
                  {tags.map((tag) => (
                    <div key={tag.id}>
                      <input
                        type="checkbox"
                        value={tag.name}
                        checked={formData.selectedTags.includes(tag.name)}
                        onChange={handleTagChange}
                      />
                      <label>{tag.name}</label>
                    </div>
                  ))}
                </div>
                <button type="submit">Enregistrer les modifications</button>
                <button type="button" onClick={() => setEditingSheetId(null)}>
                  Annuler
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserSheets;
