import React from "react";
import { Rnd } from "react-rnd";
// le item.width reçoit bien les données du PropertiesPanel mais n'est pas appliquer sur l'item
const DraggableElement = ({ item, onSelect }) => {
  // console.log("Width:", item.width, "Height", item.height, item.rotation);
  console.log(Rnd);
  return (
    <Rnd
      bounds=".dropzone"
      default={{
        x: item.x,
        y: item.y,
        // width: item.width || "100",
        // height: item.height || "100",
      }}
      // avec cette ligne item.width est  transmis à l'objet sélectionner mais l'élément reviens au dimension définis dans le PropertiesPanel
      size={{ width: item.width, height: item.height || 100 }}
      onDragStop={(e, d) => {
        onSelect(item.id, d.x, d.y);
      }}
      style={{
        zIndex: item.zIndex || 1,
        // transform: `translate(${item.x}px, ${item.y}px)`,
      }}
    >
      <div
        style={{
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
          // zIndex: item.zIndex || 1,
          // transform: `translate(${item.x}px, ${item.y}px)`,
          backgroundColor:
            item.type === "text"
              ? "transparent"
              : item.backgroundColor || "#D3D3D3",
          width: "100%" || item.width,
          height: "100%" || item.height,
          transformOrigin: "center center",
          transform: `rotate(${item.rotation || "0"}deg)`,
        }}
      ></div>
      {item.type === "text" ? (
        <p
          style={{
            margin: 0,
            fontSize: `${item.fontSize || 16}px`,
            minWidth: "100%",
            minHeight: "100%",
            transform: `rotate(${item.rotation || "0"}deg)`,
            transformOrigin: "center center",
          }}
        >
          {item.text || " "}
        </p>
      ) : null}
    </Rnd>
  );
};

export default DraggableElement;
