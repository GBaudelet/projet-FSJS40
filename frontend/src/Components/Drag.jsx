import React, { useState } from "react";
import Sidebar from "./DragAndDrop/Sidebar";
import DropZone from "./DragAndDrop/DropZone";
import PropertiesPanel from "./DragAndDrop/PropertiesPanel";
import "../assets/scss/Drag.css";

const Drag = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dropZoneBackgroundColor, setDropZoneBackgroundColor] =
    useState("#b6b6b6");

  const addItemToDropZone = (item) => {
    const newItem = {
      id: Date.now(),
      type: item.type,
      x: 0,
      y: 0,
      width: item.type === "text" ? 200 : 100,
      height: item.type === "text" ? 100 : 100,
      backgroundColor: item.type === "text" ? "transparent" : "#D3D3D3",
      text: item.type === "text" ? "Editable Text" : "",
    };
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
    const saveData = {
      backgroundColor: dropZoneBackgroundColor,
      items: droppedItems,
    };
    console.log("Drop zone saved:", saveData);
  };

  return (
    <div className="app">
      <Sidebar onAddItem={addItemToDropZone} onSave={handleSave} />
      <DropZone
        droppedItems={droppedItems}
        setDroppedItems={setDroppedItems}
        onSelectElement={handleElementSelect}
        backgroundColor={dropZoneBackgroundColor} // Pass the background color as a prop
      />
      <PropertiesPanel
        selectedElement={selectedElement}
        onUpdate={handleElementUpdate}
        onDelete={handleElementDelete}
        onBackgroundColorChange={setDropZoneBackgroundColor} // Pass the set function for background color
        dropZoneBackgroundColor={dropZoneBackgroundColor} // Pass current background color
      />
    </div>
  );
};

export default Drag;
