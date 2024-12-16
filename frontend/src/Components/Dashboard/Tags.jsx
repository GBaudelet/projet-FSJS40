import React, { useState, useEffect } from "react";

const TagPage = () => {
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newTag, setNewTag] = useState({
    name: "",
  });
  const [editingTag, setEditingTag] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/tag/all");
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tag:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/tag/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTag),
        credentials: "include",
      });
      const data = await response.json();
      setTags([...tags, data]);
      setNewTag({ name: "" });
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/tag/update/${editingTag.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingTag),
          credentials: "include",
        }
      );
      const data = await response.json();
      setTags(tags.map((tag) => (tag.id === data.id ? data : tag)));
      setIsEditing(null);
      setEditingTag({ id: "", name: "" });
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:9000/api/v1/tag/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className="tags-page">
      <h2>Tags</h2>

      {/* Form for creating a new tag */}
      <div className="form-container">
        <h3>Create New tag</h3>
        <input
          type="text"
          placeholder="Name"
          value={newTag.name || ""}
          onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
        />

        <button onClick={handleCreate}>Create Tag</button>
      </div>

      <div className="tags-list">
        {tags.map((tag, index) => (
          <div key={tag.id || index} className="tag-item">
            <div className="tag-details">
              <p>Name: {tag.name}</p>
            </div>
            <div className="tag-actions">
              <button
                onClick={() => {
                  setIsEditing(tag.id);
                  setEditingTag(tag);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(tag.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="form-container">
          <h3>Edit Tag</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingTag.name}
            onChange={(e) =>
              setEditingTag({ ...editingTag, name: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Update Tag</button>
        </div>
      )}
    </div>
  );
};

export default TagPage;
