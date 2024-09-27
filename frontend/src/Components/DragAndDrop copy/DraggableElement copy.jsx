import React from "react";
import { Rnd } from "react-rnd";

const DraggableElement = ({ item, onSelect }) => {
  return (
    <Rnd
      bounds="parent"
      default={{
        x: item.x,
        y: item.y,
        width: item.width || 100,
        height: item.height || 100,
      }}
      onDragStop={(e, d) => {
        onSelect(item.id, d.x, d.y);
      }}
      style={{
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
        borderRadius: item.type === "circle" ? "50%" : "0%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
        position: "absolute",
        zIndex: item.zIndex || 1,
      }}
    >
      {item.type === "text" ? (
        <p style={{ margin: 0, minWidth: "100%", minHeight: "100%" }}>
          {item.text || " "}
        </p>
      ) : null}
    </Rnd>
  );
};

export default DraggableElement;
