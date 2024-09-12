import React from "react";
import Draggable from "react-draggable";

const DraggableElement = ({ item, onSelect, updatePosition }) => {
  const handleStop = (e, data) => {
    updatePosition(item.id, data.x, data.y);
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: item.x, y: item.y }}
      onStop={handleStop}
    >
      <div
        className="draggable-element"
        style={{
          width: `${item.width || 100}px`,
          height: `${item.height || 100}px`,
          backgroundColor:
            item.type === "text"
              ? "transparent"
              : item.backgroundColor || "#D3D3D3",
          fontSize: `${item.fontSize || 16}px`,
          fontFamily: item.fontFamily || "Arial",
          color: item.color || "#000000",
          borderStyle: item.borderStyle || "solid",
          borderWidth: item.borderWidth || "1px",
          borderColor: item.borderColor || "#000000",
          borderRadius: `${item.borderRadius || 0}px`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
          position: "absolute",
        }}
        onClick={() => onSelect(item)}
      >
        {item.type === "text" ? (
          <p style={{ margin: 0, minWidth: "100%", minHeight: "100%" }}>
            {item.text || " "}
          </p>
        ) : (
          item.type
        )}
      </div>
    </Draggable>
  );
};

export default DraggableElement;
