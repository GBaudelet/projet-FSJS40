import React, { useEffect, useState } from "react";
import UserInfo from "./Profile/UserInfo.jsx";
import UserSheets from "./Profile/UserSheets.jsx";
import { useSelector } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user.id); // Récupérer l'ID de l'utilisateur depuis l'état global
  const role = useSelector((state) => state.user.role_id); // Récupérer le rôle de l'utilisateur

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
        setUser(data.user[0]); // Récupérer le premier utilisateur
      } catch (error) {
        console.error("Erreur : ", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="profil">
      <div className="profile-content">
        <UserInfo user={user} />
        {role === 1 && <UserSheets userId={userId} />}
      </div>
    </div>
  );
};

export default Profile;
