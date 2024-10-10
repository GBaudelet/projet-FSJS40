import React, { useState, useEffect } from "react";

function AddSheet() {
  // État pour gérer les valeurs des champs de formulaire
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]); // État pour les tags
  const [allTags, setAllTags] = useState([]); // État pour tous les tags récupérés

  // Récupérer tous les tags lorsque le composant se monte
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/v1/tag/all"); // Remplacez par l'URL de votre API pour récupérer les tags
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tags");
        }
        const data = await response.json();
        setAllTags(data); // Assurez-vous que le format des données correspond
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchTags();
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch("/api/v1/sheet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tags }), // Inclure les tags dans la requête
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
      setTags([]); // Réinitialiser les tags
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Gérer le changement des cases à cocher des tags
  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTags((prevTags) => [...prevTags, value]); // Ajouter le tag
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== value)); // Retirer le tag
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
        <div>
          <label>Tags :</label>
          {allTags.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                id={tag.id}
                value={tag.name}
                checked={tags.includes(tag.name)} // Vérifie si le tag est sélectionné
                onChange={handleTagChange} // Met à jour l'état des tags
              />
              <label htmlFor={tag.id}>{tag.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddSheet;
