import React, { useState } from "react";

function AddSheet() {
  // État pour gérer les valeurs des champs de formulaire
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch("/api/v1/sheet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
        credentials: "include", // Assurez-vous que les cookies sont inclus dans la requête
      });

      // Vérifiez si la requête a réussi
      if (!response.ok) {
        const errorData = await response.json(); // Récupère le corps de l'erreur
        console.error("Erreur API:", errorData); // Affiche l'erreur dans la console
        throw new Error("Erreur lors de l'ajout de la feuille");
      }

      const data = await response.json();
      console.log("Feuille ajoutée avec succès:", data);

      // Réinitialiser le formulaire après l'ajout
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      <form id="addSheetForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength="50"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Met à jour l'état
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Met à jour l'état
          ></textarea>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddSheet;
