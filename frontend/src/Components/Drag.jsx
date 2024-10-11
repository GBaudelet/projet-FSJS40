import React, { useState, useRef } from "react";
import Sidebar from "./DragAndDrop/Sidebar";
import DropZone from "./DragAndDrop/DropZone";
import PropertiesPanel from "./DragAndDrop/PropertiesPanel";
import html2canvas from "html2canvas";
import "../assets/scss/Drag.css";
import { useSelector } from "react-redux";

const Drag = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dropZoneBackgroundColor, setDropZoneBackgroundColor] =
    useState("#b6b6b6");
  const dropZoneRef = useRef(null);
  const userId = useSelector((state) => state.user.id);

  const addItemToDropZone = (item) => {
    const newItem = {
      id: Date.now(),
      type: item.type,
      x: item.x || 0,
      y: item.y || 0,
      width: item.width || 100,
      height: item.height || 100,
      backgroundColor:
        item.type === "text" ? "rgba(0, 0, 0, 0)" : "rgba(211, 211, 211, 1)",
      text: item.type === "text" ? "Editable Text" : "",
      borderStyle: item.borderStyle || "solid",
      borderWidth: item.borderWidth || "1px",
      borderColor: item.borderColor || "#000000",
      borderRadius: item.type === "circle" ? "50%" : "0",
      color: item.color || "#000000",
      size: item.fontSize || "16px",
      zIndex: item.zIndex || 1,
    };
    console.log(newItem);

    setDroppedItems([...droppedItems, newItem]);
  };

  const handleElementSelect = (item) => {
    setSelectedElement(item);
  };

  const handleElementMove = (movedElement) => {
    setDroppedItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === movedElement.id ? { ...item, ...movedElement } : item
      );
      handleSave(updatedItems); // Enregistrez après déplacement
      return updatedItems;
    });
  };
  const handleElementUpdate = (updatedElement) => {
    setDroppedItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === updatedElement.id ? { ...item, ...updatedElement } : item
      );
      handleSave(updatedItems); // Enregistrez après mise à jour
      return updatedItems;
    });
  };

  const handleElementDelete = (element) => {
    setDroppedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== element.id);
      handleSave(updatedItems); // Enregistrez après suppression
      return updatedItems;
    });
    setSelectedElement(null);
  };

  // const handleSave = (data = {}) => {
  //   // Utilisation de droppedItems par défaut si data.items n'est pas défini
  //   const itemsToSave = Array.isArray(data.items) ? data.items : droppedItems;

  //   const saveData = {
  //     userId: userId,
  //     backgroundColor: dropZoneBackgroundColor,
  //     items: itemsToSave.map((item) => ({
  //       ...item,
  //     })),
  //   };

  //   console.log("Drop zone saved:", saveData);

  //   // Enregistrer les données dans le localStorage
  //   localStorage.setItem("dropZoneData", JSON.stringify(saveData));

  //   // save de l'image qui sera utilisé pour la bibliothèque
  //   // if (dropZoneRef.current) {
  //   //   html2canvas(dropZoneRef.current).then((canvas) => {
  //   //     const link = document.createElement("a");
  //   //     link.href = canvas.toDataURL("image/png");
  //   //     link.download = "dropzone.png";
  //   //     link.click();
  //   //   });
  //   // }
  // };
  const handleSave = (data = {}) => {
    const itemsToSave = Array.isArray(data.items) ? data.items : droppedItems;

    const saveData = {
      userId: userId, // Assurez-vous que cela est défini dans votre composant
      backgroundColor: dropZoneBackgroundColor,
      items: itemsToSave.map((item) => ({ ...item })),
    };

    console.log("Drop zone saved:", saveData);

    localStorage.setItem("dropZoneData", JSON.stringify(saveData));

    // if (dropZoneRef.current) {
    //   html2canvas(dropZoneRef.current).then((canvas) => {
    //     canvas.toBlob((blob) => {
    //       const formData = new FormData();
    //       formData.append("screenshot", blob, "dropzone.png");
    //       formData.append("userId", saveData.userId);
    //       formData.append("data", JSON.stringify(saveData));

    //       fetch("http://localhost:9000/api/v1/screen/save", {
    //         method: "POST",
    //         body: formData,
    //         credentials: "include",
    //       })
    //         .then((response) => {
    //           if (!response.ok) {
    //             throw new Error("Erreur lors de l'envoi du fichier");
    //           }
    //           return response.json();
    //         })
    //         .then((data) => {
    //           console.log("Fichier envoyé avec succès :", data);
    //         })
    //         .catch((error) => {
    //           console.log("catch error");

    //           console.error("Erreur lors de l'envoi :", error);
    //         });
    //     });
    //   });
    // }
  };

  const handleLoad = () => {
    // Charger les données depuis le localStorage
    const savedData = localStorage.getItem("dropZoneData");
    if (savedData) {
      const { items, backgroundColor } = JSON.parse(savedData);
      setDropZoneBackgroundColor(backgroundColor);

      if (dropZoneRef.current) {
        const dropZoneBounds = dropZoneRef.current.getBoundingClientRect();

        const updatedItems = items.map((item) => {
          // Conversion des positions de pourcentage à pixels
          const xPos = (item.x / 100) * dropZoneBounds.width;
          const yPos = (item.y / 100) * dropZoneBounds.height;

          return {
            ...item,

            // Si x dépasse la largeur, remettre à 0 ou autre valeur
            x: xPos > dropZoneBounds.width ? 0 : xPos,

            // Si y dépasse la hauteur, remettre à 0 ou autre valeur
            y: yPos > dropZoneBounds.height ? 0 : yPos,
          };
        });

        setDroppedItems(updatedItems);
      }
    }
  };
  //
  //

  return (
    <div className="drag">
      <Sidebar
        onAddItem={addItemToDropZone}
        onSave={handleSave}
        onLoad={handleLoad}
      />
      <DropZone
        dropZoneRef={dropZoneRef}
        droppedItems={droppedItems}
        setDroppedItems={setDroppedItems}
        onSelectElement={handleElementSelect}
        setSelectedElement={setSelectedElement}
        backgroundColor={dropZoneBackgroundColor}
        onUpdateElement={handleElementUpdate}
        onMoveElement={handleElementMove}
      />
      <PropertiesPanel
        selectedElement={selectedElement}
        onUpdate={handleElementUpdate}
        onDelete={handleElementDelete}
        setSelectedElement={setSelectedElement}
        onBackgroundColorChange={setDropZoneBackgroundColor}
        dropZoneBackgroundColor={dropZoneBackgroundColor}
      />
    </div>
  );
};

export default Drag;
