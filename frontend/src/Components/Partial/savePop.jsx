import React, { useState, useEffect } from "react";

const SavePopup = ({ onClick, onSubmitForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [existingTitles, setExistingTitles] = useState([]); // État pour stocker les titres existants
  const [apiMessage, setApiMessage] = useState(""); // État pour stocker le message de l'API

  useEffect(() => {
    // Récupérer les tags
    fetch("http://localhost:9000/api/v1/tag/all")
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching tags:", error));

    // Récupérer les titres existants de l'utilisateur
    fetch("http://localhost:9000/api/v1/sheet/titleUser", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Vérifiez si 'data' est un tableau et mettez à jour 'existingTitles'
        if (Array.isArray(data)) {
          setExistingTitles(data.map((titleObj) => titleObj.title));
        } else if (data.msg) {
          // Si 'data' contient un message, mettez à jour 'apiMessage'
          setApiMessage(data.msg);
        } else {
          setApiMessage("Erreur inconnue lors de la récupération des titres.");
        }
      })
      .catch((error) => console.error("Error fetching titles:", error));
  }, []);

  const handleTagChange = (tagId) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((id) => id !== tagId)
        : [...prevTags, tagId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification si le titre existe déjà
    if (existingTitles.includes(title)) {
      setApiMessage("Ce titre existe déjà. Veuillez en choisir un autre."); // Message d'erreur
      return; // Empêche la soumission si le titre existe
    }

    // Si le titre est unique, soumettez le formulaire
    const formData = { title, description, selectedTags };
    onSubmitForm(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Save your work</h2>
        <form onSubmit={handleSubmit}>
          <div className="title-div">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="title-div">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="tags">Tags:</label>
            <div className="form-tag">
              {tags.map((tag) => (
                <div key={tag.id} className="tag-item">
                  <input
                    type="checkbox"
                    id={`tag-${tag.id}`}
                    value={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                  />
                  <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="button-save">
            Save
          </button>
          <button type="button" onClick={onClick}>
            Close
          </button>
        </form>
        {apiMessage && <p className="api-message">{apiMessage}</p>}{" "}
      </div>
    </div>
  );
};

export default SavePopup;
