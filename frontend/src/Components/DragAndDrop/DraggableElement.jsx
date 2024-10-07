import React from "react";
import Draggable from "react-draggable";

const DraggableElement = ({ item, onSelect }) => {
  return (
    <Draggable
      bounds=".dropzone"
      defaultPosition={{ x: item.x, y: item.y }}
      onStop={(e, d) => {
        onSelect(item.id, d.x, d.y);
      }}
    >
      <div
        style={{
          width: item.width ? `${item.width}px` : "100px",
          height: item.height ? `${item.height}px` : "100px",
          fontFamily: item.fontFamily || "Arial",
          color: item.color || "#000000",
          borderStyle: item.borderStyle || "solid",
          borderWidth: item.borderWidth || "1px",
          borderColor: item.borderColor || "#000000",
          borderRadius: item.type === "circle" ? "50%" : "0%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
          position: "absolute",
          backgroundColor: item.backgroundColor || "#D3D3D3",
          zIndex: item.zIndex || 1,
        }}
      >
        {item.type === "text" ? (
          <p
            style={{
              margin: 0,
              fontSize: `${item.fontSize || 16}px`,
              minWidth: "100%",
              minHeight: "100%",
              transform: `rotate(${item.rotation || "45"}deg)`,
              transformOrigin: "center center",
            }}
          >
            {item.text || " "}
          </p>
        ) : null}
      </div>
    </Draggable>
  );
};

export default DraggableElement;
