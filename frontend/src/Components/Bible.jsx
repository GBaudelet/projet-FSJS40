import React, { useEffect, useState } from "react";

const Bible = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/v1/bible/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des images");
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bible">
      <h1>c'est la bible</h1>
      {error && <p>{error}</p>}
      <div className="image-gallery">
        {images.map((image, index) => {
          const { img_emplacement } = image;
          const fullPath = `http://localhost:9000/sheet${img_emplacement}`; // Chemin complet

          // Afficher le chemin complet dans la console pour vérifier

          return (
            <div key={index} className="image-item">
              <img src={fullPath} alt={`Bible image ${index + 1}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bible;
