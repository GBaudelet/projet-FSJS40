import React, { useEffect, useState } from "react";

const Bible = () => {
  const [sheets, setSheets] = useState([]); // État pour stocker toutes les sheets
  const [filteredSheets, setFilteredSheets] = useState([]); // État pour stocker les sheets filtrées
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [error, setError] = useState("");

  // Récupérer les sheets et les tags au démarrage
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/bible/getAll",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des sheets");
        }

        const data = await response.json();
        setSheets(data);
        setFilteredSheets(data); // Par défaut, afficher toutes les sheets
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/v1/tag/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tags");
        }

        const data = await response.json();
        setTags(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSheets();
    fetchTags();
  }, []);

  // Gérer la recherche par titre
  const handleSearchByTitle = async (e) => {
    e.preventDefault();

    // Si le titre est vide, afficher toutes les sheets
    if (!searchTitle.trim()) {
      setFilteredSheets(sheets);
      setError(""); // Réinitialiser l'erreur
      return;
    }

    setError(""); // Réinitialiser l'erreur
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/bible/title?title=${searchTitle}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la recherche par titre");
      }

      const data = await response.json();
      setFilteredSheets(data); // Mettre à jour les sheets filtrées
    } catch (err) {
      setError(err.message);
    }
  };

  // Gérer la recherche par tags
  const handleSearchByTags = async (e) => {
    e.preventDefault();

    // Si aucun tag n'est sélectionné, afficher toutes les sheets
    if (selectedTags.length === 0) {
      setFilteredSheets(sheets);
      setError(""); // Réinitialiser l'erreur
      return;
    }

    setError(""); // Réinitialiser l'erreur
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/bible/tag?tag=${selectedTags.join(",")}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la recherche par tags");
      }

      const data = await response.json();
      setFilteredSheets(data); // Mettre à jour les sheets filtrées
    } catch (err) {
      setError(err.message);
    }
  };

  // Gérer la sélection des tags
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div id="bible">
      <h1>c'est la bible</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleSearchByTitle}>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Rechercher par titre"
        />
        <button type="submit">Rechercher</button>
      </form>

      <form onSubmit={handleSearchByTags}>
        <h2>Rechercher par tags</h2>
        {tags.map((tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
            />
            <label>{tag.name}</label>
          </div>
        ))}
        <button type="submit">Rechercher</button>
      </form>

      <div className="sheet-gallery">
        {filteredSheets.map((sheet, index) => {
          const { title, description, img_emplacement } = sheet;
          const fullPath = `http://localhost:9000/sheet${img_emplacement}`; // Chemin complet

          return (
            <div key={index} className="sheet-item">
              <h2>{title}</h2>
              <p>{description}</p>
              {img_emplacement && (
                <img src={fullPath} alt={`Sheet image ${index + 1}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bible;
