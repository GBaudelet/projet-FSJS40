import React, { useEffect, useState } from "react";

const UserSheets = ({ userId }) => {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/sheet/allUser`,
          {
            credentials: "include", // Assurez-vous que les cookies sont inclus dans la requête
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fiches");
        }

        const data = await response.json();
        setSheets(data); // Assurez-vous que 'setSheets' est bien défini dans l'état
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };

    fetchSheets();
  }, [userId]);

  return (
    <div className="user-sheets">
      <h2>Vos fiches</h2>
      {sheets.map((sheet) => (
        <div key={sheet.id} className="sheet">
          <h3>{sheet.title}</h3>
          <p>{sheet.description}</p>
          <button>Modifier</button>
          <button>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default UserSheets;
