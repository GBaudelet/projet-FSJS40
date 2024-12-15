import React, { useEffect, useState } from "react";
import UserSheets from "./Profile/UserSheets.jsx";
import { useSelector } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const userId = useSelector((state) => state.user.id);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/user/all/${userId}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setUser(data.user[0]);
        setFormData({
          username: data.user[0].username,
          email: data.user[0].email,
          password: "",
        });
      } catch (error) {
        console.error("Erreur : ", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSaveChanges = async () => {
    if (editingField === "password" && !validatePassword(formData.password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    setPasswordError("");

    try {
      const updatedData = { ...formData };
      if (editingField !== "password") delete updatedData.password;

      console.log("Données envoyées:", updatedData);
      const response = await fetch(
        `http://localhost:9000/api/v1/user/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des informations");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditingField(null);
      window.location.reload();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/user/delete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du compte");
      }

      // Clear the session cookie
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

      // Redirect to the home page
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div id="profil">
      <div className="profile-content">
        <div className="user-info">
          <h2>Informations personnelles</h2>

          <p>
            Nom d'utilisateur :
            {editingField === "username" ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
              />
            ) : (
              <span> {user.username}</span>
            )}
            <button onClick={() => handleEditClick("username")}>
              Modifier
            </button>
          </p>

          <p>
            Adresse email :
            {editingField === "email" ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            ) : (
              <span> {user.email}</span>
            )}
            <button onClick={() => handleEditClick("email")}>Modifier</button>
          </p>

          <p>
            Mot de passe :
            {editingField === "password" ? (
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Nouveau mot de passe"
                  value={formData.password}
                  onChange={handleFormChange}
                />
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
            ) : (
              <span>********</span>
            )}
            <button onClick={() => handleEditClick("password")}>
              Modifier le mot de passe
            </button>
          </p>

          {editingField && (
            <div>
              <button onClick={handleSaveChanges}>Enregistrer</button>
              <button onClick={() => setEditingField(null)}>Annuler</button>
            </div>
          )}
          <p>
            <button onClick={() => setShowDeleteConfirmation(true)}>
              Supprimer le compte
            </button>
          </p>

          {showDeleteConfirmation && (
            <div className="confirmation-dialog">
              <p>
                Cette action est définitive et supprimera toutes vos données.
                Êtes-vous sûr de vouloir supprimer votre compte ?
              </p>
              <button onClick={handleDeleteAccount}>Oui, supprimer</button>
              <button onClick={handleCancelDelete}>Annuler</button>
            </div>
          )}
        </div>

        <UserSheets userId={userId} />
      </div>
    </div>
  );
};

export default Profile;
