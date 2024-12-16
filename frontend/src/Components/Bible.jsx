import React, { useEffect, useState } from "react";

const Bible = () => {
  const [sheets, setSheets] = useState([]);
  const [filteredSheets, setFilteredSheets] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [error, setError] = useState("");

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
        setFilteredSheets(data);
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

    if (!searchTitle.trim()) {
      setFilteredSheets(sheets);
      setError("");
      return;
    }

    setError("");
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
      setFilteredSheets(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Gérer la recherche par tags
  const handleSearchByTags = async (e) => {
    e.preventDefault();

    if (selectedTags.length === 0) {
      setFilteredSheets(sheets);
      setError("");
      return;
    }

    setError("");
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
      setFilteredSheets(data);
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
  const openImageInNewWindow = (imgPath) => {
    window.open(imgPath, "_blank", "width=800,height=600");
  };
  return (
    <div id="bible">
      <h1>Bibliothèque</h1>
      {error && <p>{error}</p>}
      <section>
        <h2>Rechercher par titre</h2>
        <form onSubmit={handleSearchByTitle}>
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Rechercher par titre"
          />
          <button type="submit">Rechercher</button>
        </form>
        <h2>Rechercher par tags</h2>
        <form onSubmit={handleSearchByTags}>
          <div className="tags-container">
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
          </div>
          <button type="submit">Rechercher</button>
        </form>
      </section>
      <div className="image-gallery">
        {filteredSheets.map((sheet, index) => {
          const { title, description, img_emplacement } = sheet;
          const fullPath = `http://localhost:9000/sheet${img_emplacement}`;

          return (
            <div key={index} className="image-item">
              <h2>{title}</h2>
              <p>{description}</p>
              {img_emplacement && (
                <img
                  src={fullPath}
                  alt={`Sheet image ${index + 1}`}
                  onClick={() => openImageInNewWindow(fullPath)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bible;
