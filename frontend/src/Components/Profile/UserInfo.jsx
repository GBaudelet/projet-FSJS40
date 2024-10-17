import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <h2>Informations personnelles</h2>
      <p>
        Nom d'utilisateur : {user.username}
        <button>Modifier</button>
      </p>
      <p>
        Adresse email : {user.email}
        <button>Modifier</button>
      </p>
      <button>Modifier le mot de passe</button>
      <p>Nombre de fiches créées : </p>
      <h3>Dernières fiches créées :</h3>
      {/* <div className="last-sheets">
        {user.lastSheets.map((sheet) => (
          <img key={sheet.id} src={sheet.imageUrl} alt={sheet.name} />
        ))}
      </div> */}
      <button>Modifier le mot de passe</button>
    </div>
  );
};

export default UserInfo;
