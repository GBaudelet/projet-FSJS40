import React, { useState, useEffect } from "react";

const SavePopup = ({ onClick, onSubmitForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [existingTitles, setExistingTitles] = useState([]); // État pour stocker les titres existants
  const [titleError, setTitleError] = useState(""); // État pour gérer l'erreur de titre

  useEffect(() => {
    // Récupérer les tags
    fetch("http://localhost:9000/api/v1/tag/all")
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching tags:", error));

    // Récupérer les titres existants de l'utilisateur
    fetch("http://localhost:9000/api/v1/sheet/titleTag", {
      method: "GET",
      credentials: "include",
    }) // Assurez-vous que ce point de terminaison est correct
      .then((response) => response.json())
      .then((data) => setExistingTitles(data.map((titleObj) => titleObj.title)))
      .catch((error) => console.error("Error fetching titles:", error));
  }, []);

  const handleTagChange = (tagId) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((id) => id !== tagId)
        : [...prevTags, tagId]
    );
  };

  // Vérifiez si le titre existe déjà
  const checkTitleExists = (inputTitle) => {
    if (existingTitles.includes(inputTitle)) {
      setTitleError("Ce titre existe déjà. Veuillez en choisir un autre.");
    } else {
      setTitleError(""); // Réinitialiser l'erreur si le titre est valide
    }
  };

  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    setTitle(inputTitle);
    checkTitleExists(inputTitle); // Vérifiez l'existence du titre à chaque modification
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleError) {
      return; // Ne pas soumettre si une erreur est présente
    }

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
              onChange={handleTitleChange}
              required
            />
            {titleError && <p className="error">{titleError}</p>}
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
          <button
            type="submit"
            disabled={existingTitles.includes(title)}
            className={existingTitles.includes(title) ? "button-red" : ""}
          >
            Save
          </button>
          <button type="button" onClick={onClick}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};
export default SavePopup;
