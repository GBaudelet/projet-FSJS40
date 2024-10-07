import React from "react";

const LeftPanel = ({ addElement }) => {
  const shapes = [
    "square",
    "diamond",
    "circle",
    "ellipse",
    "text",
    "rectangle",
  ];

  const handleAddElement = (shape) => {
    // Ajoutez la logique pour ajouter l'élément au diagramme
    console.log(`Ajouter ${shape}`);
    addElement(shape);
  };

  return (
    <div className="left-panel">
      {shapes.map((shape) => (
        <button key={shape} onClick={() => handleAddElement(shape)}>
          {shape}
        </button>
      ))}
    </div>
  );
};

export default LeftPanel;
