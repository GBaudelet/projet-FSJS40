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
      // transform: `translate(${item.x}px, ${item.y}px)`,

      width: item.width || 100,
      height: item.height || 100,
      backgroundColor: item.type === "text" ? "transparent" : "#D3D3D3",
      text: item.type === "text" ? "Editable Text" : "",
      rotation: item.rotation || "0",
      borderStyle: item.borderStyle || "solid",
      borderWidth: item.borderWidth || "1px",
      borderColor: item.borderColor || "#000000",
      borderRadius: item.type === "circle" ? "50" : "0",
      fontFamily: item.fontFamily || "Arial",
      color: item.color || "#000000",
      zIndex: item.zIndex || 1,
    };
    console.log(newItem);
    console.log(newItem.x);

    setDroppedItems([...droppedItems, newItem]);
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (updatedElement) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedElement.id ? updatedElement : item
      )
    );
  };

  const handleElementDelete = (element) => {
    setDroppedItems((prevItems) =>
      prevItems.filter((item) => item.id !== element.id)
    );
    setSelectedElement(null);
  };

  const handleSave = () => {
    // save des emplacements des éléments
    const saveData = {
      userId: userId,
      backgroundColor: dropZoneBackgroundColor,
      items: droppedItems,
    };
    console.log("Drop zone saved:", saveData);

    // Enregistrer les données dans le localStorage
    localStorage.setItem("dropZoneData", JSON.stringify(saveData));

    // save de l'image qui sera utilisé pour la bibliothèque
    // if (dropZoneRef.current) {
    //   html2canvas(dropZoneRef.current).then((canvas) => {
    //     const link = document.createElement("a");
    //     link.href = canvas.toDataURL("image/png");
    //     link.download = "dropzone.png";
    //     link.click();
    //   });
    // }
  };
  const handleLoad = () => {
    // Charger les données depuis le localStorage
    const savedData = localStorage.getItem("dropZoneData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setDroppedItems(parsedData.items || []);
      setDropZoneBackgroundColor(parsedData.backgroundColor || "#b6b6b6");
    }
  };

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
